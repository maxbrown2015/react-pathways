/* eslint-disable no-alert */
import React from 'react';
import Flexbox from 'flexbox-react';
import FontAwesome from 'react-fontawesome';
import * as actions from '../actions/index.js';
import PathwayPicker from './PathwayPicker.jsx';

class CourseTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: props.isActive,
      number: '',
      title: '',
      descripton: '',
      link: '',
      selectedPathways: [],
    };

    this.toggleActive = this.toggleActive.bind(this);
    this.createNewCourse = this.createNewCourse.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.updateSelectedPathways = this.updateSelectedPathways.bind(this);

    this.validateNewCourse = this.validateNewCourse.bind(this);
    this.validateLink = this.validateLink.bind(this);
    this.validateNumber = this.validateNumber.bind(this);
    this.validateDescriptionAndTitle = this.validateDescriptionAndTitle.bind(this);
    this.validatePathways = this.validatePathways.bind(this);
  }

  toggleActive() {
    this.props.notifyParent();
  }

  createNewCourse() {
    if (!this.validateNewCourse()) {
      this.toggleActive();
      console.log('not validated');
      return;
    }

    const newCourse = {
      number: this.state.number,
      title: this.state.title,
      descripton: this.state.descripton,
      link: this.state.link,
      selectedPathways: this.state.selectedPathways,
    };

    this.props.store.dispatch(actions.addCourse(newCourse));
    this.toggleActive();
  }

  handleTextChange(event) {
    if (event.target.name === 'number') {
      this.setState({ number: event.target.value });
    }
    if (event.target.name === 'title') {
      this.setState({ title: event.target.value });
    }
    if (event.target.name === 'description') {
      this.setState({ description: event.target.value });
    }
    if (event.target.name === 'link') {
      this.setState({ link: event.target.value });
    }
  }

  updateSelectedPathways(selected) {
    this.setState(() => ({
      selectedPathways: selected,
    }));
  }

  validateNewCourse() {
    return true;
    // return this.validateNumber() && this.validateDescriptionAndTitle() && this.validateLink() && this.validatePathways();
  }

  validateNumber() {
    if (!(RegExp(/^[0-9]{3,4}$/)).test(this.state.number)) {
      alert('Course number was invalid format: xxx or xxxx');
      return false;
    }
    let result = true;
    this.props.store.getState().courses.forEach((course) => {
      if (this.state.number === course.number) {
        alert('Course number is already in use');
        result = false;
      }
    });
    return result;
  }

  validatePathways() {
    if (this.state.selectedPathways.length === 0) {
      alert('A course must belong to atleast one pathway');
      return false;
    }
    return true;
  }

  validateDescriptionAndTitle() {
    if (!(RegExp(/^[a-zA-Z0-9]*$/).test(this.state.description))) {
      console.log(this.state.description);
      alert('Description contains invalid characters');
      return false;
    }
    if (!RegExp(/^[\w\s\-]*$/).test(this.state.title)) {
      alert('Title contains invalid characters');
      return false;
    }
    return true;
  }

  validateLink() {
    if (!RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/).test(this.state.link)) {
      alert('Invalid Link Format');
      return false;
    }
    return true;
  }

  render() {
    const formContainerStyle = {
      fontSize: '20px',
    };

    const titleStyle = {
      fontSize: '50px',
    };

    const formStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginRight: '50px',
      marginLeft: '20px',
    };

    const headerStyle = {
      textAlign: 'center',
      margin: '20px',
    };

    const confirmStyle = {
      fontSize: '50px',
      color: 'green',
    };

    const declineStyle = {
      fontSize: '50px',
      color: 'red',
    };

    return (
      <Flexbox height="600px" width="100%" flexDirection="column">
        <Flexbox height="100px" width="100%" alignSelf="center" alignItems="center" justifyContent="center" style={titleStyle}>
        New Course Form
        </Flexbox>
        <Flexbox flexDirection="row" width="100%" height="400px">
          <Flexbox style={formContainerStyle} flexDirection="column" width="60%">
            <form style={formStyle} onSubmit={this.handleSubmit}>
              <span style={headerStyle}>Number</span>
              <textarea name="number" value={this.state.number} onChange={this.handleTextChange} cols={40} rows={2} />

              <span style={headerStyle}>Title</span>
              <textarea name="title" value={this.state.title} onChange={this.handleTextChange} cols={40} rows={2} />

              <span style={headerStyle}>Description</span>
              <textarea name="description" value={this.state.description} onChange={this.handleTextChange} cols={40} rows={10} />

              <span style={headerStyle}>Link</span>
              <textarea name="link" value={this.state.link} onChange={this.handleTextChange} cols={40} rows={2} />
            </form>
          </Flexbox>
          <Flexbox flexDirection="column" width="40%" marginTop="50px">
            <PathwayPicker store={this.props.store} notifyParentOfChange={this.updateSelectedPathways} selected={this.state.selectedPathways} />
          </Flexbox>
        </Flexbox>
        <Flexbox flexDirection="row" marginTop="25px" height="50px" width="100%" alignSelf="center" alignItems="center" justifyContent="center">
          <Flexbox margin="20px">
            <FontAwesome name="fa-check-circle" className="fa-check-circle" style={confirmStyle} onClick={this.createNewCourse} />
          </Flexbox>
          <Flexbox margin="20px">
            <FontAwesome name="fa-times" className="fa-times" style={declineStyle} onClick={this.toggleActive} />
          </Flexbox>
        </Flexbox>
      </Flexbox>
    );
  }
}

export default CourseTemplate;
