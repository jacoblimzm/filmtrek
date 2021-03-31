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
            {/* <div className="col-12">
              <h2>Selected Album</h2>
              <div className="row selected-album">
                <div className="col-sm-12 col-lg-3">
                  <img src="https://i.scdn.co/image/ab67616d0000b273ac29a65e7ffcfa6f9cb0d342" />
                </div>
                <div className="col-sm-12 col-lg-9">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                    <li className="list-group-item">A fourth item</li>
                    <li className="list-group-item">And a fifth one</li>
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                    <li className="list-group-item">A fourth item</li>
                    <li className="list-group-item">And a fifth one</li>
                  </ul>
                </div>
              </div>
            </div> */}
          </div>
        </div>
    )
}

export default AlbumResults;