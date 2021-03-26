



const FilmItem = ({ film }) => {

    
  return (
    <div className="film-item col-md-6 col-lg-4 mb-4">
      <img
        className="movie-img"
        src={`https://image.tmdb.org/t/p/w154${film.poster_path}`}
      />
    </div>
  );
};

export default FilmItem;
