
import React from 'react';
import '../styles/CatalogContainer.css';
import Flexbox from 'flexbox-react';
import * as actions from '../actions/index.js';
import { Transition } from 'react-transition-group';

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
    if (this.props.store.getState().connected) {
      const coursePathways = this.sortConnectedNodes();
      const courses = this.props.store.getState().courses;
      const pathways = this.props.store.getState().pathways;  

      const selected = this.props.store.getState().selected;
     // console.log(pathways);

      const pathwayKeys = Object.keys(coursePathways);
      const numberOfPathways = pathwayKeys.length;
      const firstPathway = coursePathways[pathwayKeys[0]];
      const secondPathway = coursePathways[pathwayKeys[1]];

      if (numberOfPathways === 1) {
        let markup = firstPathway.map((node, index) => {
            const course = courses[node];
            if (node === selected) return;
            return <Flexbox className='PathwayItem' margin='2px' key={index} onClick={() => {
              this.props.store.dispatch(actions.catalogSelect(node));
            }}>{course.title}</Flexbox>
        });

       // console.log(markup);
        return (
          <Flexbox className='PathwayList' flexDirection="row" justifyContent='center' alignSelf='center'>
          <Flexbox flexDirection={'column'} width={'100%'} alignItems={'left'}>
          <Flexbox margin='10px'  alignSelf='center' style={{
            color: pathways[pathwayKeys[0]].color
          }}>{pathways[pathwayKeys[0]].name}</Flexbox>
          {markup}
          </Flexbox>
          </Flexbox>
        )
      }
      
      if (numberOfPathways === 2) {
        let firstMarkup = firstPathway.map((node, index) => {
          const course = courses[node];
          if (node === selected) return;
          return <Flexbox className='PathwayItem' margin='2px' key={index} onClick={() => {
            this.props.store.dispatch(actions.catalogSelect(node));
          }}>{course.title}</Flexbox>
        });

        let secondMarkup = secondPathway.map((node, index) => {
          const course = courses[node];
          if (node === selected) return;  
          return <Flexbox className='PathwayItem' margin='2px' key={index} onClick={() => {
            this.props.store.dispatch(actions.catalogSelect(node));
          }}>{course.title}</Flexbox>
        });

        return (
        <Flexbox className='PathwayList' flexDirection="row" justifyContent='center' alignSelf='center'>
          <Flexbox flexDirection='column' marginLeft='100px' marginRight='100px' alignItems='left' >
            <Flexbox margin='10px' alignSelf='center' style={{
              color: pathways[pathwayKeys[0]].color
            }}>{pathways[pathwayKeys[0]].name}</Flexbox>
            {firstMarkup}
          </Flexbox>
          <Flexbox flexDirection='column' marginLeft='100px' marginRight='100px' alignItems='left'>
            <Flexbox margin='10px'  alignSelf='center'  style={{
              color: pathways[pathwayKeys[1]].color
            }}>{pathways[pathwayKeys[1]].name}</Flexbox>
            {secondMarkup}
          </Flexbox>
        </Flexbox>
        );
      }

    }
  }
  

  render() {
    const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non rhoncus nunc. Mauris convallis felis sit amet ultricies rhoncus. Mauris semper lectus eget lectus hendrerit ultrices. Suspendisse in laoreet augue, sed viverra diam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
    const selected = this.props.store.getState().selected;
    const selectedCourse = this.props.store.getState().courses[selected];
    console.log(selectedCourse);
    if (selectedCourse) { 
      const catalogMarkup = (
        <Flexbox flexDirection='column'>
          <Flexbox className="CatalogHeader" marginBottom='50px'>{header}</Flexbox>
          <Flexbox height='150vh' width='100vw' flexDirection='column' alignItems='center'>
          <Flexbox className="CourseTitle" marginBottom='50px '>
            {'HIST ' + selectedCourse.number + ': ' + selectedCourse.title}
          </Flexbox>
          <Flexbox width='75%' justifyContent='center' className="CourseDescription">
            {description}
          </Flexbox>
          <Flexbox flexDirection='row' >
            <Flexbox marginTop='50px' marginRight='300px' marginBottom='50px' onClick={() => {'link pressed'}}>
              <a className="CourseLink" target={'_tab'} href={selectedCourse.link} style={{
                textDecoration: 'none'
              }}>{'Link to Course Page'}</a>
            </Flexbox>
            <Flexbox className="CourseType"  marginTop='50px' marginLeft='300px' marginBottom='50px'>
              {'Course Type: Seminar'}
            </Flexbox>
          </Flexbox>
            {this.renderPathwayLists()}
          </Flexbox>
        </Flexbox>
      )
      return (catalogMarkup)
    }
    else { return  <Flexbox height='150vh' width='100vw' flexDirection='column'></Flexbox>}
  }
} 

export default CatalogContainer;
