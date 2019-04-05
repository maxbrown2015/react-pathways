import _ from 'lodash';
import axios from 'axios';


let initialState;

const mainReducer = (state, action) => {
  switch (action.type) {
  case 'CHANGE_COURSE': {
    let courses = state.courses.slice(0);
    courses[action.index] = action.newCourse;
    console.log(courses[action.index]);
    console.log(courses);
    return _.assign({}, state, {courses: courses});
  }

  case 'DELETE_COURSE': {
    let courses = [];
    state.courses.forEach((course, index) => {
      if (index != action.index) {
        courses.push(course);
      }
    });
    return _.assign({}, state, {courses: courses});
  }

  case 'ADD_COURSE': {
    let courses = state.courses.slice(0);
    courses.push(action.newCourse);
    console.log(courses);
    return _.assign({}, state, {courses: courses});   
  }

  case 'CHANGE_PATHWAY': {
    let pathways = state.pathways.slice(0);
    pathways[action.index] = action.pathway;
    return _.assign({}, state, {pathways: pathways});
  }

  case 'UNDO_CHANGES': {
    return _.assign({}, initialState);
  }

  case 'CACHE': {
    initialState = {
      courses: state.courses.slice(0),
      pathways: state.pathways.slice(0)
    };
    return state;
  }

  case 'EXPORT': {
    const data = {
      courses: state.courses.slice(0),
      pathways: state.pathways.slice(0)
    };
    axios.post('http://localhost:3000/importexport/export',data ).then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
    });
  }
  }
  return state;
};

export {mainReducer};
