import { createStore, combineReducers } from "redux";

function reducer(
  state = {
    view: "submitUrl",
    urlInputValue: "",
    results: {},
    selected: {},
    keywords: [],
    textBlock: "",
    parsedText: ""
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
        view: "displayResults",
        keywords: action.payload.results.etymologies.map(
          wordData => wordData.word.normal
        ),
        textBlock: action.payload.results.contents
      });
    default:
      return state;
  }
}

export default createStore(reducer);
