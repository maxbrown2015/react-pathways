
import React from 'react';
import '../styles/CatalogContainer.css';
import Flexbox from 'flexbox-react';

const header = 'Course Information';

class CatalogContainer extends React.Component {
  constructor(props) {
    super(props);
    this.renderPathwayLists = this.renderPathwayLists.bind(this);
    this.sortConnectedNodes = this.sortConnectedNodes.bind(this);
    this.renderPathwayLists = this.renderPathwayLists.bind(this);
  }

  componentWillMount() {
    this.props.store.subscribe(function () {
      this.setState(this.props.store.getState());
    }.bind(this));
  }


  sortConnectedNodes() {
    const selected = this.props.store.getState().selected;
    const courses = this.props.store.getState().courses;

    console.log(courses[selected].selectedPathways[0]);
    let coursePathways =  {}; 
    const pathwayOne = courses[selected].selectedPathways[0];
    const pathwayTwo = courses[selected].selectedPathways[1];
    coursePathways[pathwayOne] = [];
    if (pathwayTwo) {
      coursePathways[pathwayTwo] = [];
    }
    
    const connectedNodes = this.props.store.getState().connected.values();
    let node = connectedNodes.next();
    while (!node.done) {
      const nodePathways = courses[node.value].selectedPathways;
      if (nodePathways[0] === pathwayOne || nodePathways[0] === pathwayTwo) {
        coursePathways[nodePathways[0]].push(node.value);
      }
      if (nodePathways[1] === pathwayOne || nodePathways[1] === pathwayTwo && nodePathways[1]) 
        {coursePathways[nodePathways[1]].push(node.value);}
      node = connectedNodes.next();
    }
    return coursePathways;


  }
  renderPathwayLists() {
    if (this.props.store.getState().selected) {
      const coursePathways = this.sortConnectedNodes();
      const courses = this.props.store.getState().courses;
      const pathways = this.props.store.getState().pathways;  
      console.log(pathways);

      const pathwayKeys = Object.keys(coursePathways);
      const numberOfPathways = pathwayKeys.length;
      const firstPathway = coursePathways[pathwayKeys[0]];
      const secondPathway = coursePathways[pathwayKeys[1]];

      if (numberOfPathways === 1) {
        let markup = firstPathway.map((node, index) => {
            const course = courses[node];
            return <Flexbox key={index} onClick={function(){console.log('clicked')}}>{course.title}</Flexbox>
        });

        console.log(markup);
        return (
          <Flexbox className='PathwayList' flexDirection={'column'} width={'100%'} alignItems={'center'}>
          <Flexbox >{pathways[pathwayKeys[0]].name}</Flexbox>
          {markup}
          </Flexbox>
        )
      }
      
      if (numberOfPathways === 2) {
        let firstMarkup = firstPathway.map((node, index) => {
          const course = courses[node];
          return <Flexbox key={index} onClick={function(){console.log('clicked')}}>{course.title}</Flexbox>
        });

        let secondMarkup = secondPathway.map((node, index) => {
          const course = courses[node];
          return <Flexbox key={index} onClick={function(){console.log('clicked')}}>{course.title}</Flexbox>
        });

        return (
        <Flexbox className='PathwayList'flexDirection="row" justifyContent='center' alignSelf='center'>
          <Flexbox flexDirection='column' alignItems='center'>
          <Flexbox>{pathways[pathwayKeys[0]].name}</Flexbox>
          {firstMarkup}
          </Flexbox>
          <Flexbox flexDirection='column' alignItems='center'>
          <Flexbox>{pathways[pathwayKeys[1]].name}</Flexbox>
          {secondMarkup}
          </Flexbox>
        </Flexbox>
        );
      }

    }
  }
  

  render() {
    const catalogMarkup = (
      <Flexbox height='150vh' width='100vw' flexDirection='column'>
      <Flexbox className="CatalogHeader">{header}</Flexbox>
      <Flexbox className="CourseTitle"></Flexbox>
      <Flexbox className="CourseDescription"></Flexbox>
      <Flexbox className="CourseLink"></Flexbox>
      <Flexbox className="CourseType"></Flexbox>
        {this.renderPathwayLists()}
      </Flexbox>
    )
    if (this.props.store.getState().selected) { return (catalogMarkup)}
    else { return  <Flexbox height='150vh' width='100vw' flexDirection='column'></Flexbox>}
  }
} 

export default CatalogContainer;
