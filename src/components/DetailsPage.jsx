import axios from "axios"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const DetailsPage = () => {

  const { movieId } = useParams();
  console.log(movieId)

  const searchMovieDetails = async (query) => {
    const TMDBapi = process.env.REACT_APP_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/${query}?api_key=${TMDBapi}&language=en-US`;
    
    const response = await axios.get(url);
    console.log(response.data);
  };

  useEffect( () => {
    searchMovieDetails(movieId)
  })

    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <h2>DETAILS</h2>
              <div className="film-detail">
                <div className="film-backdrop">
                  <img
                    className="img-fluid"
                    src="https://image.tmdb.org/t/p/w1280/hJuDvwzS0SPlsE6MNFOpznQltDZ.jpg"
                  />
                  <h1 className="film-title">Title of Film (2007)</h1>
                </div>
                <div className="film-meta">
                  <img
                    className="film-meta-poster"
                    src="https://image.tmdb.org/t/p/w780//lPsD10PP4rgUGiGR4CCXA6iY0QQ.jpg"
                  />
                  <h2>Tagline</h2>          
                  <p>227mins</p>
                  <p>Rating: 8.5/10</p>
                  <p>Overview</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <h2>Selected Album</h2>
              <div className="row album-details">
                <div className="col-12">
                  <img
                    className="img-fluid"
                    src="https://i.scdn.co/image/ab67616d0000b273ac29a65e7ffcfa6f9cb0d342"
                  />
                </div>
                <div className="col-12">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                    <li className="list-group-item">A fourth item</li>
                    <li className="list-group-item">And a fifth one</li>
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                    <li className="list-group-item">A fourth item</li>
                    <li className="list-group-item">And a fifth one</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    )

}

export default DetailsPage