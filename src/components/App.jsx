import watchlistReducer from "./reducers/watchlistReducer";
import axios from "axios";
import dotenv from "dotenv";
import { useEffect, useState, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./navigation/Nav";
import LandingPage from "./pages/LandingPage";
import ResultsPage from "./pages/ResultsPage";
import FilmDetails from "./details/FilmDetails";
import AlbumDetails from "./details/AlbumDetails";
import WatchlistPage from "./pages/WatchlistPage";
import GenrePage from "./pages/GenrePage";
import PopularPage from "./pages/PopularPage";
import ErrorPage from "./pages/ErrorPage";
import AboutPage from "./pages/AboutPage";
import WatchlistProvider from "./context/WatchlistProvider";

import {ABOUT } from "../constants"

dotenv.config();

// const initialState = [];
// initial state for useReducer usually will be an object. so you will access it using "state." in the reducer function later on.
// but here we can use an array as that is what is relevant, and what we need to store is an array of film items.

function App() {
  // const [watchlistState, dispatch] = useReducer(watchlistReducer, initialState); // we want to be able to dispatch actions from the components, so we will have to pass them on using useContext.
  const [popFilms, setPopFilms] = useState([]);
  const [query, setQuery] = useState(""); // query state needs to be maintained and passed down to the Nav, so when user clicks "results" link, the app knows that a previous search was made and references that again.

  const getPopularMovies = async () => {
    const TMDBapi = process.env.REACT_APP_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDBapi}&language=en-US`;
    const response = await axios.get(url);
    const filmsArr = response.data.results;
    // console.log(filmsArr);
    setPopFilms(filmsArr);
  };

  useEffect(() => {
    // ===== Execute Upon Pageload
    getPopularMovies();
  }, []);

  const handleUserSearch = (userQuery) => {
    // required to lift the state of the user search input to update the search state at the top of the app.
    // when the query is passed to the nav as props, then encode it there.
    // const encodedSearch = encodeURI(query);
    // console.log(userQuery);
    setQuery(userQuery);
  };

  return (
    // query state has to be maintained and passed into Nav so that when results in nav is clicked, the app knows what the user searched for previously.
    <Router>
      <div className="App min-vh-100">
        <Nav query={query} handleUserSearch={handleUserSearch} />
        <WatchlistProvider>
          <Switch>
            <Route exact path="/">
              <LandingPage
                popFilms={popFilms}
                handleUserSearch={handleUserSearch}
              />
            </Route>

            <Route path="/results/:userSearch">
              <ResultsPage />
            </Route>

            <Route path="/filmdetails/:movieId">
              <FilmDetails />
            </Route>

            <Route path="/albumdetails/:albumId">
              <AlbumDetails />
            </Route>

            <Route path="/watchlist">
              <WatchlistPage />
            </Route>

            <Route path="/genres/:genreId">
              <GenrePage />
            </Route>

            <Route path="/popular">
              <PopularPage popFilms={popFilms} />
            </Route>

            <Route path="/about">
              <AboutPage />
            </Route>

            <Route>
              <ErrorPage />
            </Route>
          </Switch>
        </WatchlistProvider>
      </div>
    </Router>
  );
}

export default App;
