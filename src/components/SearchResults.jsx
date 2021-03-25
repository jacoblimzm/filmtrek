import axios from "axios";
import React, { useEffect, useState } from "react";
import data from "../movieSearchResults.json"



const SearchResults = () => {

    const [films, setFilms] = useState([])
    
    // const backdropUrl = `https://image.tmdb.org/t/p/w1280/${props.film.backdrop_path}`;
    // const posterUrl = `https://image.tmdb.org/t/p/w780/${props.film.poster_path}`;

    // const getPopularMovies = async () => {

    //     const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
    //     const response = await axios.get(url);
    //     const filmsArr = response.data;

    //     console.log(filmsArr)
    // }

    // useEffect( () => {
    //     getPopularMovies()
    // }) 


  return (
    <div>
      <h1>{data.results[0].title}</h1>
      <img src={`https://image.tmdb.org/t/p/w780/${data.results[0].backdrop_path}`} alt={data.results[0].title} />
      <p>{data.results[0].overview}</p>
    </div>
  );
};

export default SearchResults