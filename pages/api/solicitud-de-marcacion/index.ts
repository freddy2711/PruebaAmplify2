import axiosfetchPublic from '../../../config/axios'

const API = {
  listSesionesSolicitud: async (teacherCode: string) => {
    try {
      const URL = `/solicitud-de-marcacion/list/${teacherCode}`
      const result = await axiosfetchPublic(URL)
      return result
      
    } catch (error) {
      console.log(error)
    }

  },
  detailClass: async (item: any) => {

    try {
      const URL = `/solicitud-de-marcacion/detailClass/`
      const result = await axiosfetchPublic.post(URL, item)
      return result
      
    } catch (error) {
      console.log(error)
    }

  },
  cheAsisAlum: async (aula: string | null, ctrlClassId: string, fecha: string) => {
    try {
      const URL = `/solicitud-de-marcacion/chequeAsisAlum/${aula}/${ctrlClassId}/${fecha}`
      const result = await axiosfetchPublic(URL)
      return result
      
    } catch (error) {
      console.log(error)
    }
  },
  getClaseDetalle: async (classCode: string, parameter: string) => {
    try {
      const URL = `/solicitud-de-marcacion/getClaseDetalle/${classCode}/${parameter}`
      const result = await axiosfetchPublic(URL)

      return result
      
    } catch (error) {
      console.log(error)
    }
  }
}

export default API