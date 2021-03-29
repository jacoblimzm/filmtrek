import filmsData from "../popularFilmResults.json";
import axios from "axios";
import dotenv from "dotenv";
import { useEffect, useState, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Nav";
import LandingPage from "./LandingPage";
import ResultsPage from "./ResultsPage";
import FilmDetails from "./FilmDetails";
import AlbumDetails from "./AlbumDetails";
import WatchlistContext from "./context/WatchlistContext"

dotenv.config();

export const ACTIONS = {
  ADD_TO_WATCHLIST: "add_to_watchlist",
  REMOVE_FROM_WATCHLIST: "remove_from_watchlist",
};

const initialState = [];
// initial state for useReducer usually will be an object. so you will access it using "state." in the reducer function later on.
// but here we can use an array as that is what is relevant, and what we need to store is an array of film items.
const watchlistReducer = (watchlistFilms, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_WATCHLIST:
      console.log("clicked");
      console.log(action.payload.command);
      return [...watchlistFilms, action.payload.filmObj];
    // case ACTIONS.REMOVE_FROM_WATCHLIST:
    //   const filmIndex = state.indexOf(action.payload.filmObj);
    //   if (filmIndex === -1) {
    //     console.log("Adding..");
    //     tempFaves.push(filmObj);
    //   } else {
    //     console.log("Removing..");
    //     tempFaves.splice(filmIndex, 1); // removes the film from the index which was found using indexOf.
    //   }
    default:
    return watchlistFilms
  }
};

function App() {
  const [watchlistState, dispatch] = useReducer(watchlistReducer, initialState); // we want to be able to dispatch actions from the components, so we will have to pass them on using useContext.
  const [popFilms, setPopFilms] = useState(filmsData.results);
  const [query, setQuery] = useState(""); // query state needs to be maintained and passed down to the Nav, so when user clicks "results" link, the app knows that a previous search was made and references that again.

  const getPopularMovies = async () => {
    const TMDBapi = process.env.REACT_APP_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDBapi}&language=en-US`;
    const response = await axios.get(url);
    const filmsArr = response.data;
    // console.log(filmsArr);
    setPopFilms(filmsArr);
  };

  useEffect(() => {
    // ===== Execute Upon Pageload
    // getPopularMovies();
  });

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
      <div className="App">
        <Nav query={query} handleUserSearch={handleUserSearch} />
        <Switch>
          <Route exact path="/">
            <LandingPage
              popFilms={popFilms}
              handleUserSearch={handleUserSearch}
            />
          </Route>
          <WatchlistContext.Provider value={ {watchlistState: watchlistState, watchlistDispatch: dispatch}} >
          <Route path="/results/:userSearch">
            <ResultsPage />
          </Route>

          <Route path="/filmdetails/:movieId">
            <FilmDetails />
          </Route>

          <Route path="/albumdetails/:albumId">
            <AlbumDetails />
          </Route>
          {/* <Route>
            <ErrorPage />
          </Route> */}
          </WatchlistContext.Provider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
