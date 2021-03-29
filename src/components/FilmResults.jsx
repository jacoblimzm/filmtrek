import FilmItem from "./FilmItem"

const FilmResults = ( {searchFilms} ) => {

    const filmItems = searchFilms.map((film) => {
        return <FilmItem {...film} key={film.id} id={film.id} />;
      });

  return (
    <div className="col-md-6">
      <h1>FILMS</h1>
      <div className="film-search-results row">{filmItems}</div>
    </div>
  );
};


export default FilmResults
