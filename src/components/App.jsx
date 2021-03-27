import filmsData from "../popularFilmResults.json";
import albumsData from "../spotifyAlbums.json";
import axios from "axios";
import dotenv from "dotenv";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, useParams, Route, Switch } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import Nav from "./Nav";
import LandingPage from "./LandingPage";
import FilmItem from "./FilmItem";
import ResultsPage from "./ResultsPage";
import DetailsPage from "./DetailsPage";

dotenv.config();

function App() {
  const [spotifyToken, setSpotifyToken] = useState("");
  const [popFilms, setPopFilms] = useState(filmsData.results);
  const [searchFilms, setSearchFilms] = useState();
  const [searchAlbums, setSearchAlbums] = useState(albumsData.albums.items);

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
    getSpotifyToken();
    // getPopularMovies();
  }, []);

  const handleUserSearch = (query) => {
    // const encodedSearch = encodeURI(query);
    searchSpotifyAlbums(query);
    searchMovies(query);
  };

  return (
    <Router>
      <div className="App">
        <Nav handleUserSearch={handleUserSearch} />
        <Switch>
          <Route exact path="/">
            <LandingPage
              handleUserSearch={handleUserSearch}
              popFilms={popFilms}
            />
          </Route>

          <Route path="/results/:userSearch">
            <ResultsPage films={popFilms} />
          </Route>

          <Route path="/details">
            <DetailsPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
