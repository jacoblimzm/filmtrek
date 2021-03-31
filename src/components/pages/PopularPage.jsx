import FilmItem from "../results/FilmItem";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import WatchlistContext from "../context/WatchlistContext";
import { ACTIONS } from "../reducers/watchlistReducer";

const PopularPage = ({popFilms}) => {

    const watchlistContext = useContext(WatchlistContext);

  const addToWatchlist = (filmObj) => {
    watchlistContext.watchlistDispatch({
      type: ACTIONS.ADD_TO_WATCHLIST,
      payload: {
        film: filmObj,
        filmId: filmObj.id,
      },
    });
  };

  const removeFromWatchlist = (filmObj) => {
    watchlistContext.watchlistDispatch({
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
