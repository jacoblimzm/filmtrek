import FilmItem from "../results/FilmItem";
import { useContext } from "react";
import {WatchlistContext} from "../context/WatchlistProvider";
import { ACTIONS } from "../reducers/watchlistReducer";

const WatchlistPage = () => {
  const watchlistContext = useContext(WatchlistContext);

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

  const watchlistItems = watchlistContext.watchlistState.map((film) => {
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
      <h1>Watchlist</h1>
      <hr />
      <div className="row">
        {watchlistItems.length === 0 ? (
          <h3 className="empty-text">Your watchlist is empty!</h3>
        ) : (
          watchlistItems
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;
