import React from 'react';
import Course from './Course.jsx';
import * as actions from '../actions/index.js';
import Flexbox from 'flexbox-react';
import FontAwesome from 'react-fontawesome';
import CourseTemplate from './CourseTemplate.jsx';
import Popup from 'reactjs-popup';
import SearchBar from '@opuscapita/react-searchbar';


class CourseCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.renderCourses.bind(this);
    this.renderButtons.bind(this);


    this.state = {
      reduxState: {},
      newCourseViewActive: false,
      areYouSureViewActive: false,
      exportPromptActive: false,
      searchValue: '',
    };
    
    this.undoChanges = this.undoChanges.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.exportCourses = this.exportCourses.bind(this);

    this.toggleNewCourseView = this.toggleNewCourseView.bind(this);
    this.toggleAreYouSurePrompt = this.toggleAreYouSurePrompt.bind(this);
    this.toggleExportPrompt = this.toggleExportPrompt.bind(this);

    this.renderNewCourseView = this.renderNewCourseView.bind(this);
    this.renderAreYouSurePrompt = this.renderAreYouSurePrompt.bind(this);
    this.renderExportPrompt = this.renderExportPrompt.bind(this);
    this.renderSearchBar = this.renderSearchBar.bind(this);
  
    console.log(this.props.store.getState().courses);

  }

  componentDidMount() {
    this.props.store.subscribe(() => {
      this.setState({reduxState: this.props.store.getState()});
    });
  }

  undoChanges() {
    this.props.store.dispatch(actions.undoChanges());
    this.toggleAreYouSurePrompt();
    this.setState(() => {
      return {searchValue: ''};
    });
  }

  exportCourses() {
    this.props.store.dispatch(actions.exportData());
    this.toggleExportPrompt();
  }

  toggleNewCourseView() {
    this.setState((prevState) => ({
      newCourseViewActive: !prevState.newCourseViewActive
    }));
  }

  toggleAreYouSurePrompt() {
    this.setState((prevState) => ({
      areYouSureViewActive: !prevState.areYouSureViewActive
    }));
  }

  toggleExportPrompt() {
    this.setState((prevState) => ({
      exportPromptActive: !prevState.exportPromptActive
    }));
  }
  
  handleSearch() {
    this.setState(() => ({
      searchValue : event.target.value
    }));
  }

  renderCourses() {
    
    const courses = this.props.store.getState().courses;

    const filteredCoursesBySearchValue = courses.filter((course) => {
      return course.number.includes(this.state.searchValue) || course.title.includes(this.state.searchValue);
    });

    // console.log(filteredCoursesBySearchValue)

    const markup = filteredCoursesBySearchValue.map((course, index) => {
      return (<Course store={this.props.store} key={index} index={index}   
        number={course.number} title={course.title} description={course.description} 
        link={course.link} selectedPathways={course.selectedPathways}/>);
    });
    return markup;
  }


  renderButtons() {
    const addButtonStyle = {
      fontSize: '50px',
      color: 'green'
    };

    const undoButtonStyle = {
      fontSize: '46px',
      color: 'red'
    };

    const exportButtonStyle = {
      fontSize: '46px',
      color: 'blue'
    };

    return (
      <Flexbox flexDirection='row' justifyContent="center" alignItems="center" margin='20px'>
        <Flexbox margin='50px' marginTop='1px'>
          <FontAwesome name='fa-plus' className='fa-plus' style={addButtonStyle} onClick={this.toggleNewCourseView}
          /> 
        </Flexbox>
        <Flexbox margin='50px' marginTop='1px'>
          <FontAwesome name='fa-undo' className='fa-undo' style={undoButtonStyle} onClick={this.toggleAreYouSurePrompt}
          /> 
        </Flexbox>
        <Flexbox margin='50px' marginTop='1px'>
          <FontAwesome name='fa-upload' className='fa-upload' style={exportButtonStyle} onClick={this.toggleExportPrompt}
          /> 
        </Flexbox>

      </Flexbox>
    );
  }

  renderAreYouSurePrompt() {

    const deleteMessageStyle = {
      fontSize: '20px',
      overflow: 'hidden',
      textAlign:'center'
    };

    const confirmStyle = {
      fontSize: '50px',
      color: 'green',
    };

    const declineStyle = {
      fontSize: '50px',
      color: 'red',
    };

    return <Popup open={this.state.areYouSureViewActive}>
      <Flexbox height='200px' width='100%' flexDirection="column" alignItems='center'>
        <Flexbox flexDirection='row' height="20%" width='100%' alignSelf='center' marginTop='50px' alignItems='center' justifyContent='center' 
          style={deleteMessageStyle} >
          Are you sure you want to reset the changes made during this session? 
        </Flexbox>
        <Flexbox flexDirection='row' alignItems='center' justifyContent='center' marginTop='50px'>
          <Flexbox marginLeft='50%'>
            <FontAwesome name='fa-check-circle' className='fa-check-circle' style={confirmStyle} onClick={this.undoChanges}/> 
          </Flexbox >
          <Flexbox marginLeft='50%'>
            <FontAwesome name='fa-times' className='fa-times' style={declineStyle} onClick={this.toggleAreYouSurePrompt}/>
          </Flexbox>
        </Flexbox>
      </Flexbox>
    </Popup>;
  }

  renderExportPrompt() {

    const deleteMessageStyle = {
      fontSize: '20px',
      overflow: 'hidden',
      textAlign:'center'
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
      <Popup open={this.state.exportPromptActive}>
        <Flexbox height='200px' width='100%' flexDirection="column" alignItems='center'>
          <Flexbox flexDirection='row' height="20%" width='100%' alignSelf='center' marginTop='50px' alignItems='center' justifyContent='center' 
            style={deleteMessageStyle} >
          Would you like to export your changes? This change cannot be undone.  
          </Flexbox>
          <Flexbox flexDirection='row' alignItems='center' justifyContent='center' marginTop='50px'>
            <Flexbox marginLeft='50%'>
              <FontAwesome name='fa-check-circle' className='fa-check-circle' style={confirmStyle} onClick={this.exportCourses}/> 
            </Flexbox >
            <Flexbox marginLeft='50%'>
              <FontAwesome name='fa-times' className='fa-times' style={declineStyle} onClick={this.toggleExportPrompt}/>
            </Flexbox>
          </Flexbox>
        </Flexbox>
      </Popup>
    );
  }

  renderNewCourseView() {
    return <Popup open={this.state.newCourseViewActive}><CourseTemplate store={this.props.store} notifyParent={this.toggleNewCourseView}/></Popup>;
  }

  renderSearchBar() {
    return <Flexbox flexDirection='row' alignSelf='center' marginBottom='50px' ><SearchBar onSearch={this.handleSearch} marginBottom='50px'
      value={this.state.searchValue}/>
    </Flexbox>;
  }


  render() {
    console.log('catalog rendered');
    const headerStyle = {
      fontSize: '30px'
    };
    return (
      <Flexbox flexDirection="column" justifyContent="center" alignItems="center">
        <Flexbox height='50px' width='100%' marginBottom='50px' justifyContent="center" alignSelf='center' style={headerStyle}>Course Catalog</Flexbox>
        {this.renderSearchBar()}
        {this.renderButtons()}
        {this.renderCourses()}
        {this.renderNewCourseView()}
        {this.renderAreYouSurePrompt()}
        {this.renderExportPrompt()}
      </Flexbox>
    );
  }
}

export default CourseCatalog;