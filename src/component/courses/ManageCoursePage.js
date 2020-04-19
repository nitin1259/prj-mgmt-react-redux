import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadCourses } from "./../../redux/actions/courseActions";
import { loadAuthors } from "./../../redux/actions/authorActions";

class CoursesPage extends Component {
  componentDidMount() {
    if (this.props.courses.length === 0) {
      loadCourses().catch((error) => {
        console.log("Error getting courses " + error);
      });
    }
    if (this.props.authors.length === 0) {
      loadAuthors().catch((err) => {
        console.log("Error getting authors " + err);
      });
    }
  }

  render() {
    return <></>;
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
};

//when declaring mapStateToProps be specific. request only the data your component needs.
//ownProps parameter contains the props that is related to this component. its not required right now so we are remoeving.
//mapStateToProps(state, ownProps) takes two arguments.
const mapStateToProps = (state) => {
  return {
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
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
//mapDispatchToProps: will let us declare what actions to pass to our component on props,
// this is an optional parameter, so we are not using it right now.
//When we omit mapDispatchToProps, our compoent gets a dispatch property injected automatically, so we can use it to dispatch an actions.
