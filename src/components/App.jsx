import "../App.css";
import axios from "axios";

import { useEffect, useState } from "react";

function App() {

  const [spotifyToken, setSpotifyToken] = useState("");

  const ClientId = "8976f20ccda14b2baa377e9f3b92f75a";
  const ClientSecret = "ca3599130ebc4f7bbdf2a83b1f81a67b";
  const tokenEP = "https://accounts.spotify.com/api/token";
  const data = "grant_type=client_credentials"

  const getSpotifyToken = async () => {
    const response = await axios.post(tokenEP, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + btoa(ClientId + ":" + ClientSecret)
      },
    });

    const token = response.data.access_token;
    console.log(token)
    setSpotifyToken(token)

  };

  const getSpotifyCategories = async () => {
    const response = await axios.get("https://api.spotify.com/v1/browse/categories?country=SG", {
      headers: {
        "Authorization" : "Bearer " + spotifyToken
      }
    });

    console.log(response)
  }
  useEffect( () => {
    // getSpotifyToken();
    // getSpotifyCategories();
  }, []) 
  




  return (
    <div className="App">
      <h1>Hello World!</h1>
      
    </div>
  );
}

export default App;
