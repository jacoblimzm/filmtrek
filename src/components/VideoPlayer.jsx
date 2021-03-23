
const VideoPlayer = () => {
  


  return (
    <div className="video">
      <iframe
        autoPlay="0"
        title="Embedded Youtube Player"
        id="ytplayer"
        type="text/html"
        width="640"
        height="480"
        src="https://www.youtube.com/embed/vLGI81mDYTg"
        frameBorder="5"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;

// https://developers.google.com/youtube/v3/getting-started#quota
//   Calculating quota usage
// Google calculates your quota usage by assigning a cost to each request. Different types of operations have different quota costs. For example:

// A read operation that retrieves a list of resources -- channels, videos, playlists -- usually costs 1 unit.
// A write operation that creates, updates, or deletes a resource usually has costs 50 units.
// A search request costs 100 units.
// A video upload costs 1600 units.
// The Quota costs for API requests table shows the quota cost of each API method. With these rules in mind, you can estimate the number of requests that your application could send per day without exceeding your quota.
