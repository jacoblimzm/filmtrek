import {Link} from "react-router-dom"

const GenreLink = ( {id, name}) => {

    const url = `/genres/${id}`
  return (
    <Link to={url} className="dropdown-item" >
      {name}
    </Link>
  );
};

export default GenreLink;
