import * as actionTypes from "./../actions/actionTypes";

//step 2: creating the reducer function for the first action....
export default function courseReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.CREATE_COURSE:
      return [...state, { ...action.course }];
    case actionTypes.LOAD_COURSES_SUCCESS:
      return action.courses;
    default:
      return state;
  }
}

//all reducers will take the state and action as an arguments.....
//normalizing the states shape in redux docs..
