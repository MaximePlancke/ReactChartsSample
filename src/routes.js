import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import VisualizeDataPage from './containers/VisualizeDataPage'

export default <Route path="" component={App}>
  <Route path="/"
         component={VisualizeDataPage} />
</Route>
