import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";

function App() {
  const [spotifyToken, setSpotifyToken] = useState("");

  const ClientId = "8976f20ccda14b2baa377e9f3b92f75a";
  const ClientSecret = "ca3599130ebc4f7bbdf2a83b1f81a67b";
  const tokenEP = "https://accounts.spotify.com/api/token";
  const data = "grant_type=client_credentials";

  const getSpotifyToken = async () => {
    const response = await axios.post(tokenEP, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(ClientId + ":" + ClientSecret),
      },
    });

    const token = response.data.access_token;
    console.log(token);
    setSpotifyToken(token);
  };

  const getSpotifyCategories = async () => {
    const response = await axios.get(
      "https://api.spotify.com/v1/browse/categories?country=SG",
      {
        headers: {
          Authorization: "Bearer " + spotifyToken,
        },
      }
    );

    console.log(response.data);
  };

  const API_KEY = "AIzaSyDOAfxXWYQaMahgtIWanYRKBBMDr5oFVBU";
  const searchEP = "https://www.googleapis.com/youtube/v3/search";

  const getYoutubeSearchResults = async () => {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search?q=interstellar%20album&part=snippet&type=video&key=AIzaSyDOAfxXWYQaMahgtIWanYRKBBMDr5oFVBU&maxResults=10&videoEmbeddable=true"
    );

    console.log(response.data);
  };
  useEffect(() => {
    // getSpotifyToken();
    // getSpotifyCategories();
    // getYoutubeSearchResults()
  }, []);

  return (
    <div className="App">
      <h1>Hello World!</h1>
      <VideoPlayer />
    </div>
  );
}

export default App;
