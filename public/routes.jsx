import React from 'react';
import { Route, IndexRoute } from 'react-router';
import CourseCatalog from './components/builder/CourseCatalog';


export default (
  <Route path='/'>
    <Route path='builder' component={CourseCatalog} />
    <Route path='/' component={RootContainer} />
  </Route>
);