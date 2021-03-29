import filmsData from "../popularFilmResults.json";
import axios from "axios";
import dotenv from "dotenv";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import Nav from "./Nav";
import LandingPage from "./LandingPage";
import FilmItem from "./FilmItem";
import ResultsPage from "./ResultsPage";
import DetailsPage from "./DetailsPage";

dotenv.config();

function App() {
  
  const [popFilms, setPopFilms] = useState(filmsData.results);
  const [query, setQuery] = useState("") // query state needs to be maintained and passed down to the Nav, so when user clicks "results" link, the app knows that a previous search was made and references that again.

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

  
  const handleUserSearch = (userQuery) => { // required to lift the state of the user search input to update the search state at the top of the app.
    // very weird, but note that URI encoded strings cannot be accepted as input, and the state does not update if encoded from handleSubmit in SearchBar. only string seems to work.
    // when the query is passed to the nav as props, then encode it there.
    // const encodedSearch = encodeURI(query);
    // console.log(userQuery);
    setQuery(userQuery);
  };

  return (
    // query state has to be maintained and passed into Nav so that when results in nav is clicked, the app knows what the user searched for previously.
    <Router>
      <div className="App">
        <Nav query={query} handleUserSearch={handleUserSearch}/>
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

          <Route path="/details/:movieId">
            <DetailsPage />
          </Route>

          {/* <Route>
            <ErrorPage />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
