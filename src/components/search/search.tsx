import React, { useState } from "react";
import styles from "./search.module.css";
import { FaTimes } from "react-icons/fa";
import Text from "../../context/language-context";

type SearchProps = {
  searchText: string;
  onInputChange: (searchText: string) => void;
};

const Search: React.FC<SearchProps> = ({ searchText, onInputChange }) => {
  const [isInputFocused, setInputFocused] = useState(false);

  const handleInputChange = (searchtext: string) => {
    if (searchtext.length <= 15) {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("searchText", searchText.toString());
      newUrl.searchParams.set("currentPage", "1");
      newUrl.searchParams.set("pageSize", "10");
      window.history.pushState({}, "", newUrl.toString());
      onInputChange(searchtext);
    }
  };

  const handleClearClick = () => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("searchText", "");
    window.history.pushState({}, "", newUrl.toString());
    onInputChange("");
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        className={styles.searchBox}
        type="text"
        placeholder={Text({ tid: "Search", def: "Search" })}
        value={searchText}
        onChange={(e: any) => handleInputChange(e.target.value)}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
      />
      {searchText.length > 0 && (
        <div className={styles.clearButton} onClick={handleClearClick}>
          <FaTimes />
        </div>
      )}
    </div>
  );
};

export default Search;
