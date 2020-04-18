import * as actionTypes from "./actionTypes";
import * as autherApi from "./../../api/authorApi";

function loadAuthorsSuccess(authors) {
  return { type: actionTypes.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  return function (dispatch) {
    return autherApi
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch((err) => {
        throw err;
      });
  };
}
