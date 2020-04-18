import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as courseActions from "./../../redux/actions/courseActions";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";

class CoursesPage extends Component {
  componentDidMount() {
    this.props.actions.loadCourses().catch((error) => {
      console.log("Error getting courses " + error);
    });
  }

  render() {
    return (
      <>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    courses: state.courses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // createCourse: (course) => dispatch(courseActions.createCourse(course)),
    // actions: bindActionCreators(courseActions, dispatch), // this will bind all the action in course actions what all available
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
    },
  };
};

/*
// we can create mapDispatchToProps as an object
const mapDispatchToProps = {
  createCourse: courseActions.createCourse, // when declared as object each property is automatically bound to dispatch
};
*/

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
