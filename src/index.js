import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import listsReducer from './reducers/listsReducer'
import usersReducer from './reducers/usersReducer'
import searchReducer from './reducers/searchReducer'
import itemsReducer from './reducers/itemsReducer'
import commentsReducer from './reducers/commentsReducer'
import friendsReducer from './reducers/friendsReducer'
import activityReducer from './reducers/activityReducer'
import thunk from 'redux-thunk'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ActionCableProvider } from 'react-actioncable-provider'

const API_WS_ROOT = `ws://localhost:3000/cable`

const rootReducer = combineReducers({users: usersReducer, lists: listsReducer, search: searchReducer, items: itemsReducer, comments: commentsReducer, friends: friendsReducer, activity: activityReducer})

const store = createStore(rootReducer, compose(applyMiddleware(thunk),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ActionCableProvider url={API_WS_ROOT}>
        <Route path="/" component={App} />
      </ActionCableProvider>
    </Router>
  </Provider>
  ,document.getElementById("root")
);
