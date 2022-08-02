import { axiosfetchPrivate } from '../../../config/axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { params } = req.query

  switch (params[0]) {
    case 'open': {
      const URL = `/TeacherAttendance/SeccionOpen/${params[1]}/codeUser`
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
