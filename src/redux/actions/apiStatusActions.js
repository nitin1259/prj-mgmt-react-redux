import * as type from "./actionTypes";

export function beginApiCall() {
  return { type: type.BEGIN_API_CALL };
}

export function apiCallError() {
  return { type: type.API_CALL_ERROR };
}
