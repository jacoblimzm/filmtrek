
const LandingPage = ({handleUserSearch, popFilms}) => {

    const getRandomMovieBackdrop = () => {
        if (popFilms.results) {
          const randomMovieSelection = Math.floor(
            Math.random() * popFilms.results.length
          );
          console.log(randomMovieSelection);
          const randomBackdropPath =
            popFilms.results[randomMovieSelection].backdrop_path;
          const styles = {
            backgroundImage: `url(https://image.tmdb.org/t/p/original${randomBackdropPath})`,
          };
          return styles;
        } else {
          const styles = {
            backgroundColor: "#FFFF",
          };
          return styles;
        }
      };

    const handleSubmit = (e) => {
        const encodedSearch = encodeURI(e.target.searchValue.value);
        handleUserSearch(encodedSearch);
    }

  return (
    <div id="landing-page" style={getRandomMovieBackdrop()}>
      <h1>Hello World!</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="searchValue" />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};


export default LandingPage