import { createContext, useContext, useReducer } from "react";
import watchlistReducer from "../reducers/watchlistReducer"

export const WatchlistContext = createContext();

//alt way of creating a custom hook to useContext
// export const useWatchlist = () => {
//   return useContext(WatchlistContext);
// }

const WatchlistProvider = ({ children }) => {
  const initialState = [];
  const [watchlistState, dispatch] = useReducer(watchlistReducer, initialState); // we want to be able to dispatch actions from the components, so we will have to pass them on using useContext.

  return (
    <WatchlistContext.Provider
      value={{
        watchlistState,
        dispatch,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export default WatchlistProvider;
