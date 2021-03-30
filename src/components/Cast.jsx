const Cast = ({ name, profile_path, character }) => {
  const url = `https://image.tmdb.org/t/p/w185${profile_path}`;
  return (
    <div className="col-xs-4 col-sm-4 col-md-3 my-1">
      <div class="card cast-card box-shadow">
        <img
          className="img-fluid"
          src={
            profile_path === null
              ? `https://everyfad.com/static/images/movie_poster_placeholder.29ca1c87.svg`
              : url
          }
          alt={name}
        />
        <div class="card-body p-2">
          <h6 class="card-title">{name}</h6>
          <p class="card-text">{character}</p>
        </div>
      </div>
    </div>
  );
};

export default Cast;

