import axios from "axios"
import _ from "lodash";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cast from "./Cast"
import VideoModal from "./VideoModal"

// const watchlistContext = useContext(WatchlistContext);

const FilmDetails = () => {

  const { movieId } = useParams();
  // console.log(movieId);
  const [film, setFilm] = useState({});
  const [cast, setCast] = useState({});
  const [videoId, setVideoId] = useState("");
  const [showVideo, setShowVideo] = useState(false);

  const searchMovieDetails = async (query) => {
    const TMDBapi = process.env.REACT_APP_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/${query}?api_key=${TMDBapi}&language=en-US`;
    const creditsUrl = `https://api.themoviedb.org/3/movie/${query}/credits?api_key=${TMDBapi}&language=en-US`;
    const response = await axios.get(url);
    const creditsResponse = await axios.get(creditsUrl);
    // console.log(response.data);
    const filmObjResponse = response.data;
    const castArray = creditsResponse.data;
    // console.log(castArray)
    setFilm(filmObjResponse);
    setCast(castArray);
  };

  const getYoutubeVideos =  async () => {
    const ytApi = process.env.REACT_APP_YT_API_KEY;
    const uriEncodedQuery = encodeURI(_.get(film, "title", null));
    const url = `https://www.googleapis.com/youtube/v3/search?q=${uriEncodedQuery}%20trailer&part=snippet&type=video&key=${ytApi}&maxResults=5&videoEmbeddable=true`
    const response = await axios.get(url);
    const videoId = response.data.items[0].id.videoId;
    setVideoId(videoId);
    setShowVideo(true);
  }


  useEffect( () => {
    searchMovieDetails(movieId)
  }, [movieId])

  const d = new Date(_.get(film, "release_date", null));
  const year = d.getFullYear();

  const castArray = _.get(cast, "cast", []);

  const castComponentList = castArray.map(cast => {
    return <Cast {...cast} key={cast.cast_id} />
  })

    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              
              <div className="film-detail my-3">
                <div className="film-backdrop box-shadow">
                  <img
                    className="img-fluid"
                    src={`https://image.tmdb.org/t/p/w1280${_.get(film, "backdrop_path", null)}`}
                    alt={_.get(film, "title", null)}
                  />
                  <h1 className="film-title">{_.get(film, "title", null)} ({year})</h1>
                </div>
                <div className="film-meta box-shadow">
                  <img
                    className="film-meta-poster"
                    src={`https://image.tmdb.org/t/p/w1280${_.get(film, "poster_path", null)}`}
                    alt={_.get(film, "title", null)}
                  />
                  <h4>"{_.get(film, "tagline", null)}"</h4>          
                  <p>Runtime: {_.get(film, "runtime", null)} mins</p>
                  <p>Rating: {_.get(film, "vote_average", null)}/10</p>
                  <p>{_.get(film, "overview", null)}</p>
                  <a className="btn btn-primary" href={_.get(film, "homepage", null)}>Visit</a>
                  <button onClick={getYoutubeVideos} type="button" className="btn btn-danger mx-2" data-bs-toggle="modal" data-bs-target="#videoModal">
                    Watch Trailer
                  </button>
                </div>
                <div className="cast-details row">
                  <h1>Cast</h1>
                  {castComponentList}
                </div>
              </div>
            </div>
          </div>
          <VideoModal showVideo={showVideo} setShowVideo={setShowVideo} id={videoId}/>
        </div>
      
    )

}

export default FilmDetails