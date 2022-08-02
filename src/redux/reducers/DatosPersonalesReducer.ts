import {
  AGREGAR_EXPERIENCIA_LABORAL,
  // ELIMINAR_EXPERIENCIA_LABORAL,
} from './../types'

// cada reducer tiene su propio state
type Action = {
  type: string,
  payload?: any
}

const initialState = {
  datosPersonales: { 
    nombre: '',
    apellido: '',
  },
  error: null,
  loading: false,
}

export default function ( state: object = initialState, action: Action ){
  switch (action.type) {
    case AGREGAR_EXPERIENCIA_LABORAL:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}