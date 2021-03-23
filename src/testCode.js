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
  
