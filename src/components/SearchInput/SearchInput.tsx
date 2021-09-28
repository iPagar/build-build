import React from "react";
import styles from "./SearchInput.module.css";

type SearchInputProps = {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, onChange }) => {
  return (
    <input
      className={styles.searchInput}
      placeholder={placeholder}
      onChange={onChange}
    ></input>
  );
};

export default SearchInput;
