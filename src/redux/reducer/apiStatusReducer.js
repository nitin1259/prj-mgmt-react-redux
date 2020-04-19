import initialStates from "../initialStates";
import * as types from "./../actions/actionTypes";

function actionTypeEndsInSuccess(actionType) {
  return actionType.substring(actionType.length - 8) === "_SUCCESS";
}

export default function (state = initialStates.apiStatus, action) {
  if (action.type === types.BEGIN_API_CALL) {
    return state + 1;
  } else if (
    actionTypeEndsInSuccess(action.type) ||
    action.type === types.API_CALL_ERROR
  ) {
    return state - 1;
  }
  return state;
}
