import { axiosfetchPrivate } from '../../../config/axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { params } = req.query

  console.log(params)


  switch (params[0]) {
    case 'list': {
      
      try {
        const obj = {
          action: 'get_docesolicitud',
          teacherCode: `${params[1]}`,
          classId: null,
          dateHour: null,
          classRoomCode: null,
          conClassInitial: null,
          conClassFinal: null,
        }
    
        const noIniciadas = await axiosfetchPrivate.post(
          `/TeacherAttendance/PostSessionsNotStarted`,
          obj
        )
    
        const obj2 = {
          action: 'get_docabiertasolicitud',
          teacherCode: `${params[1]}`,
          classId: null,
          dateHour: null,
          classRoomCode: null,
          conClassInitial: null,
          conClassFinal: null,
        }
    
        const noCerradas = await axiosfetchPrivate.post(
          `/TeacherAttendance/PostSessionsNotStarted`,
          obj2
        )
    
        const obj3 = {
          action: 'get_docesolicitudpen',
          teacherCode: `${params[1]}`,
          classId: null,
          dateHour: null,
          classRoomCode: null,
          conClassInitial: null,
          conClassFinal: null,
        }
    
        const pending = await axiosfetchPrivate.post(
          `/TeacherAttendance/PostSessionsNotStarted`,
          obj3
        )
    
        const data = {
          noinit: noIniciadas.data.detail,
          noClose: noCerradas.data.detail,
          pending: pending.data.detail,
        }
    
        res.status(200).json(data) 

      } catch (error) {
        console.log(error)
      }

      break
    }
    case 'detailClass': {
      const item = req.body 

      const obj = {
        action: 'get_clasesolicitud',
        teacherCode: item.teacherCode, 
        classId:  item.ClaCode,
        dateHour:  item.HoursDate,
        classRoomCode:  item.ClassRoomCode,
        conClassInitial:  item.hoursIni,
        conClassFinal:  item.hoursEnd,
      }
    
      try {
        const { data } = await axiosfetchPrivate.post(
          `/TeacherAttendance/PostSessionsNotStarted`,
          obj
        )
          
        res.status(200).json(data) 

      } catch (error: any) {
        console.log(error)
      }
      break
    }
    case 'cheAsisAlum': {
      try {
          
        const { data } = await axiosfetchPrivate(
          `/TeacherAttendance/VerifyAsistanceStudentSolicitud/${params[1]}/${params[2]}/${params[3]}`
        )
          
        res.status(200).json(data.detail.control) 
      
      } catch (error) {
        console.log(error)
      }
      break
    }
    case 'getClaseDetalle': {
      try {
          
        const { data } = await axiosfetchPrivate(
          `/ClassSchedule/ParameterByCodeAndClass/${params[1]}/${params[2]}`
        )

        const { detail } = data

        res.status(200).json(detail[0].ParameterValue) 
      
      } catch (error) {
        console.log(error)
      }
      break
    }
  }
}

export default handler