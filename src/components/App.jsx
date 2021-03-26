import filmsData from "../popularFilmResults.json";
import albumsData from "../spotifyAlbums.json";
import axios from "axios";
import dotenv from "dotenv";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import Nav from "./Nav";
import LandingPage from "./LandingPage";
import FilmItem from "./FilmItem";
import ResultsPage from "./ResultsPage";

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
        {/* <ResultsPage films={popFilms}/> */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <h2>DETAILS</h2>
              <div className="film-detail">
                <div className="film-backdrop">
                  <img
                    className="img-fluid"
                    src="https://image.tmdb.org/t/p/w1280/hJuDvwzS0SPlsE6MNFOpznQltDZ.jpg"
                  />
                  <h1 className="film-title">Title of Film (2007)</h1>
                </div>
                <div className="film-meta">
                  <img
                    className="film-meta-poster"
                    src="https://image.tmdb.org/t/p/w780//lPsD10PP4rgUGiGR4CCXA6iY0QQ.jpg"
                  />
                  <h2>Tagline</h2>          
                  <p>227mins</p>
                  <p>Rating: 8.5/10</p>
                  <p>Overview</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <h2>Selected Album</h2>
              <div className="row album-details">
                <div className="col-12">
                  <img
                    className="img-fluid"
                    src={searchAlbums[0].images[1].url}
                  />
                </div>
                <div className="col-12">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">An item</li>
                    <li class="list-group-item">A second item</li>
                    <li class="list-group-item">A third item</li>
                    <li class="list-group-item">A fourth item</li>
                    <li class="list-group-item">And a fifth one</li>
                    <li class="list-group-item">An item</li>
                    <li class="list-group-item">A second item</li>
                    <li class="list-group-item">A third item</li>
                    <li class="list-group-item">A fourth item</li>
                    <li class="list-group-item">And a fifth one</li>
                  </ul>
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
