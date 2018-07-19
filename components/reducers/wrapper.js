import { combineReducers, createStore, applyMiddleware  } from "redux";
import lists from "./lists";
import { AsyncStorage } from "react-native";
import thunk from "redux-thunk";

const store = createStore(combineReducers({lists}), applyMiddleware(thunk));

store.subscribe(() =>
  AsyncStorage.setItem("key", JSON.stringify(store.getState()))
);

export default store;