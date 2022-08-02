import { axiosfetchPrivate } from '../../../config/axios'

export default async function handler(req, res) {
  const { params } = req.query
  // const params2 = req.body?.obj
  let result = { data: null }
  if (params[0] === 'h1') {
    result = await axiosfetchPrivate(
      `ClassSchedule/GetTeachingTimeReport/${params[1]}/${params[2]}`
    )
  } else if (params[0] === 'h2') {
    result = await axiosfetchPrivate(`notes/class/${params[1]}`)
  }
  res.json(result.data)
}
