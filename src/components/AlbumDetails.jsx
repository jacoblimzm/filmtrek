import axios from "axios";
import _ from "lodash";
import Track from "./Track";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const AlbumDetails = () => {
  const { albumId } = useParams();

//   console.log(albumId);
  const [album, setAlbum] = useState({});

  const getAlbumDetails = async (query) => {
    // call for the spotify Bearer token which is needed for the the API calls.
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
    // console.log(token);
    
    // Call the API immediately and search for the album after the page loads. 
    const url = `https://api.spotify.com/v1/albums/${query}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(response.data);
    const albumObjResponse = response.data;
    setAlbum(albumObjResponse);
  };


  useEffect(() => {
    getAlbumDetails(albumId);
  }, [albumId]);

  const tracksArray = _.get(album, "tracks.items", []);
  //   console.log(tracksArray)

  const tracks = tracksArray.map((trackObj, index) => {
    return <Track {...trackObj} key={index} />;
  });

  // console.log(tracks);
  // checking to make sure an array of React Components are returned in the Array.

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <h2>{_.get(album, "name")}</h2>
          <div className="row album-details">
            <div className="col-md-5">
              <img
                className="img-fluid"
                src={_.get(album, "images[0].url", null)}
              />
            </div>
            <div className="col-md-7">
              <ul className="list-group list-group-flush">{tracks}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetails;
