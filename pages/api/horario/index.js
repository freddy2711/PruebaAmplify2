import axiosfetchPublic from '../../../config/axios'

// `notes/classGroup`
// `notes/state`
// `notes/upload`

const API = {
  teachingTime: async (obj, alertMessage) => {
    try {
      const URL = `/horario/h1/${obj.teacherCode}/${obj.isEpec}`
      const result = await axiosfetchPublic(URL)
      return result.data.detail
    } catch (err) {}
  },
}
export default API
