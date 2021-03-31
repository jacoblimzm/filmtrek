import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../navigation/SearchBar";

const LandingPage = ({ handleUserSearch, popFilms }) => {
  const getRandomMovieBackdrop = () => {
    if (popFilms) {
      const randomMovieSelection = Math.floor(Math.random() * popFilms.length);
      console.log(randomMovieSelection);
      const randomBackdropPath = popFilms[randomMovieSelection].backdrop_path;
      const styles = {
        backgroundImage: `url(https://image.tmdb.org/t/p/original${randomBackdropPath})`,
      };
      return styles;
    } else {
      const styles = {
        backgroundColor: "#FFFF",
      };
      return styles;
    }
  };

  return (
    <div
      className="landing-page d-flex align-content-center justify-content-center flex-wrap"
      style={getRandomMovieBackdrop()}
    >
      <div className="form-container mx-5">
        <div className="landing-page-text">
          <h1>find your film.</h1>
          <h1>find your soundtrack.</h1>
          <SearchBar handleUserSearch={handleUserSearch} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
