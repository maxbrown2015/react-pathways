/* eslint-disable no-alert */
import React from 'react';
import Flexbox from 'flexbox-react';


class PathwayPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pathwaysActiveOrNot: [], numberOfChecked: 0 };

    const allPathways = props.store.getState().pathways;

    allPathways.forEach((pathway) => {
      const active = props.selected.includes(pathway.id);

      if (active) this.state.numberOfChecked = this.state.numberOfChecked + 1;

      this.state.pathwaysActiveOrNot.push({
        id: pathway.id,
        active,
      });
    });

    this.notifyParent = this.notifyParent.bind(this);
    this.lookupPathwayName = this.lookupPathwayName.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  notifyParent() {
    const selectedPathways = [];
    this.state.pathwaysActiveOrNot.forEach((item) => {
      if (item.active) selectedPathways.push(item.id);
    });
    this.props.notifyParentOfChange(selectedPathways);
  }

  handleSelect() {
    if (this.state.numberOfChecked === 3 && event.target.checked) {
      alert('You cannot select more than 3 pathways');
      return;
    }

    const pathway = this.state.pathwaysActiveOrNot.filter(item => item.id === event.target.name);

    console.log(pathway);

    this.setState((prevState) => {
      let number = prevState.numberOfChecked;
      if (pathway[0].active) number--;
      else number++;

      const newState = prevState.pathwaysActiveOrNot.splice(0);
      newState.forEach((item) => {
        if (item.id === event.target.name) {
          item.active = !item.active;
        }
      });

      return { pathwaysActiveOrNot: newState, numberOfChecked: number };
    }, () => this.notifyParent());
  }

  lookupPathwayName(id) {
    let res;
    const allPathways = this.props.store.getState().pathways;
    allPathways.forEach((pathway) => {
      if (pathway.id === id) res = pathway.name;
    });
    return res;
  }

  renderCheckboxes() {
    const boxStyle = {
      marginTop: '7.5px',
      marginBottom: '7.5px',
      marginLeft: '5px',
      fontSize: '20px',
    };

    const markup = this.state.pathwaysActiveOrNot.map((item, index) => {
      const nameStyle = {
        marginTop: '5px',
        marginBottom: '5px',
        marginRight: '5px',
        fontSize: '13px',
      };
      const name = this.lookupPathwayName(item.id);
      const checked = item.active;
      return (
        <Flexbox key={index}>
          <label style={nameStyle}>
            {name}
            <input name={item.id} className={boxStyle} type="checkbox" checked={checked} onChange={this.handleSelect} />
          </label>
        </Flexbox>
      );
    });
    return markup;
  }


  render() {
    return (
      <Flexbox flexDirection="column">
        {this.renderCheckboxes()}
      </Flexbox>
    );
  }
}

export default PathwayPicker;
