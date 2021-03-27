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
  // const [query, setQuery] = useState("")

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
  }, []);

  // const handleUserSearch = (UriEncodedQuery) => { // no longer required to lift state from Form as useParams through Link -> Route makes search accessible.
  //   // const encodedSearch = encodeURI(query);
  //   setQuery(UriEncodedQuery);
  // };

  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/">
            <LandingPage
              popFilms={popFilms}
            />
          </Route>

          <Route path="/results/:userSearch">
            <ResultsPage />
          </Route>

          <Route path="/details">
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
