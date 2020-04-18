//step-3
import { combineReducers } from "redux";
import courses from "./courseReducer";

const rootReducer = combineReducers({
  courses,
}); // it will combine all reducers...

export default rootReducer;

//in the courseReducer we call the function name is courseReducer, but we imported it as courses in this file because it is a default export.
