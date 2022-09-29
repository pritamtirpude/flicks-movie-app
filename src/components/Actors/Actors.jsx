import React, { useState } from "react";
import "./actors.scss";
import { useParams, useNavigate } from "react-router-dom";

import { Box, Typography, CircularProgress, Grid, Button } from "@mui/material";
import { ArrowBack, Movie as MovieIcon } from "@mui/icons-material";

import {
  useGetActorsDetailsQuery,
  useGetMoviesByActorIdQuery,
} from "../../services/TMDB";

import { MovieList, Pagination } from "..";

const Actors = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const { data, isFetching, error } = useGetActorsDetailsQuery(id);

  const { data: movies } = useGetMoviesByActorIdQuery({ id, page });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="6rem" sx={{ color: "hsl(358, 83%, 51%)" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          color="primary"
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <div className="actor-details-container">
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
            alt={data?.name}
            style={{
              maxWidth: "90%",
              borderRadius: "20px",
              objectFit: "cover",
              boxShadow: "0.5em 0.5em 1em",
            }}
          />
        </Grid>
        <Grid
          item
          lg={7}
          xl={8}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body2" align="justify" paragraph>
            {data?.biography || "Sorry, no biography yet..."}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button
              sx={{
                color: "hsl(358, 83%, 51%)",
                backgroundColor: "hsl(0, 0%, 100%)",
                marginRight: "2rem",
              }}
              target="_blank"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
              endIcon={<MovieIcon />}
            >
              IMDB
            </Button>
            <Button
              sx={{
                color: "hsl(358, 83%, 51%)",
                backgroundColor: "hsl(0, 0%, 100%)",
              }}
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h1" gutterBottom align="center">
          Known For
        </Typography>
        {movies && <MovieList movies={movies} numberOfMovies={12} />}
        <Pagination
          currentPage={page}
          setPage={setPage}
          totalPages={movies?.total_pages}
        />
      </Box>
    </div>
  );
};

export default Actors;
