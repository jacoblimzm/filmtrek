import FilmItem from "./FilmItem";
import { useContext } from "react";
import WatchlistContext from "./context/WatchlistContext";
import { ACTIONS } from "./App";

const FilmResults = ({ searchFilms }) => {
  const watchlistContext = useContext(WatchlistContext);

  const addToWatchlist = (filmObj) => {
    watchlistContext.watchlistDispatch({
      type: ACTIONS.ADD_TO_WATCHLIST,
      payload: { film: filmObj },
    });
  };

  const removeFromWatchlist = (filmObj) => {
    watchlistContext.watchlistDispatch({
      type: ACTIONS.REMOVE_FROM_WATCHLIST,
      payload: { film: filmObj },
    });
  };
  const filmItems = searchFilms.map((film) => {
    return (
      <FilmItem
        {...film}
        key={film.id}
        id={film.id}
        isOnWatchlist={watchlistContext.watchlistState.includes(film)}
        addToWatchlist={() => addToWatchlist(film)}
        removeFromWatchlist={() => removeFromWatchlist(film)}
      />
    );
  });

  return (
    <div className="col-md-6">
      <h1>FILMS</h1>
      <div className="film-search-results row">{filmItems}</div>
    </div>
  );
};

export default FilmResults;
