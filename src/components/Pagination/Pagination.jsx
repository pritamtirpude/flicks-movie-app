import React from "react";

import { Button, Typography } from "@mui/material";

const Pagination = ({ currentPage, setPage, totalPages }) => {
  const handlePrev = () => {
    if (currentPage !== 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage !== totalPages) {
      setPage((prevState) => prevState + 1);
    }
  };

  if (totalPages === 0) return null;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2rem",
      }}
    >
      <Button
        sx={{
          color: "hsl(358, 83%, 51%)",
          backgroundColor: "hsl(0, 0%, 100%)",
          marginRight: "2rem",
        }}
        onClick={handlePrev}
      >
        Prev
      </Button>
      <Typography variant="h4">{currentPage}</Typography>
      <Button
        sx={{
          color: "hsl(358, 83%, 51%)",
          backgroundColor: "hsl(0, 0%, 100%)",
          marginLeft: "2rem",
        }}
        onClick={handleNext}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
