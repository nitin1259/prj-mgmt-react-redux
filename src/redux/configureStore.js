import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer/reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant"; //it will notify(warn) us if we accidentally mutate redux state..
import thunk from "redux-thunk"; // redux middleware is a way to enhance the redux behaviour

export default function configureStore(initialState) {
  const enhanceCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support to Redux Dev tool

  return createStore(
    rootReducer,
    initialState,
    enhanceCompose(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
}
