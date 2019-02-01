import React from 'react';
import '../styles/SearchBarContainer.css';
import Flexbox from 'flexbox-react';
import * as actions from '../actions/index.js';
import SearchBar from '@opuscapita/react-searchbar';
import SearchModal from './SearchModal';
import ReactScrollableList from 'react-scrollable-list';
 
class SearchBarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.renderModals = this.renderModals.bind(this);
    this.handleModalSelect = this.handleModalSelect.bind(this);
  }

  componentWillMount() {
    this.props.store.subscribe(function () {
      this.setState(this.props.store.getState());
    }.bind(this));
  }

  handleSearch() {
    this.setState(() => ({
      value : event.target.value
    }));
  }

  handleModalSelect(number) {
    this.props.store.dispatch(actions.searchSelect(Number(number)));
    this.setState(() => ({
      value: ''
    }));
  }

  renderModals() {
    const courses = this.props.store.getState().courses;
    const filteredCoursesBySearchValue = Object.keys(courses).filter((key) => {
      const course = courses[key];
      return (course.number.includes(this.state.value) || course.title.toLowerCase().includes(this.state.value.toLowerCase())) && !(this.state.value === '');
    });

    const markup = filteredCoursesBySearchValue.map((course, index) => {
      return ( {id: index,
        content: <SearchModal key={index} id={index} store={this.props.store} key={index} course={courses[course]} 
        notifyParent={this.handleModalSelect}/>
      });
    });
    return markup;
  }

  render() {
    return <Flexbox flexDirection='column' width='100vw' height='40vh' alignItems='center' marginTop='10vh' justifyContent='center'>
      <Flexbox width='75%' marginBottom='50px'>
        <SearchBar inputClassName='SearchBar' dynamicSearchStartsFrom={1} onSearch={this.handleSearch} marginBottom='50px'
          value={this.state.value}/>
      </Flexbox>
      <Flexbox height={'400px'} width={'100%'} justifyContent='center' style={{overflow: 'auto'}}>
      <ReactScrollableList
        listItems={this.renderModals()}
          maxItemsToRender={10}
          heightOfItem={30}
      />
      </Flexbox>
    </Flexbox>
  }
}

export default SearchBarContainer;