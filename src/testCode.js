// ===== Alternative API Call to Spotify for Access Token without axios .post method

const getSpotifyTokenRegular = () => {
    axios(spotifyEP, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + btoa(ClientId + ":" + ClientSecret)
      },
      data: "grant_type=client_credentials",
      method: "POST"
    }).then( response => {
      console.log(response)
    })
  }
  
// Spotify Endpoints:
// Get All Categories: https://api.spotify.com/v1/browse/categories
// 

// ===== Youtube Video Search API Call
const getYoutubeSearchResults = async () => {
  const YTapi = process.env.REACT_APP_YT_API_KEY;
  const searchEP = "https://www.googleapis.com/youtube/v3/search";

  const response = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?q=interstellar%20album&part=snippet&type=video&key=${YTapi}&maxResults=10&videoEmbeddable=true`
  );

  console.log(response.data);
};