import React, { useState } from "react";
import "./search.scss";
import { Search as SearchIcon } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

import { searchMovie } from "../../features/currentGenreOrCategory";
import { useDispatch } from "react-redux";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();

  const dispatch = useDispatch();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(searchMovie(searchQuery));
    }
  };

  if (location.pathname !== "/") return null;

  return (
    <div className="search-container">
      <input
        onKeyDown={handleKeyDown}
        placeholder="search movie..."
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <SearchIcon className="search-icon" />
    </div>
  );
};

export default Search;
