import FilmItem from "./FilmItem";
import { useContext } from "react";
import WatchlistContext from "./context/WatchlistContext";
import { ACTIONS } from "./App";
import _ from "lodash";

const WatchlistPage = () => {
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

  const watchlistItems = watchlistContext.watchlistState.map((film) => {
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
    <div className="container-fluid">
    <h1>Watchlist</h1>
    <hr />
      <div className="row">
        {watchlistItems.length === 0 ? <h3 className="empty-text">Your watchlist is empty!</h3> : watchlistItems}
      </div>
    </div>
  );
};

export default WatchlistPage;