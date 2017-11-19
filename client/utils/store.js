import { createStore, combineReducers } from "redux";

function reducer(
  state = {
    view: "submitUrl",
    urlInputValue: "",
    results: {}
  },
  action
) {
  switch (action.type) {
    case "UPDATED_URL_INPUT_VALUE":
      return Object.assign({}, state, { urlInputValue: action.payload.text });
    case "RECEIVED_QUERY_RESULTS":
      console.log("RESULTS ", action.payload.results);
      return Object.assign({}, state, {
        urlInputValue: "",
        results: action.payload.results,
        view: "displayResults"
      });
    default:
      return state;
  }
}

export default createStore(reducer);
