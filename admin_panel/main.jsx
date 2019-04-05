// CIS 197 - React HW
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { mainReducer as reducers } from './reducers';
import * as actions from './actions/index';
import CourseCatalog from './components/CourseCatalog.jsx';
import axios from 'axios';

function loadFromMongoAndInitialize() {
  let courses = [];
  let pathways = [];

  axios.get('http://localhost:3000/importexport/import').then(response => {
    //console.log(response);
    response.data.courses.forEach(course => {
      const courseViewData = {
        number: course.number,
        title: course.title,
        description: course.description,
        link: course.link,
        selectedPathways: course.selectedPathways
      };
      courses.push(courseViewData);
    });

    response.data.pathways.forEach((pathway) => {
      const pathwayViewData = {
        name: pathway.name,
        id: pathway.id,
        color: pathway.color,
        highlight: pathway.highlight,
        description: pathway.description,
      };
      pathways.push(pathwayViewData);
    });

    // sort courses by number
    courses.sort(function (a, b) {
      const aNum = Number(a.number);
      const bNum = Number(b.number);
      return aNum - bNum;
    });


    // console.log(courses);
    const state = {
      courses: courses,
      pathways: pathways
    };
    const store = createStore(reducers, state);
    store.dispatch(actions.cacheState());
    ReactDOM.render(

      <CourseCatalog store={store}/>,
      document.getElementById('container')
    );
      
    document.addEventListener('DOMContentLoaded', () => {
      ReactDOM.render(
        <CourseCatalog store={store}/>,
        document.getElementById('container')
      );
    });

  }).catch(function (error) {
    console.log(error);
  });
}

loadFromMongoAndInitialize();

