import { client, useGetRepos } from "../../adapters/ReposAdapter";
import styles from "./SearchPage.module.css";
import RepoItem from "../RepoItem/RepoItem";
import SearchInput from "../SearchInput/SearchInput";
import SearchButton from "../SearchButton/SearchButton";
import { useHistory } from "react-router-dom";

const SearchPage: React.FC = () => {
  const history = useHistory();
  const { getRepos, repos, pageInfo, fetchMore } = useGetRepos();

  async function onInputChange(
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    const { value } = e.currentTarget;

    await client.clearStore();
    getRepos(value);
  }

  function onSearchButtonClick() {
    fetchMore();
  }

  function onRepoItemClick(e: React.MouseEvent<HTMLDivElement>) {
    const { name, owner } = e.currentTarget.dataset;
    history.push(`/${name}/${owner}`);
  }

  return (
    <div className={styles.searchPage}>
      <SearchInput
        placeholder={"Введите название репозитория"}
        onChange={onInputChange}
      />
      {repos?.map((repo, i) => {
        const ownerLogin = repo.node.owner.login;
        const {
          node: { name, description, stargazerCount },
        } = repo;
        const primaryLanguageName = repo.node.primaryLanguage?.name || null;
        return (
          <RepoItem
            key={i}
            data-name={name}
            data-owner={ownerLogin}
            ownerLogin={ownerLogin}
            name={name}
            description={description}
            stargazerCount={stargazerCount}
            primaryLanguageName={primaryLanguageName}
            onClick={onRepoItemClick}
          />
        );
      })}
      {pageInfo?.hasNextPage && (
        <SearchButton
          hasNextPage={pageInfo.hasNextPage}
          onClick={onSearchButtonClick}
        />
      )}
    </div>
  );
};

export default SearchPage;
