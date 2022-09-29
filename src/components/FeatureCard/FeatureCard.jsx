import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import "./featurecard.scss";

const FeatureCard = ({ movie }) => {
  const media = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  if (!movie) return null;
  return (
    <Box
      component={Link}
      to={`/movie/${movie?.id}`}
      sx={{
        marginBottom: "20px",
        display: "flex",
        justifyContent: "center",
        height: "490px",
        textDecoration: "none",
      }}
    >
      <Card
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
          position: "relative",
          borderRadius: "1rem",
        }}
      >
        <CardMedia
          component="img"
          alt={movie?.title}
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.575)",
            backgroundBlendMode: "darken",
          }}
        />
        <div className="overlay"></div>
        <Box>
          <CardContent
            sx={{
              width: media ? "100%" : "40%",
              color: "#ffffff",
              position: "relative",
              backgroundColor: "transparent",
              zIndex: "100",
            }}
          >
            <Typography variant="h3" gutterBottom>
              {movie?.title}
            </Typography>
            <Typography variant="body2">{movie?.overview}</Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default FeatureCard;
