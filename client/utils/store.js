import { createStore, combineReducers } from "redux";

function reducer(
  state = {
    view: "submitUrl",
    urlInputValue: "",
    results: {},
    selected: {
      word: "",
      matchIndex: null,
      etym: [],
      date: ""
    },
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
    case "SELECTED_KEYWORD":
      return Object.assign({}, state, {
        selected: {
          word: action.payload.keyword.word
        }
      });
    case "DESELECTED_KEYWORD":
      return Object.assign({}, state, {
        selected: {
          word: "",
          matchIndex: null,
          etym: [],
          date: ""
        }
      });
    default:
      return state;
  }
}

export default createStore(reducer);
