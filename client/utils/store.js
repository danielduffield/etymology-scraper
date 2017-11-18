import { createStore, combineReducers } from 'redux'

function reducer(state = {
  urlInputValue: ''
}, action) {
  switch (action.type) {
    case 'UPDATED_URL_INPUT_VALUE':
      return Object.assign({}, state, { urlInputValue: action.payload.text })
    default:
      return state
  }
}

export default createStore(reducer)
