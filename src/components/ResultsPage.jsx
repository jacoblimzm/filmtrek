import FilmItem from "./FilmItem"

const ResultsPage = ( {films} ) => {

    const filmItems = films.map((film) => {
        return <FilmItem film={film} />;
      });


    return (
        <div className="results-page container-fluid ">
          <h1>RESULTS</h1>
          <div className="row">
            <div className="col-md-6">
              <h1>FILMS</h1>
              <div className="film-search-results row">{filmItems}</div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-12">
                  <h1>ALBUMS</h1>
                  <div className="album-search-results row">
                    <div className="col-sm-6 col-md-6 col-lg-4 pb-5">
                      <img src="https://i.scdn.co/image/ab67616d0000b273ac29a65e7ffcfa6f9cb0d342" />
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-4 pb-5">
                      <img src="https://i.scdn.co/image/ab67616d0000b273ac29a65e7ffcfa6f9cb0d342" />
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-4 pb-5">
                      <img src="https://i.scdn.co/image/ab67616d0000b273ac29a65e7ffcfa6f9cb0d342" />
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-4 pb-5">
                      <img src="https://i.scdn.co/image/ab67616d0000b273ac29a65e7ffcfa6f9cb0d342" />
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-4 pb-5">
                      <img src="https://i.scdn.co/image/ab67616d0000b273ac29a65e7ffcfa6f9cb0d342" />
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-4 pb-5">
                      <img src="https://i.scdn.co/image/ab67616d0000b273ac29a65e7ffcfa6f9cb0d342" />
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-4 pb-5">
                      <img src="https://i.scdn.co/image/ab67616d0000b273ac29a65e7ffcfa6f9cb0d342" />
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-4 pb-5">
                      <img src="https://i.scdn.co/image/ab67616d0000b273ac29a65e7ffcfa6f9cb0d342" />
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <h2>Selected Album</h2>
                  <div className="row selected-album">
                    <div className="col-sm-12 col-lg-3">
                      <img src="https://i.scdn.co/image/ab67616d0000b273ac29a65e7ffcfa6f9cb0d342" />
                    </div>
                    <div className="col-sm-12 col-lg-9">
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">An item</li>
                        <li class="list-group-item">A second item</li>
                        <li class="list-group-item">A third item</li>
                        <li class="list-group-item">A fourth item</li>
                        <li class="list-group-item">And a fifth one</li>
                        <li class="list-group-item">An item</li>
                        <li class="list-group-item">A second item</li>
                        <li class="list-group-item">A third item</li>
                        <li class="list-group-item">A fourth item</li>
                        <li class="list-group-item">And a fifth one</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}


export default ResultsPage