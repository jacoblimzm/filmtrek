
const AlbumItem = ( {images, name}) => {
  return (
    <div className="col-sm-6 col-md-6 col-lg-4 pb-5">
      <img src={images[0].url} alt={name}/>
    </div>
  );
};

export default AlbumItem;
