import React from "react";
import { LanguageType } from "../../adapters/ReposAdapter";
import styles from "./RepoItem.module.css";

type RepoItemProps = {
  ownerLogin: string;
  name: string;
  description?: string;
  stargazerCount?: number;
  primaryLanguageName: string | null;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  pullRequestsCount?: number;
  issuesCount?: number;
  languages?: LanguageType[];
};

const RepoItem: React.FC<RepoItemProps> = ({
  ownerLogin,
  name,
  description,
  stargazerCount,
  primaryLanguageName,
  onClick,
  pullRequestsCount,
  issuesCount,
  languages,
  ...props
}) => {
  return (
    <div
      className={styles.repoItem}
      style={{ cursor: onClick ? "pointer" : "default" }}
      onClick={onClick}
      {...props}
    >
      <div className={styles.name}>
        {ownerLogin}/{name}
      </div>
      <div>{description}</div>
      <div className={styles.additional}>
        {primaryLanguageName && (
          <span>Primary Language: {primaryLanguageName}</span>
        )}
        {stargazerCount !== undefined && <span>Stars: {stargazerCount}</span>}
      </div>
      {pullRequestsCount !== undefined && (
        <div className={styles.pullRequestsCount}>PR: {pullRequestsCount}</div>
      )}
      {issuesCount !== undefined && <div>Issues: {issuesCount}</div>}
      {languages && languages.length > 0 && (
        <div>
          <span>Languages: </span>
          {languages.map((language, i) => {
            const { name, color } = language.node;
            return (
              <span key={i} style={{ color }}>
                {name}
                {i !== languages.length - 1 && ", "}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RepoItem;
