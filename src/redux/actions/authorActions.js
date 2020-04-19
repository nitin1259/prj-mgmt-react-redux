import * as actionTypes from "./actionTypes";
import * as autherApi from "./../../api/authorApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

function loadAuthorsSuccess(authors) {
  return { type: actionTypes.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return autherApi
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch((err) => {
        dispatch(apiCallError());
        throw err;
      });
  };
}
