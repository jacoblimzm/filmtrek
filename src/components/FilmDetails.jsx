import axios from "axios"
import _ from "lodash";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const FilmDetails = () => {

  const { movieId } = useParams();
  console.log(movieId);
  const [film, setFilm] = useState({});

  const searchMovieDetails = async (query) => {
    const TMDBapi = process.env.REACT_APP_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/${query}?api_key=${TMDBapi}&language=en-US`;
    
    const response = await axios.get(url);
    // console.log(response.data);

    const filmObjResponse = response.data;
    setFilm(filmObjResponse);
  };

  useEffect( () => {
    searchMovieDetails(movieId)
  })

  const d = new Date(_.get(film, "release_date", null));
  const year = d.getFullYear();
  
    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h2>DETAILS</h2>
              <div className="film-detail">
                <div className="film-backdrop">
                  <img
                    className="img-fluid"
                    src={`https://image.tmdb.org/t/p/w1280${_.get(film, "backdrop_path", null)}`}
                  />
                  <h1 className="film-title">{_.get(film, "title", null)} {year}</h1>
                </div>
                <div className="film-meta">
                  <img
                    className="film-meta-poster"
                    src={`https://image.tmdb.org/t/p/w1280${_.get(film, "poster_path", null)}`}
                  />
                  <h2>{_.get(film, "tagline", null)}</h2>          
                  <p>{_.get(film, "runtime", null)}</p>
                  <p>Rating: {_.get(film, "vote_average", null)}/10</p>
                  <p>{_.get(film, "overview", null)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    )

}

export default FilmDetails