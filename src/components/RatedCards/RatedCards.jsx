import React from "react";

import { Typography, Box } from "@mui/material";

import { Movie } from "..";

const RatedCards = ({ title, data }) => {
  return (
    <Box marginTop="1rem">
      <Typography variant="h3" color="hsl(358, 83%, 51%)" gutterBottom>
        {title}
      </Typography>
      <Box display="flex" gap="2rem" flexWrap="wrap">
        {data?.results?.map((movie, idx) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </Box>
    </Box>
  );
};

export default RatedCards;
