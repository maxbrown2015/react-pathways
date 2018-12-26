
import React from 'react';
import '../styles/CatalogContainer.css';
import Flexbox from 'flexbox-react';

const header = 'Course Information';

class CatalogContainer extends React.Component {
  constructor(props) {
    super(props);
    this.renderPathwayLists = this.renderPathwayLists.bind(this);
    
  }

  componentWillMount() {
    this.props.store.subscribe(function () {
      this.setState(this.props.store.getState());
    }.bind(this));
  }

  renderPathwayLists() {
    console.log(this.props.store.getState().connected);
    
  }

  render() {
    this.renderPathwayLists();  
    const catalogMarkup = (
      <Flexbox height='150vh' width='100vw' flexDirection='column'>
      <Flexbox className="CatalogHeader">{header}</Flexbox>
      <Flexbox className="CourseTitle"></Flexbox>
      <Flexbox className="CourseDescription"></Flexbox>
      <Flexbox className="CourseLink"></Flexbox>
      <Flexbox className="CourseType"></Flexbox>
      <Flexbox className="ListContainer" flexDirection="row">
      </Flexbox>
      </Flexbox>
    )
    if (this.props.store.getState().selected) { return (catalogMarkup)}
    else { return  <Flexbox height='150vh' width='100vw' flexDirection='column'></Flexbox>}
  }
} 

export default CatalogContainer;
