import React, { useEffect } from "react";
import "./profile.scss";

import { Button, Typography, Box } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";

import { useSelector } from "react-redux";

import { userSelector } from "../../features/auth";
import { useGetListQuery } from "../../services/TMDB";
import { RatedCards } from "..";

const Profile = () => {
  const { user } = useSelector(userSelector);

  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  const { data: watchlistMovies, refetch: refetchWatchlisted } =
    useGetListQuery({
      listName: "watchlist/movies",
      accountId: user.id,
      sessionId: localStorage.getItem("session_id"),
      page: 1,
    });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  }, []);

  const logout = () => {
    localStorage.clear();

    window.location.href = "/";
  };

  return (
    <div className="profile-container">
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h2" gutterBottom>
          My Profile
        </Typography>
        <Button onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
        <Typography variant="h5">
          Add favorites or watchlist some movies to see them here!
        </Typography>
      ) : (
        <Box>
          <RatedCards data={favoriteMovies} title="Favorite Movies" />
          <RatedCards data={watchlistMovies} title="Watchlist Movies" />
        </Box>
      )}
    </div>
  );
};

export default Profile;
