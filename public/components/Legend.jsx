import React from 'react';
import '../styles/Legend.css';
import Flexbox from 'flexbox-react';
import posed from 'react-pose';
import * as actions from '../actions/index.js';


class Legend extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const isActive = this.props.store.getState().activePathways.includes(this.props.pathway.id);

    const Circle = posed.div({
      inActive: {
        scale: 1,
        borderRadius: '50%',  
        transition: {
          duration: 1000,
          type: 'spring', 
          ease: 'linear'
        }
      },
      active: {
        scale: 1.5,
        borderRadius: '50%',
      },
      transition: {
        duration: 1000,
        type: 'spring', 
        ease: 'linear'
      }
    });

    return (
    <Flexbox  alignItems='center' flexDirection='row' height={'100px'} width={'200px'}>
      <Flexbox marginLeft={'10px'}>

        <Circle className='LegendIcon' pose={isActive ? 'active' :'inActive'} style={{
          backgroundColor: this.props.pathway.color
        }} onClick={() => {
          this.props.store.dispatch(actions.legendSelect(this.props.pathway.id));
        }}/>

      </Flexbox>

        <Flexbox marginLeft={'10px'}className={'LegendName'} style={{
          color: this.props.pathway.color
        }} onClick={() => {
          this.props.store.dispatch(actions.legendSelect(this.props.pathway.id));
        }}>{this.props.pathway.name}
        </Flexbox>

    </Flexbox >
    )
  }
}


export default Legend