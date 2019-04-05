/* eslint-disable no-alert */
import React from 'react';
import Flexbox from 'flexbox-react';
import FontAwesome from 'react-fontawesome';
import Popup from 'reactjs-popup';
import * as actions from '../actions/index.js';
import PathwayPicker from './PathwayPicker.jsx';


class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deletePromptActive: false,
      editViewActive: false,

      number: props.number,
      title: props.title,
      description: props.description,
      link: props.link,
      type: props.type,
      selectedPathways: props.selectedPathways,
    };

    this.renderCourseEditView = this.renderCourseEditView.bind(this);
    this.renderDefaultCourseView = this.renderDefaultCourseView.bind(this);
    this.renderPromptForDeleteCourse = this.renderPromptForDeleteCourse.bind(this);
    this.renderPathwayNames = this.renderPathwayNames.bind(this);

    this.acceptChanges = this.acceptChanges.bind(this);
    this.cancelChanges = this.cancelChanges.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.updateSelectedPathways = this.updateSelectedPathways.bind(this);

    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.toggleDeletePrompt = this.toggleDeletePrompt.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);

    this.validateCourseState = this.validateCourseState.bind(this);
    this.validateLink = this.validateLink.bind(this);
    this.validateDescriptionAndTitle = this.validateDescriptionAndTitle.bind(this);
  }

  componentWillUnmount() {
    console.log(this.props.index);
  }

  componentWillMount() {
    this.props.store.subscribe(() => {
      this.setState(this.props.store.getState());
    });
  }

  cancelChanges() {
    this.setState(() => ({
      title: this.props.title,
      description: this.props.description,
      link: this.props.link,
      selectedPathways: this.props.selectedPathways,
      editViewActive: false,
    }));
  }

  acceptChanges() {
    if (!this.validateCourseState()) {
      console.log('not validates');
      this.toggleEditMode();
      return;
    }

    // make new course
    const newCourse = {
      number: this.props.number,
      title: this.state.title,
      description: this.state.description,
      link: this.state.link,
      selectedPathways: this.state.selectedPathways,
    };

    this.toggleEditMode();
    this.props.store.dispatch(actions.changeCourse(this.props.index, newCourse));
  }

  deleteCourse() {
    console.log(`deleting course: ${this.props.index}`);
    this.toggleDeletePrompt();
    this.props.store.dispatch(actions.deleteCourse(this.props.index));
  }

  toggleEditMode() {
    console.log('Edit mode toggled');
    this.setState(prevState => ({
      editViewActive: !prevState.editViewActive,
    }));
  }

  handleTextChange(event) {
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

  validateCourseState() {
    // check if number is valid
    // check if title is a valid string
    // check if description is a valid string
    // check if link is valid
    return this.validateDescriptionAndTitle() && this.validateLink() && this.validatePathways();
  }

  validatePathways() {
    if (this.state.selectedPathways.length === 0) {
      alert('A course must belong to atleast one pathway');
      return false;
    }
    return true;
  }


  validateDescriptionAndTitle() {
    if (!RegExp(/^[a-zA-Z0-9]*$/).test(this.state.description)) {
      alert('Description contains invalid characters');
      this.setState(() => ({ description: '' }));
      return false;
    }
    if (!RegExp(/^[a-zA-Z0-9]*$/).test(this.state.title)) {
      alert('Title contains invalid characters');
      this.setState(() => ({ title: '' }));
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


  toggleDeletePrompt() {
    this.setState(prevState => ({ deletePromptActive: !prevState.deletePromptActive }));
  }

  renderPathwayNames() {
    const allPathways = this.props.store.getState().pathways;
    // im sorry
    const items = [];
    this.props.selectedPathways.forEach((pathway) => {
      allPathways.forEach((item) => {
        if (pathway === item.id) {
          items.push({ name: item.name, color: item.color });
        }
      });
    });

    const markup = items.map((item, index) => {
      const style = {
        margin: '5px',
        color: item.color,
      };
      return (<Flexbox key={index} style={style}>{item.name}</Flexbox>);
    });

    return markup;
  }

  renderPromptForDeleteCourse() {
    const deleteMessageStyle = {
      fontSize: '20px',
      overflow: 'hidden',
      textAlign: 'center',
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
      <Flexbox height="200px" width="100%" flexDirection="column" alignItems="center">
        <Flexbox
          flexDirection="row"
          height="20%"
          width="100%"
          alignSelf="center"
          marginTop="50px"
          alignItems="center"
          justifyContent="center"
          style={deleteMessageStyle}
        >
    Are you sure you want to delete HIST-
          {this.props.number}
:
          {' '}
          {this.props.title}
        </Flexbox>
        <Flexbox flexDirection="row" alignItems="center" justifyContent="center" marginTop="50px">
          <Flexbox marginLeft="50%">
            <FontAwesome name="fa-check-circle" className="fa-check-circle" style={confirmStyle} onClick={this.deleteCourse} />
          </Flexbox>
          <Flexbox marginLeft="50%">
            <FontAwesome name="fa-times" className="fa-times" style={declineStyle} onClick={this.toggleDeletePrompt} />
          </Flexbox>
        </Flexbox>
      </Flexbox>
    );
  }

  renderCourseEditView() {
    const divStyle = {
      backgroundColor: '#f2f2f2',
      fontSize: '35px',
    };

    const formContainerStyle = {
      fontSize: '20px',
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
      <Flexbox height="600px" width="100%" flexDirection="column" style={divStyle}>
        <Flexbox height="100px" width="100%" alignSelf="center" alignItems="center" justifyContent="center">
          <p>
HIST-
            {this.props.number}
:
            {'   '}
            {this.props.title}
          </p>
        </Flexbox>
        <Flexbox flexDirection="row" width="100%" height="400px">
          <Flexbox style={formContainerStyle} flexDirection="column" width="70%">
            <form style={formStyle} onSubmit={this.handleSubmit}>
              <span style={headerStyle}>Title</span>
              <textarea name="title" value={this.state.title} onChange={this.handleTextChange} cols={40} rows={2} />

              <span style={headerStyle}>Description</span>
              <textarea name="description" value={this.state.description} onChange={this.handleTextChange} cols={40} rows={10} />

              <span style={headerStyle}>Link</span>
              <textarea name="link" value={this.state.link} onChange={this.handleTextChange} cols={40} rows={2} />
            </form>
          </Flexbox>
          <Flexbox flexDirection="column" width="30%" marginTop="50px">
            <PathwayPicker store={this.props.store} notifyParentOfChange={this.updateSelectedPathways} selected={this.props.selectedPathways} />
          </Flexbox>
        </Flexbox>
        <Flexbox flexDirection="row" marginTop="25px" height="50px" width="100%" alignSelf="center" alignItems="center" justifyContent="center">
          <Flexbox margin="20px">
            <FontAwesome name="fa-check-circle" className="fa-check-circle" style={confirmStyle} onClick={this.acceptChanges} />
          </Flexbox>
          <Flexbox margin="20px">
            <FontAwesome name="fa-times" className="fa-times" style={declineStyle} onClick={this.cancelChanges} />
          </Flexbox>
        </Flexbox>
      </Flexbox>
    );
  }


  renderButtons() {
    const editButtonStyle = {
      fontSize: '30px',
      color: 'blue',
      textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
    };

    const deleteButtonStyle = {
      fontSize: '30px',
      color: 'red',
      textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
    };

    return (
      <Flexbox flexDirection="column" height="100%" width="5%" alignItems="center" justifyContent="center">
        <Flexbox height="50%" width="100%">
          <FontAwesome name="fa-edit" className="fa-edit" style={editButtonStyle} onClick={this.toggleEditMode} />
        </Flexbox>
        <Flexbox marginTop="20%" height="30%" width="100%">
          <FontAwesome name="fa-times" className="fa-times" style={deleteButtonStyle} onClick={this.toggleDeletePrompt} />
        </Flexbox>
      </Flexbox>
    );
  }


  renderDefaultCourseView() {
    const divStyle = {
      borderRadius: '10px',
      border: '1px solid #5edcee',
      backgroundColor: '#f2f2f2',
    };

    const headerStyle = {
      fontSize: '20px',
    };


    return (
      <Flexbox flexDirection="row" minHeight="10vh" width="70vw" marginBottom="20px" style={divStyle} alignItems="center">
        <Flexbox flexDirection="column" height="100%" width="95%">
          <Flexbox element="header" height="60px" width="100%" style={headerStyle} alignItems="center" justifyContent="center">
        HIST-
            {this.props.number}
            {' '}
            {this.props.title}
          </Flexbox>
          <Flexbox element="footer" height="60px" width="100%" marginRight="5%" alignItems="center" justifyContent="center">
            {this.renderPathwayNames()}
          </Flexbox>
        </Flexbox>
        {this.renderButtons()}
        {this.renderPopups()}
      </Flexbox>
    );
  }

  renderPopups() {
    return (
      <Flexbox>
        <Popup position="top center" open={this.state.deletePromptActive} closeOnDocumentClick={false}>
          {this.renderPromptForDeleteCourse()}
        </Popup>
        <Popup position="top center" open={this.state.editViewActive} closeOnDocumentClick={false}>
          {this.renderCourseEditView()}
        </Popup>
        {' '}

      </Flexbox>
    );
  }

  render() {
    console.log(`rendered ${this.props.number}`);
    return this.renderDefaultCourseView();
  }
}

export default Course;
