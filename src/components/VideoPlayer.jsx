const VideoPlayer = () => {
    return (
      <div className="video">
        <iframe
          title="Embedded Youtube Player"
          id="ytplayer"
          type="text/html"
          width="640"
          height="480"
          src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
          frameborder="5"
        ></iframe>
      </div>
    );
  };
  
  export default VideoPlayer;