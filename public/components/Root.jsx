// source: https://redux.js.org/advanced/usage-with-react-router


import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CourseCatalog from './builder/CourseCatalog';
import RootContainer from './main/RootContainer'

class Root extends React.Component {
  render() {
      return ( <Provider store={this.props.store}>
        <Router>
          <Route path="/" component={RootContainer} />
          
        </Router>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root