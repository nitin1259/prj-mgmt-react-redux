import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer/reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

export default function configureStore(initialState) {
  const enhanceCompose = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose; // add support to Redux Dev tool

  return createStore(
    rootReducer,
    initialState,
    enhanceCompose(applyMiddleware(reduxImmutableStateInvariant()))
  );
}
