import React from "react";
import { Routes, Route } from "react-router-dom";

import { Movies, MovieDetails, Actors, Profile, Navbar } from "./components";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" index element={<Movies />} />
        <Route index path="/approved" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/actor/:id" element={<Actors />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
