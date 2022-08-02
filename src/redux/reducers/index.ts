import { combineReducers } from 'redux'
import DatosPersonalesReducer from './DatosPersonalesReducer'

export default combineReducers({
  datosPersonales: DatosPersonalesReducer
})