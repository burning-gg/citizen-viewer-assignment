import { combineReducers } from 'redux'
import alertReducer from './alertReducer'
import clientReducer from './clientReducer'
import searchReducer from './searchReducer'

export default combineReducers({
  alertReducer,
  clientReducer,
  searchReducer
})