import { createStore, combineReducers } from "redux";

function reducer(
  state = {
    urlInputValue: "",
    results: ""
  },
  action
) {
  switch (action.type) {
    case "UPDATED_URL_INPUT_VALUE":
      return Object.assign({}, state, { urlInputValue: action.payload.text });
    case "RECEIVED_QUERY_RESULTS":
      return Object.assign({}, state, {
        urlInputValue: "",
        results: action.payload.response
      });
    default:
      return state;
  }
}

export default createStore(reducer);
