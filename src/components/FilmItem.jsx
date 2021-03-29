import { Link } from "react-router-dom";
import {useContext} from "react";
import WatchlistContext from "./context/WatchlistContext"
import {ACTIONS} from "./App"




const FilmItem = ({ release_date, title, vote_average, poster_path, id}) => {
  
  const watchlistContext = useContext(WatchlistContext);

  const handleClick = () => {
    watchlistContext.watchlistDispatch( {type: ACTIONS.ADD_TO_WATCHLIST, payload: {command: "hello"}} )
  }
  const d = new Date(release_date);
  const year = d.getFullYear();
  return (
    <div className="film-item hvr-grow-shadow rounded col-md-6 col-lg-4 my-3 p-3">
      <Link to={`/filmdetails/${id}`}>
        <img
          className="movie-search-img img-fluid"
          src= {poster_path === null ? `https://everyfad.com/static/images/movie_poster_placeholder.29ca1c87.svg` : `https://image.tmdb.org/t/p/w342${poster_path}`}
          alt={title}
        />
      </Link>
      <p>{title} <span>({year})</span></p> 
      <p className="film-item-rating">{vote_average} ★</p>
      <button type="button" className="btn btn-sm btn-outline-success" onClick={handleClick}>Add to Watchlist</button>
    </div>
  );
};

export default FilmItem;
