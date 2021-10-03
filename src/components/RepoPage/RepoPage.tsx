import { RouteComponentProps } from "react-router";
import { useGetDetailRepo } from "../../adapters/ReposAdapter";
import RepoItem from "../RepoItem/RepoItem";

type TParams = { name: string; owner: string };
type RepoPageProps = RouteComponentProps<TParams>;

const RepoPage: React.FC<RepoPageProps> = ({
  match: {
    params: { name, owner },
  },
}) => {
  const { error, repo } = useGetDetailRepo(name, owner);
  const description = repo?.repository?.description;
  const stargazerCount = repo?.repository?.stargazerCount;
  const primaryLanguageName = repo?.repository?.primaryLanguage?.name || null;
  const pullRequestsCount = repo?.repository?.pullRequests.totalCount;
  const issuesCount = repo?.repository?.issues.totalCount;
  const languages = repo?.repository?.languages.edges;

  return (
    <>
      {(!error && (
        <RepoItem
          ownerLogin={owner}
          name={name}
          description={description}
          stargazerCount={stargazerCount}
          primaryLanguageName={primaryLanguageName}
          pullRequestsCount={pullRequestsCount}
          issuesCount={issuesCount}
          languages={languages}
        />
      )) || <div>Ошибка</div>}
    </>
  );
};

export default RepoPage;
