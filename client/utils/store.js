import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";

function reducer(
  state = {
    view: "displayResults",
    urlInputValue: "",
    results: {}
  },
  action
) {
  switch (action.type) {
    case "CHANGE_PAGE": {
      const { view } = action;
      return Object.assign({}, state, {
        view: view
      });
    }
    case "UPDATED_URL_INPUT_VALUE":
      return Object.assign({}, state, { urlInputValue: action.payload.text });
    case "RECEIVED_QUERY_RESULTS":
      return Object.assign({}, state, {
        urlInputValue: "",
        results: action.payload.results,
        view: "displayResults"
      });
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(logger));

export default store;
