import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Divider,
  Box,
  CircularProgress,
} from "@mui/material";
import genreIcons from "../../assets/genres";

import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { useGetGenresQuery } from "../../services/TMDB";

const categories = [
  {
    label: "Popular",
    value: "popular",
  },
  {
    label: "Top Rated",
    value: "top_rated",
  },
  {
    label: "Upcoming",
    value: "upcoming",
  },
];

const Sidebar = ({ setMobileOpen }) => {
  const dispatch = useDispatch();

  const { data, isFetching } = useGetGenresQuery();
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );

  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);

  return (
    <Fragment>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding="2rem 0rem"
        className="logo-container"
      >
        <Link to="/">
          <Typography
            variant="h4"
            component="h2"
            sx={{ color: "hsl(358, 83%, 51%)" }}
          >
            FLICKS
          </Typography>
        </Link>
      </Box>
      <Divider
        sx={{
          backgroundColor: "hsl(0, 0%, 100%)",
        }}
      />
      <List>
        <ListSubheader
          sx={{
            backgroundColor: "hsl(267, 17%, 10%)",
            fontSize: "1.6rem",
            color: "hsl(0, 0%, 100%)",
          }}
        >
          Categories
        </ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} to="/">
            <ListItem
              onClick={() => dispatch(selectGenreOrCategory(value))}
              button
            >
              <ListItemIcon
                sx={{
                  filter: "invert(1)",
                }}
              >
                <img
                  src={genreIcons[label.toLowerCase()]}
                  height={30}
                  className="genreImage"
                  alt="icons"
                />
              </ListItemIcon>
              <ListItemText
                sx={{
                  color: "hsl(0,0%,100%)",
                  fontSize: "1.4rem",
                }}
                primary={label}
              />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider
        sx={{
          backgroundColor: "hsl(0, 0%, 100%)",
        }}
      />
      <List>
        <ListSubheader
          sx={{
            backgroundColor: "hsl(267, 17%, 10%)",
            fontSize: "1.6rem",
            color: "hsl(0, 0%, 100%)",
          }}
        >
          Genres
        </ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress
              size="4rem"
              sx={{ color: "hsl(358, 83%, 51%)" }}
            />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <Link key={name} to="/">
              <ListItem
                onClick={() => dispatch(selectGenreOrCategory(id))}
                button
              >
                <ListItemIcon
                  sx={{
                    filter: "invert(1)",
                  }}
                >
                  <img
                    src={genreIcons[name.toLowerCase()]}
                    height={30}
                    className="genreImage"
                    alt="icons"
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    color: "hsl(0,0%,100%)",
                    fontSize: "1.4rem",
                  }}
                  primary={name}
                />
              </ListItem>
            </Link>
          ))
        )}
      </List>
    </Fragment>
  );
};

export default Sidebar;
