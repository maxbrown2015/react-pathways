import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { mainReducer as reducers } from './reducers';
import * as actions from './actions/index';
import axios from 'axios';
import Root from './components/Root.jsx';
import {createEdgeSet, parseCoursesIntoNodeSet } from './utils/StoreCreationHelpers.js';


const loadCourses = function loadCourses(response) {
  let courses = {}
  response.data.courses.forEach(course => {
    const courseViewData = {
      number: course.number,
      title: course.title,
      description: course.description,
      link: course.link,
      selectedPathways: course.selectedPathways
    };
    courses[Number(course.number)] = (courseViewData);
  });
  return courses;
}

const loadPathways = function loadPathways(response) {
  let pathways = {}
  response.data.pathways.forEach((pathway) => {
    const pathwayViewData = {
      name: pathway.name,
      id: pathway.id,
      color: pathway.color,
      highlight: pathway.highlight,
      description: pathway.description,
    };
    pathways[pathway.id] = pathwayViewData;
  });
  return pathways;
}

const sortCoursesByCourseNumber = function sortCoursesByCourseNumber(courses) {
  Object.keys(courses).sort(function (a, b) {
    const aNum = Number(a.number);
    const bNum = Number(b.number);
    return aNum - bNum;
  });
}

const loadFromMongoAndInitializeStore = function loadFromMongoAndInitialize() {
  let courses = {};
  let pathways = {};

  axios.get('http://localhost:3000/importexport/import').then(response => {
    //console.log(response);
    courses = loadCourses(response);
    pathways = loadPathways(response);
    sortCoursesByCourseNumber(courses);

    const nodes = parseCoursesIntoNodeSet(courses);
    const edges = createEdgeSet(nodes, pathways);

    // create state object 
    const state = {
      courses: courses,
      pathways: pathways,
      graph: {
        nodes: nodes,
        edges: edges
      },
      activePathways: [],
      selected: {},
      selectionUpdateOptions: {
        networkSelection: false,
        edgeSelection: false,
        catalogSelection: false
      }
    };
    
    const store = createStore(reducers, state);
    ReactDOM.render(
      <Root store={store}/>,
      document.getElementById('container')
    );

    document.addEventListener('DOMContentLoaded', () => {
      ReactDOM.render(
        <Root store={store}/>,
        document.getElementById('container')
      );
    });


  }).catch(function (error) {
    console.log(error);
  });
}

loadFromMongoAndInitializeStore();


