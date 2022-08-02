import {
  AGREGAR_EXPERIENCIA_LABORAL,
  ELIMINAR_EXPERIENCIA_LABORAL,
} from './../types'

import clienteAxios from '../../../config/axios'

export function addExpLabAction()  {
  return async (dispatch:any) => {
    dispatch( agregarDatoLaboral() )

    try {
      await  clienteAxios.post('/productos', 'anything')
      // dispatch agregadoconexito(anything)
    } catch (error) {
      console.log(error)

      dispatch( agregarDatoLaboralError(true) )
    }
  }
}

const agregarDatoLaboral = () =>({
  type: AGREGAR_EXPERIENCIA_LABORAL
})

const agregarDatoLaboralError = (payload:boolean) =>({
  type: ELIMINAR_EXPERIENCIA_LABORAL,
  payload
})