import { createContext, useContext, useReducer, useEffect } from "react";
import fetchApi from "../api/fetchCallHistory";

const FetchContext = createContext();
const FetchDispatchContext = createContext();

const FetchProvider = ({ children }) => {
  const [state, dispatch] = useReducer((staters, action) => {
    switch (action.type) {
      case "init":
        return [...action.result];
      case "fetch":
        return [...action.result];
      default:
        return staters;
    }
  }, []);

  // useEffect(() => {
  //   fetchApi.getTodayAll().then((fetchCallHistoryResult) => {
  //     dispatch({ type: "init", result: fetchCallHistoryResult });
  //   });
  // }, []);

  return (
    <FetchContext.Provider value={state}>
      <FetchDispatchContext.Provider value={dispatch}>
        {children}
      </FetchDispatchContext.Provider>
    </FetchContext.Provider>
  );
};

const useFetchs = () => useContext(FetchContext);
const useDispatchFetchs = () => useContext(FetchDispatchContext);

export { useFetchs, useDispatchFetchs, FetchProvider };
