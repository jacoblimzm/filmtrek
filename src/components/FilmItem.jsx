



const FilmItem = ({ film }) => {


  return (
    <div className="film-item col-md-6 col-lg-4 pb-5">
      <img
        className="movie-search-img"
        src={`https://image.tmdb.org/t/p/w154${film.poster_path}`}
      />
    </div>
  );
};

export default FilmItem;
