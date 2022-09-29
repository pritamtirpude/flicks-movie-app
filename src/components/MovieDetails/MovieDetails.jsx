import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import "./moviedetails.scss";

import axios from "axios";

import {
  CircularProgress,
  Box,
  useMediaQuery,
  Grid,
  Typography,
  Rating,
  ButtonGroup,
  Button,
  Modal,
} from "@mui/material";

import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from "@mui/icons-material";

import genreIcons from "../../assets/genres";
import { useDispatch, useSelector } from "react-redux";

import { MovieList } from "..";

import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { userSelector } from "../../features/auth";
import {
  useGetMovieQuery,
  useGetRecommendationQuery,
  useGetListQuery,
} from "../../services/TMDB";

const MovieDetails = () => {
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchListed, setIsMovieWatchListed] = useState(false);

  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const mediumDevices = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const { user } = useSelector(userSelector);

  const dispatch = useDispatch();

  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: recommendations, isFetching: isRecommendationFetching } =
    useGetRecommendationQuery({ list: "/recommendations", id: id });

  const { data: favoriteMovies } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  const { data: watchlistMovies } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    setIsMovieFavorited(
      !!favoriteMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    window.scrollTo(0, 0);

    setIsMovieWatchListed(
      !!watchlistMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [watchlistMovies, data]);

  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
        process.env.REACT_APP_TMDB_API_KEY
      }&session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        favorite: !isMovieFavorited,
      }
    );

    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchList = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
        process.env.REACT_APP_TMDB_API_KEY
      }&session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        watchlist: !isMovieWatchListed,
      }
    );

    setIsMovieWatchListed((prev) => !prev);
  };

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="6rem" sx={{ color: "hsl(358, 83%, 51%)" }} />
      </Box>
    );
  }

  if (isRecommendationFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="6rem" sx={{ color: "hsl(358, 83%, 51%)" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something has gone wrong - Go Back</Link>
      </Box>
    );
  }

  return (
    <div
      className="movie-details-container"
      style={{ marginLeft: matches ? "0" : "" }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: matches ? "column" : "",
          flexWrap: matches ? "wrap" : "",
          margin: "1rem  0",
        }}
      >
        <Grid item sm={12} lg={4}>
          <img
            className="poster"
            style={{
              borderRadius: "2rem",
              boxShadow: "0.5em 1em 1em rgb(64, 64, 70)",
              width: mediumDevices ? "100%" : matches ? "100%" : "",
              height: mediumDevices ? "100%" : matches ? "35rem" : "",
              margin: mediumDevices ? "0 auto" : matches ? "0 auto" : "",
              marginBottom: matches ? "3rem" : "",
            }}
            src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
            alt={data?.title}
          />
        </Grid>

        <Grid item container direction="column" lg={7}>
          <Typography variant="h1" align="center" gutterBottom>
            {data?.title} ({data?.release_date.split("-")[0]})
          </Typography>
          <Typography variant="h3" align="center" gutterBottom>
            {data?.tagline}
          </Typography>

          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: matches ? "column" : "",
              flexWrap: matches ? "wrap" : "",
              margin: "1rem 0",
            }}
          >
            <Box display="flex" alignItems="center">
              <Rating readOnly value={data?.vote_average / 2} />
              <Typography variant="h4" style={{ marginLeft: "10px" }}>
                {parseFloat(data?.vote_average).toFixed(1)} / 10
              </Typography>
            </Box>
            <Typography
              variant="h4"
              align="center"
              sx={{
                marginTop: matches ? "1rem" : "",
              }}
            >
              {data?.runtime}min | Language: &nbsp;
              {`${data?.spoken_languages[0]?.name}`}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "space-around",
              margin: "1rem 0",
              flexWrap: "wrap",
            }}
          >
            {data?.genres?.map((genre) => (
              <Link
                key={genre.name}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textDecoration: "none",
                }}
                to="/"
                onClick={() => dispatch(selectGenreOrCategory(genre.id))}
              >
                <img
                  src={genreIcons[genre.name.toLowerCase()]}
                  style={{ filter: "invert(1)", marginRight: "1rem" }}
                  height={30}
                  alt="genre icon"
                />
                <Typography variant="h5" sx={{ color: "hsl(0, 0%, 100%)" }}>
                  {genre.name}
                </Typography>
              </Link>
            ))}
          </Grid>
          <Typography variant="h2" gutterBottom style={{ marginTop: "1rem" }}>
            Overview
          </Typography>
          <Typography style={{ marginBottom: "2rem" }}>
            {data?.overview}
          </Typography>
          <Typography variant="h2" gutterBottom>
            Top Casts
          </Typography>
          <Grid item container spacing={2}>
            {data &&
              data.credits?.cast
                ?.map(
                  (character, index) =>
                    character.profile_path && (
                      <Grid
                        key={index}
                        item
                        xs={4}
                        md={2}
                        component={Link}
                        to={`/actor/${character.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <img
                          style={{
                            width: "100%",
                            maxWidth: "7em",
                            height: "8em",
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                          src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                          alt={character.name}
                        />
                        <Typography sx={{ color: "hsl(0, 0%, 100%)" }}>
                          {character?.name}
                        </Typography>
                        <Typography sx={{ color: "hsl(0, 0%, 100%)" }}>
                          {character?.character.split("/")[0]}
                        </Typography>
                      </Grid>
                    )
                )
                .slice(0, 6)}
          </Grid>
          <Grid item container style={{ marginTop: "2rem" }}>
            <div
              className="buttonsContainer"
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: matches ? "column" : "",
              }}
            >
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: matches ? "column" : "",
                }}
              >
                <ButtonGroup
                  size="small"
                  sx={{ fontSize: "small" }}
                  variant="outlined"
                >
                  <Button
                    target="_blank"
                    rel="noopener noreferrer"
                    href={data?.homepage}
                    endIcon={<Language />}
                  >
                    Website
                  </Button>
                  <Button
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.imdb.com/title/${data?.imdb_id}`}
                    endIcon={<MovieIcon />}
                  >
                    IMDB
                  </Button>
                  <Button
                    onClick={() => setOpen(true)}
                    href="#"
                    endIcon={<Theaters />}
                  >
                    Trailer
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: matches ? "column" : "",
                }}
              >
                <ButtonGroup size="small" variant="outlined">
                  <Button
                    onClick={addToFavorites}
                    endIcon={
                      isMovieFavorited ? (
                        <FavoriteBorderOutlined />
                      ) : (
                        <Favorite />
                      )
                    }
                  >
                    {isMovieFavorited ? "Unfavorite" : "Favorite"}
                  </Button>
                  <Button
                    onClick={addToWatchList}
                    endIcon={isMovieWatchListed ? <Remove /> : <PlusOne />}
                  >
                    Watchlist
                  </Button>
                  <Button endIcon={<ArrowBack />}>
                    <Typography
                      component={Link}
                      to="/"
                      color="inherit"
                      variant="subtitle2"
                      style={{ textDecoration: "none" }}
                    >
                      Back
                    </Typography>
                  </Button>
                </ButtonGroup>
              </Grid>
            </div>
          </Grid>
        </Grid>
        <Box marginTop="5rem" width="100%">
          <Typography variant="h1" gutterBottom align="center">
            You might also like
          </Typography>
          {recommendations ? (
            <MovieList movies={recommendations} numberOfMovies={12} />
          ) : (
            <Box>Sorry, nothing was Found.</Box>
          )}
        </Box>
        <Modal
          closeAfterTransition
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={open}
          onClose={() => setOpen(false)}
        >
          {data?.videos?.results?.length > 0 && (
            <iframe
              autoPlay
              style={{
                width: matches ? "90%" : "50%",
                height: matches ? "90%" : "50%",
              }}
              frameBorder="0"
              title="Trailer"
              src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
              allow="autoplay"
            />
          )}
        </Modal>
      </Grid>
    </div>
  );
};

export default MovieDetails;
