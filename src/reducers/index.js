import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

import visualizeData from './visualizeData';


const rootReducer = combineReducers({
  visualizeData,
  routing
})

export default rootReducer
