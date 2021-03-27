import albumsData from "../spotifyAlbums.json";
import axios from "axios"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FilmItem from "./FilmItem";

const ResultsPage = ({ films }) => {
  const { userSearch } = useParams();
  console.log(encodeURI(userSearch));

  const [spotifyToken, setSpotifyToken] = useState("");
  const [searchFilms, setSearchFilms] = useState();
  const [searchAlbums, setSearchAlbums] = useState(albumsData.albums.items);

  const getSpotifyToken = async () => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
    const tokenEP = "https://accounts.spotify.com/api/token";
    const data = "grant_type=client_credentials";
    const tokenResponse = await axios.post(tokenEP, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
    });
    const token = tokenResponse.data.access_token;
    console.log(token);
    setSpotifyToken(token);
  };

  const searchSpotifyAlbums = async (query) => {
    const url = `https://api.spotify.com/v1/search?q=${query}&type=album`;
    const response = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + spotifyToken,
      },
    });
    console.log(response.data.albums.items);
  };

  const searchMovies = async (query) => {
    const TMDBapi = process.env.REACT_APP_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDBapi}&language=en-US&query=${query}&page=1`;

    const response = await axios.get(url);
    console.log(response.data.results);
  };

  const filmItems = films.map((film) => {
    return <FilmItem film={film} />;
  });

  useEffect(() => {
    // getSpotifyToken();

  }, []);

  return (
    <div className="results-page container-fluid ">
      <h1>RESULTS</h1>
      <div className="row">
        <div className="col-md-6">
          <h1>FILMS</h1>
          <div className="film-search-results row">{filmItems}</div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-12">
              <h1>ALBUMS</h1>
              <div className="album-search-results row">
                <div className="col-sm-6 col-md-6 col-lg-4 pb-5">
                  <img src="https://i.scdn.co/image/ab67616d0000b273ac29a65e7ffcfa6f9cb0d342" />
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4 pb-5">
                  <img src="https://i.scdn.co/image/ab67616d0000b273ac29a65e7ffcfa6f9cb0d342" />
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4 pb-5">
                  <img src="https://i.scdn.co/image/ab67616d0000b273ac29a65e7ffcfa6f9cb0d342" />
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4 pb-5">
                  <img src="https://i.scdn.co/image/ab67616d0000b273ac29a65e7ffcfa6f9cb0d342" />
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4 pb-5">
                  <img src="https://i.scdn.co/image/ab67616d0000b273ac29a65e7ffcfa6f9cb0d342" />
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4 pb-5">
                  <img src="https://i.scdn.co/image/ab67616d0000b273ac29a65e7ffcfa6f9cb0d342" />
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4 pb-5">
                  <img src="https://i.scdn.co/image/ab67616d0000b273ac29a65e7ffcfa6f9cb0d342" />
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4 pb-5">
                  <img src="https://i.scdn.co/image/ab67616d0000b273ac29a65e7ffcfa6f9cb0d342" />
                </div>
              </div>
            </div>
            <div className="col-12">
              <h2>Selected Album</h2>
              <div className="row selected-album">
                <div className="col-sm-12 col-lg-3">
                  <img src="https://i.scdn.co/image/ab67616d0000b273ac29a65e7ffcfa6f9cb0d342" />
                </div>
                <div className="col-sm-12 col-lg-9">
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
      </div>
    </div>
  );
};

export default ResultsPage;
