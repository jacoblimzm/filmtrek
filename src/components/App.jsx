import filmsData from "../popularFilmResults.json";
import albumsData from "../spotifyAlbums.json";
import axios from "axios";
import dotenv from "dotenv";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import SearchResults from "./SearchResults";
import Nav from "./Nav";
import LandingPage from "./LandingPage";

dotenv.config();

function App() {
  const [spotifyToken, setSpotifyToken] = useState("");
  const [popFilms, setPopFilms] = useState(filmsData);
  const [searchFilms, setSearchFilms] = useState(albumsData);

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

  const handleUserSearch = (query) => {
    const encodedSearch = encodeURI(query);
    searchSpotifyAlbums(encodedSearch);
    searchMovies(encodedSearch);
  };

  return (
    <Router>
      <div className="App">
        <Nav />
        {/* <LandingPage handleUserSearch={handleUserSearch} popFilms={popFilms}/> */}

        <div className="results-page container-fluid">
          <h1>RESULTS</h1>
          <div className="row">
            <div className="film-search-results col-md-6">
              <h1>FILMS</h1>
              <div className="row">
                <div className="film-item col-md-4">hello</div>
                <div className="film-item col-md-4">hello</div>
                <div className="film-item col-md-4">hello</div>
                <div className="film-item col-md-4">hello</div>
              </div>
            </div>
            <div className="album-search-results col-md-6">
              <div className="row">
                <div className="col-12">
                  <h1>ALBUMS</h1>
                </div>
                <div className="col-12">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
