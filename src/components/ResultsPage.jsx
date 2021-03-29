import filmsData from "../popularFilmResults.json";
import albumsData from "../spotifyAlbums.json";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FilmResults from "./FilmResults";
import FilmItem from "./FilmItem";
import AlbumResults from "./AlbumResults"

const ResultsPage = () => {
  const { userSearch } = useParams();
  const encodedUserSearch = encodeURI(userSearch);
//   console.log(encodedUserSearch);

  const [spotifyToken, setSpotifyToken] = useState("");
  const [searchFilms, setSearchFilms] = useState(filmsData.results);
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
    setSearchFilms(response.data.results)
  };

  useEffect(() => {
    // getSpotifyToken();

    // searchSpotifyAlbums(encodedUserSearch);
    searchMovies(encodedUserSearch);
  }, [encodedUserSearch]);

  

  return (
    <div className="results-page container-fluid ">
      <h1>RESULTS</h1>
      <div className="row">
        <FilmResults searchFilms={searchFilms} />
        <AlbumResults searchAlbums={searchAlbums} />
      </div>
    </div>
  );
};

export default ResultsPage;
