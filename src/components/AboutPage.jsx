import TMDBLogo from "../tmdblogo.svg";

const AboutPage = () => {
  return (
    <div className="landing-page d-flex align-content-center justify-content-center flex-wrap">
      <div className="mx-5">
        <div className="landing-page-text">
          <p>
            <em>Film Data:</em> All film-related metadata used in filmtrek,
            including actor, director and studio names, synopses, release dates,
            trailers and poster art is supplied by{" "}
            <a href="https://www.themoviedb.org/">The Movie Database</a> (TMDb).
          </p>
          <img className="tmdb-logo" src={TMDBLogo} />
          <p>
            filmtrek uses the TMDb API but is not endorsed or certified by TMDb.
          </p>
          <p>
            <em>Album & Music Data:</em> All music-related metadata used
            filmtrek is supplied by{" "}
            <a href="https://www.spotify.com/us/home/">Spotify</a>
          </p>
          <p>
            <em>Trailers:</em> All videos and trailers used in filmtrek is
            supplied from <a href="https://www.youtube.com/">Youtube</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
