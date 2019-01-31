import React from 'react';
//import '../styles/SearchBarContainer.css';
import Flexbox from 'flexbox-react';
import * as actions from '../actions/index.js';
import ReactSearchBox from 'react-search-box';
import SearchField from "react-search-field";
 


class SearchBarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  componentWillMount() {
    this.props.store.subscribe(function () {
      this.setState(this.props.store.getState());
    }.bind(this));
  }

  onSearch() {
    this.props.store.dispatch(actions)
  }

  render() {
  
    return <Flexbox width='100vh' height='20vh' alignItems='center' justifyContent='center'>
      <Flexbox width='20vw' height='10vh'>
      </Flexbox>
    </Flexbox>
  }
}

export default SearchBarContainer;