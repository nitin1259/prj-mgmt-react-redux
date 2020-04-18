import * as actionTypes from "./actionTypes";
export function createCourse(course) {
  return { type: actionTypes.CREATE_COURSE, course };
}
