import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FilmResults from "../results/FilmResults";
import AlbumResults from "../results/AlbumResults"

const ResultsPage = () => {
  const { userSearch } = useParams();
  const encodedUserSearch = encodeURI(userSearch);
//   console.log(encodedUserSearch);

  // const [spotifyToken, setSpotifyToken] = useState("");
  const [searchFilms, setSearchFilms] = useState([]);
  const [searchAlbums, setSearchAlbums] = useState([]);
  
  // the spotify token and search to be done at once. 
  const getSpotifyToken = async (query) => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
    const tokenEP = "https://accounts.spotify.com/api/token";
    const data = "grant_type=client_credentials";
    const tokenResponse = await axios.post(tokenEP, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // this is what the browser/server will interpret the data as.
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
    });
    const token = tokenResponse.data.access_token;
    // console.log(token);
    // setSpotifyToken(token);
    searchSpotifyAlbums(query, token)
  };

  const searchSpotifyAlbums = async (query, spotifyToken) => { // refactor to accept query and token. make function pure.
    const url = `https://api.spotify.com/v1/search?q=${query}&type=album`;
    const response = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + spotifyToken,
      },
    });
    // console.log(response.data.albums.items);
    setSearchAlbums(response.data.albums.items)
  };

  const searchMovies = async (query) => {
    const TMDBapi = process.env.REACT_APP_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDBapi}&language=en-US&query=${query}&page=1`;
    const response = await axios.get(url);
    // console.log(response.data.results);
    setSearchFilms(response.data.results)
  };

  useEffect(() => {
    getSpotifyToken(encodedUserSearch);
    // searchSpotifyAlbums(encodedUserSearch);
    searchMovies(encodedUserSearch);
  }, [encodedUserSearch]); 
  // encodedUserSearch is in the dependency array because we want the results page to re-render whenever the user enters a new search result.
  

  return (
    <div className="results-page container-fluid ">
      <h1>RESULTS</h1>
      <hr />
      <div className="row">
        <FilmResults searchFilms={searchFilms} />
        <AlbumResults searchAlbums={searchAlbums} />
      </div>
    </div>
  );
};

export default ResultsPage;
