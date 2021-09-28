import React from "react";
import styles from "./RepoItem.module.css";

type RepoItemProps = {
  ownerLogin: string;
  name: string;
  desccription: string;
  stargazerCount: number;
  primaryLanguageName: string | null;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const RepoItem: React.FC<RepoItemProps> = ({
  ownerLogin,
  name,
  desccription,
  stargazerCount,
  primaryLanguageName,
  onClick,
}) => {
  return (
    <div className={styles.repoItem} onClick={onClick}>
      <div className={styles.name}>
        {ownerLogin}/{name}
      </div>
      <div>{desccription}</div>
      <div className={styles.additional}>
        {primaryLanguageName && <span>{primaryLanguageName}</span>}
        <span>{stargazerCount}</span>
      </div>
    </div>
  );
};

export default RepoItem;
