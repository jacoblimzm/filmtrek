
const Track = ( {name, external_urls} ) => {
  return (
    <li className="list-group-item">
      <a rel="noreferrer" target="_blank" href={external_urls.spotify}>
        {name}
      </a>
    </li>
  );
};

export default Track
