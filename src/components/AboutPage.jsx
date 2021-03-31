import TMDBLogo from "../tmdblogo.svg";

const AboutPage = () => {
  return (
    <div className="d-flex align-content-center justify-content-center flex-wrap">
      <div className="-container">
        <div className="landing-page-text">
          <h6>
            Film Data:All film-related metadata used in Letterboxd, including
            actor, director and studio names, synopses, release dates, trailers
            and poster art is supplied by{" "}
            <a href="https://www.themoviedb.org/">The Movie Database</a> (TMDb).
          </h6>
          <img className="tmdb-logo" src={TMDBLogo} />
          <p>
            Filmtrek uses the TMDb API but is not endorsed or certified by TMDb.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
