import { Link } from "react-router-dom";

const AlbumItem = ({ images, name, id }) => {
  return (
    <div className="album-item hvr-grow-shadow col-sm-6 col-md-6 col-lg-4 my-3 px-2">
      <Link to={`/albumdetails/${id}`}>
        <img src={images[0].url} alt={name} />
      </Link>
    </div>
  );
};

export default AlbumItem;
