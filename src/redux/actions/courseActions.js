import * as actionTypes from "./actionTypes";
//step 1 creating an action...
import * as courseApi from "./../../api/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function createCourse(course) {
  return { type: actionTypes.CREATE_COURSE, course };
}

//object short-hand syntax: we can ommit the right-hand side, since it matches left-hand side..
export function loadCoursesSuccess(courses) {
  return { type: actionTypes.LOAD_COURSES_SUCCESS, courses };
}

export function updateCourseSuccess(course) {
  return { type: actionTypes.UPDATE_COURSE_SUCCESS, course };
}

export function createCourseSuccess(course) {
  return { type: actionTypes.CREATE_COURSE_SUCCESS, course };
}

export function deleteCourseOptimistic(course) {
  return { type: actionTypes.DELETE_COURSE_OPTIMISTIC, course };
}

export function loadCourses() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        dispatch(apiCallError());
        throw error;
      });
  };
}

export function saveCourse(course) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
        dispatch(apiCallError());
        throw error;
      });
  };
}

export function deleteCourse(course) {
  return function (dispatch) {
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  };
}
