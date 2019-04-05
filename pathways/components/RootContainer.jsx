
import React from 'react';
import Flexbox from 'flexbox-react';
import NetworkContainer from './NetworkContainer.jsx';
import HeaderContainer from './HeaderContainer.jsx';
import '../styles/RootContainer.css';
import CatalogContainer from './CatalogContainer.jsx';
import LegendContainer from './LegendContainer.jsx';
import SearchBarContainer from './SearchBarContainer.jsx';

class RootContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.store.subscribe(() => {
      this.setState(this.props.store.getState());
    });
  }

  render() {
    return (
      <Flexbox className="RootContainer" flexDirection="column">
        <HeaderContainer store={this.props.store} />
        <SearchBarContainer store={this.props.store} />
        <Flexbox flexDirection="row" width="100vw" height="150vh">
          <LegendContainer store={this.props.store} />
          <NetworkContainer store={this.props.store} />
        </Flexbox>
        <CatalogContainer store={this.props.store} />
      </Flexbox>
    );
  }
}

export default RootContainer;
