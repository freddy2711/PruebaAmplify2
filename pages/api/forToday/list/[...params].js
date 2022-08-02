import { axiosfetchPrivate } from '../../../../config/axios'

export default async function handler(req, res) {
  const { params } = req.query

  console.log(params)

  const teacher = params[0]
  const date = params[1]

  const result = await axiosfetchPrivate(
    `/ClassSchedule/GetSessionTeacherByDay/${teacher}/${date}`
  )

  res.json(result.data)
}
