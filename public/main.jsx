// CIS 197 - React HW
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { mainReducer as reducers } from './reducers';
import * as actions from './actions/index';
import RootContainer from './components/RootContainer';
import axios from 'axios';


function edgesAreSame(first, second) {
    return (first.to === second.to && first.from === second.from) || 
    (first.to === second.from && first.from === second.from)
}


function parseCoursesIntoNodeSet(courses) {
  let nodes = [];
  courses.forEach((course, index) => {
    const node = {
      id: Number(course.number),
      label: course.number,
      title: course.title,
      description: course.description,
      selectedPathways: course.selectedPathways
    }
    nodes.push(node);
  });
  return nodes;
}

function createEdgeSet(nodes, pathways) {
  let edges = [];
  console.log(nodes);
  let pathwayLists = {
    human_rights: [],
    gender_sexuality: [],
    intellectual_cultural: [],
    politics_revolution: [],
    slavery_race: [],
    economic_history: [],
    war_peace: [],
    religious_communities: []
  }

  nodes.forEach((node) => {
    node.selectedPathways.forEach((pathway) => {
      pathwayLists[pathway].push(node.id);
    })
  });

  let edgeID = 0;
  for (const pathway of Object.keys(pathwayLists)) {
    console.log(pathwayLists[pathway]);
    const currentList = pathwayLists[pathway];

    let prev = currentList[0];
    currentList.forEach((node, index) => {
      if (index === currentList.length || index === 0) {
        return;
      }
      let curr = node;
      const edge = {
        id: edgeID,
        from: prev, 
        to: curr
      }

      edges.push(edge);
      edgeID++;
      prev = curr;
    })
  }

  edges.sort((a, b) => {
    if ((a.to === b.to && a.from === b.from) || (a.to === b.from && a.from === b.to)) {
      return 0;
    } else {
      return a.to - b.to;
    }
  });


  let i = 0;
  while (i < edges.length - 2)
   {
    let currEdge = edges[i];
    let nextEdge = edges[i+1];

    // check to see if next two edges are the same
    if (edgesAreSame(currEdge, nextEdge)) {
      currEdge['smooth'] = {type: 'curvedCCW', roundness: -0.2};
      nextEdge['smooth'] = {type: 'curvedCCW', roundness: 0.2};
      currEdge['color'] = "#FFFFFF";
      i += 2; 
    }
    else {
      i++;
    }
  }



  // console.log(edges);
  return edges;
}



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

    const nodes = parseCoursesIntoNodeSet(courses);
    const edges = createEdgeSet(nodes);

    const state = {
      courses: courses,
      pathways: pathways,
      graph: {
        nodes: nodes,
        edges: edges
      }
    };
    
    const store = createStore(reducers, state);
    ReactDOM.render(
      <RootContainer store={store}/>,
      document.getElementById('container')
    );

    document.addEventListener('DOMContentLoaded', () => {
      ReactDOM.render(
        < RootContainer store={store}/>,
        document.getElementById('container')
      );
    });


  }).catch(function (error) {
    console.log(error);
  });
}



 loadFromMongoAndInitialize();


