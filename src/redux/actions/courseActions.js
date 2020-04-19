import * as actionTypes from "./actionTypes";
//step 1 creating an action...
import * as courseApi from "./../../api/courseApi";

export function createCourse(course) {
  return { type: actionTypes.CREATE_COURSE, course };
}

//object short-hand syntax: we can ommit the right-hand side, since it matches left-hand side..
function loadCoursesSuccess(courses) {
  return { type: actionTypes.LOAD_COURSES_SUCCESS, courses };
}

function updateCourseSuccess(course) {
  return { type: actionTypes.UPDATE_COURSE_SUCCESS, course };
}

function createCourseSuccess(course) {
  return { type: actionTypes.CREATE_COURSE_SUCCESS, course };
}

export function loadCourses() {
  return function (dispatch) {
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveCourse(course) {
  return function (dispatch) {
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
        throw error;
      });
  };
}
