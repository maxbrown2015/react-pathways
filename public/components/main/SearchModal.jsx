import React from 'react';
import '../../styles/SearchModal.css';
import Flexbox from 'flexbox-react';
import * as actions from '../../actions/index.js';

class SearchModal extends React.Component {
  constructor(props) {
    super(props);
    this.notifyParentOfSelect = this.notifyParentOfSelect.bind(this);
  }

  notifyParentOfSelect() {
    this.props.notifyParent(this.props.course.number);
  }

  render() {
   return( <Flexbox height='50px' margin='5px' width='750px' alignItems='center' justifyContent='center' className={'SearchModal'}
   onClick={this.notifyParentOfSelect}>
      {'HIST-' + this.props.course.number + ': ' + this.props.course.title}
    </Flexbox>);
  }
}



export default SearchModal;