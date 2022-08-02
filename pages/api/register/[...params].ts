import { axiosfetchPrivate } from '../../../config/axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { params } = req.query

  switch (params[0]) {
    case 'control': {
      const URL = `/TeacherAttendance/GetControlClass/${params[1]}/${params[2]}`
      console.log("URL", URL);
      
      try {
        const { data } = await axiosfetchPrivate(URL)
        const result = data.detail
        res.status(200).json(result)
      } catch (error) {
        console.log(error)
      }
      break
    }
    case 'summary': {
      const URL = `/TeacherAttendance/GetAttendanceSummarySession/${params[1]}`
      try {
        const { data } = await axiosfetchPrivate(URL)
        const result = data.detail
        res.status(200).json(result)
      } catch (error) {
        console.log(error)
      }
      break
    }
    // case 'delete' : {
    //   const { classCode, xmlData } = req.body
    //   const URL = `/ClassSchedule/PostRegisterDelegate`
    //   try {
    //     const { data } = await axiosfetchPrivate.post(URL, { classCode, xmlData })
    //     const result = data.detail
    //     res.status(200).json(result)
    //   } catch (error) {
    //     console.log(error)
    //   }
    //   break
    // }
  }
}

export default handler
