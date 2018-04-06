import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import listsReducer from './reducers/listsReducer'
import usersReducer from './reducers/usersReducer'
import searchReducer from './reducers/searchReducer'
import mediaReducer from './reducers/mediaReducer'
import thunk from 'redux-thunk'
import { BrowserRouter as Router, Route } from 'react-router-dom';

const rootReducer = combineReducers({users: usersReducer, lists: listsReducer, search: searchReducer, media: mediaReducer})

const store = createStore(rootReducer, compose(applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))


console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>

  ,document.getElementById("root")
);
