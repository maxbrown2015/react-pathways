
import React from 'react';
import '../../styles/CatalogContainer.css';
import Flexbox from 'flexbox-react';
import * as actions from '../../actions/index.js';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

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
  
  componentWillUnmount() {
    console.log('catalog unmounted');
  }

  componentDidMount() {
    console.log('catalog mounted');
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
            }}>{'HIST-' + course.number + ': ' + course.title}</Flexbox>
        });

       // console.log(markup);
        return (
          <Flexbox className='PathwayList' flexDirection="row" justifyContent='center' alignSelf='center'>
          <Flexbox flexDirection={'column'} width={'100%'}>
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
          }}>{'HIST-' + course.number + ': ' + course.title}</Flexbox>
        });

        let secondMarkup = secondPathway.map((node, index) => {
          const course = courses[node];
          if (node === selected) return;  
          return <Flexbox className='PathwayItem' margin='2px' key={index} onClick={() => {
            this.props.store.dispatch(actions.catalogSelect(node));
          }}>{'HIST-' + course.number + ': ' + course.title}</Flexbox>
        });

        return (
        <Flexbox className='PathwayList' flexDirection="row" justifyContent='center' alignSelf='center'>
          <Flexbox flexDirection='column' marginLeft='100px' marginRight='100px'  >
            <Flexbox margin='10px' alignSelf='center' style={{
              color: pathways[pathwayKeys[0]].color
            }}>{pathways[pathwayKeys[0]].name}</Flexbox>
            {firstMarkup}
          </Flexbox>
          <Flexbox flexDirection='column' marginLeft='100px' marginRight='100px' >
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
    const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non rhoncus nunc. Mauris convallis felis sit amet ultricies rhoncus. Mauris semper lectus eget lectus hendrerit ultrices. Suspendisse in laoreet augue, sed viverra diam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. ' + 
    ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non rhoncus nunc. Mauris convallis felis sit amet ultricies rhoncus. Mauris semper lectus eget lectus hendrerit ultrices. Suspendisse in laoreet augue, sed viverra diam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non rhoncus nunc. Mauris convallis felis sit amet ultricies rhoncus. Mauris semper lectus eget lectus hendrerit ultrices. Suspendisse in laoreet augue, sed viverra diam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. ';
    const selected = this.props.store.getState().selected;
    const selectedCourse = this.props.store.getState().courses[selected];
    if (selectedCourse) { 
      const catalogMarkup = (
        <Flexbox flexDirection='column' height='200vh' width='100vw' key={'catalog'}>
          <Flexbox className="CatalogHeader" marginBottom='50px'>{header}</Flexbox>
          <Flexbox flexDirection='column' alignItems='center' justifyContent='center'>
            <Flexbox className="CourseTitle" marginBottom='50px '>
              {'HIST ' + selectedCourse.number + ': ' + selectedCourse.title}
            </Flexbox>
            <Flexbox width='75%' justifyContent='center' className="CourseDescription">
              {description}
            </Flexbox>
          <Flexbox flexDirection='row' width='75%' alignItems='center' justifyContent='center' >
            <Flexbox marginTop='50px' marginBottom='50px' width='33%' alignSelf='center' justifyContent='center'  onClick={() => {'link pressed'}}>
              <Flexbox>
              <a className="CourseLink" target={'_tab'} href={selectedCourse.link} style={{
                textDecoration: 'none'
              }}>{'Link to Course Page'}</a>
              </Flexbox>
            </Flexbox>
            <Flexbox className="CourseType"  marginTop='50px' alignSelf='center' justifyContent='center'  width='33%' marginBottom='50px' >
              <Flexbox>{'Course Type: Seminar'}</Flexbox>
            </Flexbox>
            <Flexbox className="CourseInstructor" width={'33%'} alignSelf='center' justifyContent='center' marginTop='50px' marginBottom='50px'>
              <Flexbox> 
              {'Instructor: Dr. Yvonne Fabella'}
              </Flexbox>
            </Flexbox>
          </Flexbox>
            {this.renderPathwayLists()}
          </Flexbox>
        </Flexbox>
      )
      return   <ReactCSSTransitionReplace transitionName="fade-wait"
      transitionEnterTimeout={10000} transitionLeaveTimeout={10000}>
          {catalogMarkup}
          
      </ReactCSSTransitionReplace>
  
      
    }
    else { return  <Flexbox height='200vh' width='100vw' flexDirection='column'></Flexbox>}
  }
} 

export default CatalogContainer;
