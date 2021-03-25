import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import SearchResults from "./SearchResults";
import dotenv from "dotenv";
dotenv.config();

function App() {

  const [spotifyToken, setSpotifyToken] = useState("");

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
    // setSpotifyToken(token);

    const response = await axios.get(
      "https://api.spotify.com/v1/browse/categories?country=SG",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    console.log(response.data);
  };


  

  const getYoutubeSearchResults = async () => {
    const YTapi = process.env.REACT_APP_YT_API_KEY;
    const searchEP = "https://www.googleapis.com/youtube/v3/search";

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?q=interstellar%20album&part=snippet&type=video&key=${YTapi}&maxResults=10&videoEmbeddable=true`
    );

    console.log(response.data);
  };

  const getPopularMovies = async () => {
    const TMDBapi = process.env.REACT_APP_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDBapi}&language=en-US`;
    const response = await axios.get(url);
    const filmsArr = response.data;

    console.log(filmsArr);
  };

  useEffect(() => {
    getSpotifyToken();
    
    getYoutubeSearchResults()
    getPopularMovies();
  }, []);

  return (
    <div className="App">
      <h1>Hello World!</h1>
    </div>
  );
}

export default App;
