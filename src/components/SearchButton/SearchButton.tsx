import React from "react";
import styles from "./SearchButton.module.css";

type SearchButtonProps = {
  hasNextPage: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const SearchButton: React.FC<SearchButtonProps> = ({
  hasNextPage,
  onClick,
}) => {
  return (
    <button
      className={styles.searchButton}
      disabled={!hasNextPage}
      onClick={onClick}
    >
      Показать дальше
    </button>
  );
};

export default SearchButton;
