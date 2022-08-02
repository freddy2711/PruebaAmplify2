import axiosfetchPublic from '../../../config/axios'

const API = {
  ByControl: async (obj: any) => {
    try {
      const URL = `/register/control/${obj.code}/${obj.time}`
      const result: any = await axiosfetchPublic(URL)
      if (result?.status === true) {
        console.log('status', result?.status)
      }
      return result.data
    } catch (error) {
      // console.log(error)
    }
  },
  AttendanceSummary: async (classCode: string) => {
    try {
      const URL = `/register/summary/${classCode}`
      const result: any = await axiosfetchPublic(URL)
      if (result?.status === true) {
        console.log('status', result?.status)
      }
      return result.data
    } catch (error) {
      // console.log(error)
    }
  },
  // deleteDelegate: async (classCode: string, xmlData: string) => {
  //   try {
  //     const URL = `/delegado/delete/`
  //     const result = await axiosfetchPublic.post(URL, {classCode, xmlData})
  //     return result.data

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
}

export default API
