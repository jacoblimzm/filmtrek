import filmsData from "../popularFilmResults.json";
import axios from "axios";
import dotenv from "dotenv";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import SearchResults from "./SearchResults";
import Nav from "./Nav";
import LandingPage from "./LandingPage"

dotenv.config();

function App() {
  const [spotifyToken, setSpotifyToken] = useState("");
  const [popFilms, setPopFilms] = useState(filmsData);
  const [searchFilms, setSearchFilms] = useState([]);


  const getSpotifyToken = async () => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
    const tokenEP = "https://accounts.spotify.com/api/token";
    const data = "grant_type=client_credentials";
    const tokenResponse = await axios.post(tokenEP, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
    });
    const token = tokenResponse.data.access_token;
    // console.log(token);
    setSpotifyToken(token);
  };

  const getPopularMovies = async () => {
    const TMDBapi = process.env.REACT_APP_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDBapi}&language=en-US`;
    const response = await axios.get(url);
    const filmsArr = response.data;
    // console.log(filmsArr);
    setPopFilms(filmsArr);
  };

  const searchSpotifyAlbums = async (query) => {
    const url = `https://api.spotify.com/v1/search?q=${query}&type=album`;
    const response = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + spotifyToken,
      },
    });
    console.log(response.data.albums.items);
  };

  const searchMovies = async (query) => {
    const TMDBapi = process.env.REACT_APP_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDBapi}&language=en-US&query=${query}&page=1`;

    const response = await axios.get(url);
    console.log(response.data.results);
  };

  useEffect(() => {
    // ===== Execute Upon Pageload
    // getSpotifyToken();
    // getPopularMovies();
  }, []);

  const handleSubmit = (e) => {
    
  };

  const handleUserSearch = (query) => {
    const encodedSearch = encodeURI(query);
    searchSpotifyAlbums(encodedSearch);
    searchMovies(encodedSearch);
    
  } 

  return (
    <div className="App">
      <Nav />
      <LandingPage handleUserSearch={handleUserSearch} popFilms={popFilms}/>
      <div className="results-page">
        <h1>RESULTS</h1>
        <div className="film-search-results"></div>
      </div>

      <div className="album-search-results"></div>
    </div>
  );
}

export default App;
