import React from "react";
import "./movielist.scss";
import { Grid } from "@mui/material";

import { Movie } from "..";

const MovieList = ({ movies, numberOfMovies, excludeFirst }) => {
  const startForm = excludeFirst ? 1 : 0;
  return (
    <Grid container className="movie-list-container" spacing={2}>
      {movies.results.slice(startForm, numberOfMovies).map((movie, index) => (
        <Movie key={index} movie={movie} idx={index} />
      ))}
    </Grid>
  );
};

export default MovieList;
