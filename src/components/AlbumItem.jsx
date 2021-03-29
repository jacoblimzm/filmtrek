import { Link } from "react-router-dom";

const AlbumItem = ({ images, name, id }) => {
  return (
    <div className="col-sm-6 col-md-6 col-lg-4 pb-5">
      <Link to={`/albumdetails/${id}`}>
        <img src={images[0].url} alt={name} />
      </Link>
    </div>
  );
};

export default AlbumItem;
