import filmsData from "../popularFilmResults.json";
import axios from "axios";
import dotenv from "dotenv";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom"
import VideoPlayer from "./VideoPlayer";
import SearchResults from "./SearchResults";
import Nav from "./Nav"

dotenv.config();

function App() {
  const [spotifyToken, setSpotifyToken] = useState("");
  const [popFilms, setPopFilms] = useState(filmsData);

  const getRandomMovieBackdrop = () => {
    if (popFilms.results) {
      const randomMovieSelection = Math.floor(
        Math.random() * popFilms.results.length
      );
      console.log(randomMovieSelection);
      const randomBackdropPath =
        popFilms.results[randomMovieSelection].backdrop_path;
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
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDBapi}&language=en-US&query=${query}&page=1`

    const response = await axios.get(url);

    console.log(response.data.results);
  }


  useEffect(() => {
    // ===== Execute Upon Pageload
    // getSpotifyToken();
    // getPopularMovies();
  }, []);

  const handleSubmit = (e) => {
    const encodedSearch = encodeURI(e.target.searchValue.value) 

    console.log(encodedSearch)
    searchSpotifyAlbums(encodedSearch);
    searchMovies(encodedSearch);
    e.preventDefault();
  }

  return (
    <div className="App">
      <Nav />
      <div id="landing-page" style={getRandomMovieBackdrop()}>
        <h1>Hello World!</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="searchValue" />
          <button type="submit">Search</button>
        </form>
      </div>
      <div id="film-search-results"></div>
      <div id="album-search-results"></div>
    </div>
  );
}

export default App;

{
  /* <Form>
  <FormGroup>
    <Form.Label>Search for a film</Form.Label>
    <Form.Control type="text" placeholder="search" />
  </FormGroup>
  <Button variant="primary" type="submit">
    Search
  </Button>
</Form>; */
}

