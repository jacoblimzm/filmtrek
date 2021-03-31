import AlbumItem from "./AlbumItem"

const AlbumResults = ( {searchAlbums} ) => {

    const albumItems = searchAlbums.map(album => {
        return <AlbumItem {...album} key={album.id} id={album.id} />
    })

    return (
        <div className="col-md-6">
          <div className="row">
            <div className="col-12">
              <h1>ALBUMS</h1>
              <div className="album-search-results row">
                {albumItems}
              </div>
            </div>
          </div>
        </div>
    )
}

export default AlbumResults;