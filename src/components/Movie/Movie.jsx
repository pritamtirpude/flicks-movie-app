import React from "react";
import "./movie.scss";
import { Link } from "react-router-dom";
import { Typography, Grid, Tooltip, Rating } from "@mui/material";

const Movie = ({ movie }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Link to={`/movie/${movie?.id}`}>
        <div className="movie-card-container">
          <div className="img-wrapper">
            <img
              src={
                movie?.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`
                  : "https://www.fillmurray.com/200/300"
              }
              alt={movie?.title}
            />
          </div>

          <Typography className="title" variant="h3">
            {movie?.title}
          </Typography>
          <div className="rating-container">
            <Tooltip disableTouchListener title={`${movie?.vote_average} / 10`}>
              <Rating
                readOnly
                value={movie?.vote_average / 2}
                precision={0.1}
                sx={{
                  color: "hsl(358, 83%, 51%)",
                }}
              />
            </Tooltip>
          </div>
        </div>
      </Link>
    </Grid>
  );
};

export default Movie;
