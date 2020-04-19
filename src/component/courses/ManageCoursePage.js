import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadCourses, saveCourse } from "./../../redux/actions/courseActions";
import { loadAuthors } from "./../../redux/actions/authorActions";
import { newCourse } from "./../../../tools/mockData";
import CourseForm from "./CourseForm";
import Spinner from "../common/Spinner";

function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  //   const { courses, authors, loadCourses, loadAuthors } = props;
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        console.log("Error getting courses " + error);
      });
    } else {
      setCourse({ ...props.course });
    }
    if (authors.length === 0) {
      loadAuthors().catch((err) => {
        console.log("Error getting authors " + err);
      });
    }
  }, [props.course]);

  function handleSave() {
    event.preventDefault();
    setSaving(true);
    saveCourse(course)
      .then(() => {
        console.log("Course saved");
        history.push("/courses");
      })
      .catch((err) => {
        console.log("error while saving form" + err);
      });
  }

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      onSave={handleSave}
      authors={authors}
      onChange={handleChange}
      saving={saving}
    />
  );
}

ManageCoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

//when declaring mapStateToProps be specific. request only the data your component needs.
//ownProps parameter contains the props that is related to this component. its not required right now so we are remoeving.
//mapStateToProps(state, ownProps) takes two arguments.

export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course,
    courses: state.courses,
    authors: state.authors,
  };
};

/*const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    },
  };
};*/

// Alternative of above mapDispatchToProps
// we can create mapDispatchToProps as an object it will automaticall bind the dispatch with these actions
const mapDispatchToProps = {
  loadCourses: loadCourses, // when declared as object each property is automatically bound to dispatch
  loadAuthors: loadAuthors,
  saveCourse: saveCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
//mapDispatchToProps: will let us declare what actions to pass to our component on props,
// this is an optional parameter, so we are not using it right now.
//When we omit mapDispatchToProps, our compoent gets a dispatch property injected automatically, so we can use it to dispatch an actions.
