import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer/reducers";
import thunk from "redux-thunk"; // redux middleware is a way to enhance the redux behaviour

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}

//step-4: one store in redux
