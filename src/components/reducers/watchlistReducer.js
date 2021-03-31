const ACTIONS = {
    ADD_TO_WATCHLIST: "add_to_watchlist",
    REMOVE_FROM_WATCHLIST: "remove_from_watchlist",
  };

const watchlistReducer = (watchlistFilms, action) => {
    switch (action.type) {
      case ACTIONS.ADD_TO_WATCHLIST: //take note that this results in extra cognitive load as the adding and removing is not in reference to the same thing now!
        console.log(watchlistFilms);
        console.log(action.payload.filmId)
        const present = watchlistFilms.some( watchlistFilm => {
          return watchlistFilm.id === action.payload.filmId
        })
        // console.log(present);
        if (!present) {
          console.log("adding...")
          return [...watchlistFilms, action.payload.film];  
        }
        return watchlistFilms;
  
      case ACTIONS.REMOVE_FROM_WATCHLIST:
        const present1 = watchlistFilms.some( watchlistFilm => {
          return watchlistFilm.id === action.payload.filmId // testing criteria
        })
        // const filmIndex = watchlistFilms.indexOf(action.payload.film); // a method to check if the element is already in the array.
        // if exists, returns the index of the element in the array. if not, returns -1
        // console.log(present1);
        if (!present1) { 
          return watchlistFilms;
        } else {
          const filmIndex = watchlistFilms.findIndex( watchlistFilm => { // findIndex returns the index of the found element, otherwise returns -1 if the particular element is not found.
            return watchlistFilm.id === action.payload.filmId //testing criteria
          })
          const tempArray = [...watchlistFilms].slice(); //make a shallow copy of the previous state.
          tempArray.splice(filmIndex, 1); // remove 1 film from the index of the array, which was found using indexOf. 
          return tempArray; 
        }
      default:
      return watchlistFilms
    }
  };

  export default watchlistReducer;
  export {ACTIONS};