import FilmItem from "./FilmItem"
import {useContext} from "react"
import WatchlistContext from "./context/WatchlistContext"
import {ACTIONS} from "./App"

const FilmResults = ( {searchFilms} ) => {

    const watchlistContext = useContext(WatchlistContext);
    const addToWatchlist = (filmObj) => {
        watchlistContext.watchlistDispatch( {type: ACTIONS.ADD_TO_WATCHLIST, payload: {film: filmObj}})
    }

    const filmItems = searchFilms.map((film) => {
        return <FilmItem {...film} key={film.id} id={film.id} addToWatchlist={() => addToWatchlist(film)}/>;
      });

  return (
    <div className="col-md-6">
      <h1>FILMS</h1>
      <div className="film-search-results row">{filmItems}</div>
    </div>
  );
};


export default FilmResults
