

const Cast = ( {name, profile_path, character} ) => {

    const url = `https://image.tmdb.org/t/p/w185${profile_path}`
  return (
    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-2 my-2">
      <img
        className="img-fluid"
        src={profile_path === null ? `https://everyfad.com/static/images/movie_poster_placeholder.29ca1c87.svg` : url}
      />
      <p>{name}</p>
      <p>{character}</p>
    </div>
  );
};


export default Cast