import {
  ApolloClient,
  InMemoryCache,
  gql,
  createHttpLink,
  useLazyQuery,
  useQuery,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { relayStylePagination } from "@apollo/client/utilities";

export type RepoType = {
  owner: {
    login: string;
  };
  name: string;
  description: string;
  primaryLanguage: {
    name: string;
  } | null;
  stargazerCount: number;
};

export type LanguageType = {
  node: { name: string; color: string };
};

export type RepoDetailType = {
  repository: RepoType & {
    pullRequests: { totalCount: number };
    issues: { totalCount: number };
    languages: { edges: LanguageType[] };
  };
};
const GET_REPO_DETAIL = gql`
  query GetRepoDetail($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      id
      owner {
        login
      }
      name
      description
      primaryLanguage {
        name
      }
      stargazerCount
      pullRequests {
        totalCount
      }
      issues {
        totalCount
      }
      languages(orderBy: { field: SIZE, direction: ASC }, first: 10) {
        edges {
          node {
            name
            color
          }
        }
      }
    }
  }
`;

const GET_REPOS = gql`
  query GetRepos($query: String!, $after: String) {
    search(query: $query, type: REPOSITORY, first: 10, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ... on Repository {
            owner {
              login
            }
            name
            description
            primaryLanguage {
              name
            }
            stargazerCount
          }
        }
      }
    }
  }
`;

export type GetReposType = {
  search: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
    edges: { node: RepoType }[];
  };
};

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = "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";
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          search: relayStylePagination(),
        },
      },
    },
  }),
});

function useGetRepos() {
  const [getRepos, { loading, error, data, fetchMore }] =
    useLazyQuery<Partial<GetReposType>>(GET_REPOS);
  const repos = data?.search?.edges;
  const after = data?.search?.pageInfo?.endCursor;

  return {
    loading,
    error,
    getRepos: (query: string) => {
      getRepos({
        variables: { query },
      });
    },
    repos,
    pageInfo: data?.search?.pageInfo,
    fetchMore: () =>
      fetchMore &&
      fetchMore({
        variables: { after },
      }),
  };
}

function useGetDetailRepo(name: string, owner: string) {
  const { loading, error, data } = useQuery<Partial<RepoDetailType>>(
    GET_REPO_DETAIL,
    {
      variables: { name, owner },
    }
  );
  const repo = data;

  return { loading, repo, error };
}

export { client, useGetRepos, useGetDetailRepo };
