import FilmItem from "../results/FilmItem";
import { useContext } from "react";
import {WatchlistContext} from "../context/WatchlistProvider";
import { ACTIONS } from "../reducers/watchlistReducer";

const PopularPage = ({popFilms}) => {

    const watchlistContext = useContext(WatchlistContext);

    // can make this pure by having a "context" as a secopnd parameter.
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

  const filmItems = popFilms.map((film) => {
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
      <h1>Popular</h1>
      <hr />
      <div className="row">
        {filmItems}
      </div>
    </div>
  );
};

export default PopularPage;
