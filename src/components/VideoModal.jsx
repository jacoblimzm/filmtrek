const VideoModal = ({id}) => {

  const url = `https://www.youtube.com/embed/${id}`
  return (
    <div
      class="modal fade"
      id="videoModal"
      tabindex="-1"
      aria-labelledby="videoModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-fullscreen-lg-down">
        <div class="modal-content">
          <div class="modal-body">
            <div className="video">
              <iframe
                autoPlay="0"
                title="Embedded Youtube Player"
                id="ytplayer"
                type="text/html"
                width="640"
                height="480"
                src={url}
                frameBorder="5"
              ></iframe>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-dark" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;

// https://developers.google.com/youtube/v3/getting-started#quota
//   Calculating quota usage
// Google calculates your quota usage by assigning a cost to each request. Different types of operations have different quota costs. For example:

// A read operation that retrieves a list of resources -- channels, videos, playlists -- usually costs 1 unit.
// A write operation that creates, updates, or deletes a resource usually has costs 50 units.
// A search request costs 100 units.
// A video upload costs 1600 units.
// The Quota costs for API requests table shows the quota cost of each API method. With these rules in mind, you can estimate the number of requests that your application could send per day without exceeding your quota.
