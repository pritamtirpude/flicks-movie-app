import React, { useState } from "react";
import "./movies.scss";
import {
  CircularProgress,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { useSelector } from "react-redux";

import { useGetMoviesQuery } from "../../services/TMDB";

import { MovieList, FeatureCard, Pagination } from "..";

const Movies = () => {
  const [page, setPage] = useState(1);

  const lgDevice = useMediaQuery((theme) => theme.breakpoints.only("lg"));
  const numberOfMovies = lgDevice ? 17 : 19;

  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );

  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

  if (isFetching) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          marginTop: "2rem",
        }}
      >
        <CircularProgress size="4rem" sx={{ color: "hsl(358, 83%, 51%)" }} />
      </Box>
    );
  }

  if (!data?.results?.length) {
    return (
      <Box display="flex" justifyContent="center" mt="20px">
        <Typography variant="h4">
          No movies that match that name. <br /> Please search for something
          else.
        </Typography>
      </Box>
    );
  }

  if (error) {
    return "An error has occured";
  }

  return (
    <div className="movies-container">
      <FeatureCard movie={data.results[0]} />
      <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
      <Pagination
        currentPage={page}
        setPage={setPage}
        totalPages={data.total_pages}
      />
    </div>
  );
};

export default Movies;
