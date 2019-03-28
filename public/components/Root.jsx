// source: https://redux.js.org/advanced/usage-with-react-router
import React from 'react'
import PropTypes from 'prop-types';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import CourseCatalog from './builder/CourseCatalog.jsx';
import RootContainer from './main/RootContainer.jsx';

class Root extends React.Component {
  render() {
    console.log(this.props.store);
      return (
        <BrowserRouter>
          <div>
          <Switch>
            <Route exact path="/"
            render={()=><RootContainer store={this.props.store}/>} />
            <Route exact path="/builder" 
            render={()=> <CourseCatalog store={this.props.store}/>} />
          </Switch>
          </div>
      </BrowserRouter> 
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root