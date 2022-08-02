import axiosfetchPublic from '../../../config/axios'

const API = {
  notesExist: async (classCode, alertMessage) => {
    try {
      const URL = `/notes/notes1/${classCode}`
      const result = await axiosfetchPublic(URL)
      return result.data.detail
    } catch (err) {}
  },
  notesClass: async (classCode, alertMessage) => {
    try {
      const URL = `/notes/notes2/${classCode}`
      const result = await axiosfetchPublic(URL)
      return result.data.detail
    } catch (err) {}
  },
  notesState: async (classCode, alertMessage) => {
    try {
      const URL = `/notes/notes3/${classCode}`
      const result = await axiosfetchPublic(URL)
      return result.data.detail
    } catch (err) {}
  },
  notesStudent: async (obj, alertMessage) => {
    try {
      const URL = `/notes/notes4/${obj.classCode}/${obj.state}`
      const result = await axiosfetchPublic(URL)
      return result.data.detail
    } catch (err) {}
  },
  notesValidate: async (obj, alertMessage) => {
    try {
      const URL = `/notes/notes5/${obj.ip}/${obj.user}`
      const result = await axiosfetchPublic(URL)
      return result.data.detail
    } catch (err) {}
  },
  notesControl: async (obj, alertMessage) => {
    try {
      const URL = `/notes/notes6/${obj.semester}/${obj.note}/${obj.class}`
      const result = await axiosfetchPublic(URL)
      return result.data.detail
    } catch (err) {}
  },
  notesClassGroup: async (obj, alertMessage) => {
    try {
      const URL = `/notes/notes7/`
      const result = await axiosfetchPublic.post(URL, { obj })
      return result.data.detail
    } catch (err) {
      console.log('ERROR Group', err)
    }
  },
  /* notesState: async (obj, alertMessage) => {
    try {
      const URL = `/notes/notes8/`
      const result = await axiosfetchPublic.post(URL, { obj })
      return result.data.detail
    } catch (err) {
      console.log('ERROR Group', err)
    }
  }, */
  notesUpload: async (obj, alertMessage) => {
    try {
      const URL = `/notes/notes9/`
      const result = await axiosfetchPublic.post(URL, { obj })
      console.log('result', result)
      return result.data.detail
    } catch (err) {
      console.log('ERROR Group', err)
    }
  },
}
export default API
