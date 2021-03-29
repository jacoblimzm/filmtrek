import axios from "axios"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


const AlbumDetails = () => {
    const [spotifyToken, setSpotifyToken] = useState("");

const { albumId } = useParams();
  console.log(albumId)

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

  const searchAlbumDetails = async (query) => {
    const url = `https://api.spotify.com/v1/albums/${query}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + spotifyToken,
      },
    });
    console.log(response.data.albums.items);
  };

  useEffect( () => {
    // getSpotifyToken();
    // searchAlbumDetails(albumId);
  })

    return (
        <div className="container-fluid">
        <div className="row">
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

export default AlbumDetails