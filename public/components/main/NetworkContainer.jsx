import React from 'react';
import '../../styles/NetworkContainer.css';
import Network from './Network.jsx';
import LegendContainer from './LegendContainer.jsx'
import Flexbox from 'flexbox-react'


class NetworkContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.store.subscribe(function () {
      this.setState(this.props.store.getState());
    }.bind(this));
  }

  render() {
  //  console.log(this.props.store.getState().graph);
    return <Flexbox flexDirection={'row'} width={'85%'} height={'100%'} className={'NetworkContainer'}>
     <Network store={this.props.store}/>
    </Flexbox>
  }
}

export default NetworkContainer;