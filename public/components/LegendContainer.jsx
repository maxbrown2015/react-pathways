import React from 'react';
import Legend from './Legend';
import Flexbox from 'flexbox-react'

class LegendContainer extends React.Component {
  constructor(props) {
    super(props);
    this.renderPathwayLegends = this.renderPathwayLegends.bind(this);
  }

  componentWillMount() {
    this.props.store.subscribe(function () {
      this.setState(this.props.store.getState());
    }.bind(this));
  }

  renderPathwayLegends() {
    const pathways = this.props.store.getState().pathways;
    let markup = Object.keys(pathways).map((pathway, index) => {
      return (<Legend store={this.props.store} pathway={pathways[pathway]} key={index}/>)
    })
    return markup;
  }

  render() {
    console.log('legends-rendered');
    return <Flexbox flexDirection={'column'} height={'100%'} width={'20%'}>{this.renderPathwayLegends()}</Flexbox>
  }
}

export default LegendContainer;