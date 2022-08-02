import axiosfetchPublic from '../../../config/axios'

const API = {
  listByClass: async (classCode: string) => {
    try {
      const URL = `/delegado/list/${classCode}`
      const result = await axiosfetchPublic(URL)
      return result

    } catch (error) {
      // console.log(error)
    }
  },
  createDelegate: async (classCode: string, xmlData: string) => {
    try {
      const URL = `/delegado/create/`
      const result = await axiosfetchPublic.post(URL, {classCode, xmlData})
      return result.data

    } catch (error) {
      console.log(error)
    }
  },
  deleteDelegate: async (classCode: string, xmlData: string) => {
    try {
      const URL = `/delegado/delete/`
      const result = await axiosfetchPublic.post(URL, {classCode, xmlData})
      return result.data

    } catch (error) {
      console.log(error)
    }
  }
}

export default API