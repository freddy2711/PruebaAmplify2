import { axiosfetchPrivate } from '../../../config/axios'

export default async function handler(req, res) {
  const { params } = req.query
  const params2 = req.body?.obj
  let result = { data: null }
  // switch (params[0]) {
  //   case 'notes1':
  //     result = await axiosfetchPrivate(`notes/exist/${params[1]}/class`)
  //   case 'notes2':
  //     result = await axiosfetchPrivate(
  //       `ClassSchedule/GetTeachingTimeReport/${params[1]}/${params[2]}`
  //     )
  // }
  if (params[0] === 'notes1') {
    result = await axiosfetchPrivate(`notes/exist/${params[1]}/class`)
  } else if (params[0] === 'notes2') {
    result = await axiosfetchPrivate(`notes/class/${params[1]}`)
  } else if (params[0] === 'notes3') {
    result = await axiosfetchPrivate(`notes/state/${params[1]}`)
  } else if (params[0] === 'notes4') {
    result = await axiosfetchPrivate(
      `notes/student/${params[1]}/class/${params[2]}/state`
    )
  } else if (params[0] === 'notes5') {
    result = await axiosfetchPrivate(
      `notes/validate/${params[1]}/ip/${params[2]}/user`
    )
  } else if (params[0] === 'notes6') {
    result = await axiosfetchPrivate(
      `notes/control/${params[1]}/semester/${params[2]}/note/${params[3]}/class`
    )
  } else if (params[0] === 'notes7') {
    result = await axiosfetchPrivate.post(`notes/classGroup`, { params2 })
  } else if (params[0] === 'notes8') {
    result = await axiosfetchPrivate.post(`notes/state`, { params2 })
  } else if (params[0] === 'notes9') {
    result = await axiosfetchPrivate.post(`notes/upload`, { params2 })
  }
  res.json(result.data)
}
