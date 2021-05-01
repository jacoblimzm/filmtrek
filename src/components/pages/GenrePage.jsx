import FilmItem from "../results/FilmItem";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import {WatchlistContext} from "../context/WatchlistProvider";
import { ACTIONS } from "../reducers/watchlistReducer";
import axios from "axios";

const GenrePage = () => {

    const watchlistContext = useContext(WatchlistContext);
    const { genreId } = useParams();
    // console.log(genreId)
    const [movies, setMovies] = useState([])

    const getMoviesOfGenre = async () => {
        const TMDBapi = process.env.REACT_APP_TMDB_API_KEY
        const url = `https://api.themoviedb.org/3/movie/${genreId}/similar?api_key=${TMDBapi}&language=en-US&page=1`
        const response = await axios.get(url);
        setMovies(response.data.results);
    }

    useEffect ( () => {
        getMoviesOfGenre();
    }, [genreId]);

  const addToWatchlist = (filmObj) => {
    watchlistContext.dispatch({
      type: ACTIONS.ADD_TO_WATCHLIST,
      payload: {
        film: filmObj,
        filmId: filmObj.id,
      },
    });
  };

  const removeFromWatchlist = (filmObj) => {
    watchlistContext.dispatch({
      type: ACTIONS.REMOVE_FROM_WATCHLIST,
      payload: {
        film: filmObj,
        filmId: filmObj.id,
      },
    });
  };

  const filmItems = movies.map((film) => {
    return (
      <FilmItem
        {...film}
        key={film.id}
        id={film.id}
        isOnWatchlist={watchlistContext.watchlistState.some( watchlistFilm => {
          return watchlistFilm.id === film.id
        })}
        addToWatchlist={() => addToWatchlist(film)}
        removeFromWatchlist={() => removeFromWatchlist(film)}
      />
    );
  });

  return (
    <div className="container-fluid px-5">
      <h1>Genres</h1>
      <hr />
      <div className="row">
        {filmItems}
      </div>
    </div>
  );
};

export default GenrePage;
