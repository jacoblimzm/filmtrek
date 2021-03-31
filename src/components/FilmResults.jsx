import FilmItem from "./FilmItem";
import { useContext } from "react";
import WatchlistContext from "./context/WatchlistContext";
import { ACTIONS } from "./reducers/watchlistReducer";

const FilmResults = ({ searchFilms }) => {
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

//   const compareWatchlist = (filmObj) => {
//     for (const watchlistFilm of watchlistContext.watchlistState) {
//       if (watchlistFilm.id === filmObj.id) return watchlistFilm;
//     }
//     return null;
//   };

  const filmItems = searchFilms.map((film) => {
    // const filmInWatchlist = compareWatchlist(film);
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
    <div className="col-md-6">
      <h1>FILMS</h1>
      <div className="film-search-results row">{filmItems}</div>
    </div>
  );
};

export default FilmResults;
