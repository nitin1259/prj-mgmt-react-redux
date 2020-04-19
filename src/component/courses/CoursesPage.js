import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as courseActions from "./../../redux/actions/courseActions";
import * as authorActions from "./../../redux/actions/authorActions";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";

class CoursesPage extends Component {
  state = {
    redirectToAddCoursePage: false,
  };
  componentDidMount() {
    if (this.props.courses.length === 0) {
      this.props.actions.loadCourses().catch((error) => {
        console.log("Error getting courses " + error);
      });
    }
    if (this.props.authors.length === 0) {
      this.props.actions.loadAuthors().catch((err) => {
        console.log("Error getting authors " + err);
      });
    }
  }

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-course"
          onClick={() => this.setState({ redirectToAddCoursePage: true })}
        >
          Add Course
        </button>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <CourseList courses={this.props.courses} />
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

//when declaring mapStateToProps be specific. request only the data your component needs.
//ownProps parameter contains the props that is related to this component. its not required right now so we are remoeving.
//mapStateToProps(state, ownProps) takes two arguments.
const mapStateToProps = (state) => {
  return {
    courses:
      state.authors.length !== 0
        ? state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          })
        : [],
    authors: state.authors,
    loading: state.apiStatus > 0,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // createCourse: (course) => dispatch(courseActions.createCourse(course)),
    // actions: bindActionCreators(courseActions, dispatch), // this will bind all the action in course actions what all available
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
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
//mapDispatchToProps: will let us declare what actions to pass to our component on props,
// this is an optional parameter, so we are not using it right now.
//When we omit mapDispatchToProps, our compoent gets a dispatch property injected automatically, so we can use it to dispatch an actions.
