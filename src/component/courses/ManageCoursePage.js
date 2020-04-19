import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadCourses, saveCourse } from "./../../redux/actions/courseActions";
import { loadAuthors } from "./../../redux/actions/authorActions";
import { newCourse } from "./../../../tools/mockData";
import CourseForm from "./CourseForm";

function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  //   const { courses, authors, loadCourses, loadAuthors } = props;
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        console.log("Error getting courses " + error);
      });
    }
    if (authors.length === 0) {
      loadAuthors().catch((err) => {
        console.log("Error getting authors " + err);
      });
    }
  }, []);

  function handleSave() {
    event.preventDefault();
    saveCourse(course)
      .then(() => {
        console.log("Course saved");
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

  return (
    <CourseForm
      course={course}
      errors={errors}
      onSave={handleSave}
      authors={authors}
      onChange={handleChange}
      saving={false}
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
};

//when declaring mapStateToProps be specific. request only the data your component needs.
//ownProps parameter contains the props that is related to this component. its not required right now so we are remoeving.
//mapStateToProps(state, ownProps) takes two arguments.
const mapStateToProps = (state) => {
  return {
    course: newCourse,
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
