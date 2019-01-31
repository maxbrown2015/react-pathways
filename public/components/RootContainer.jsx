
import React from 'react';
import NetworkContainer from './NetworkContainer'
import HeaderContainer from './HeaderContainer'
import Flexbox from 'flexbox-react';
import '../styles/RootContainer.css';
import CatalogContainer from './CatalogContainer';
import LegendContainer from './LegendContainer';
import SearchBarContainer from './SearchBarContainer';

class RootContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.store.subscribe(function () {
      this.setState(this.props.store.getState());
    }.bind(this));
  }

  render() {
    return (
    <Flexbox flexDirection={'column'}>
    <HeaderContainer store={this.props.store}/>
    <SearchBarContainer store={this.props.store}/>
    <Flexbox flexDirection='row' width='100vw' height='150vh'>
      <LegendContainer store={this.props.store}/>
      <NetworkContainer store={this.props.store}/>
    </Flexbox>  
    <CatalogContainer store={this.props.store} />
    </Flexbox>);
  }
} 

export default RootContainer