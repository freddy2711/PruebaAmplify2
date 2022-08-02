import { useEffect, useState } from 'react'
import styles from '../../components/templates/horario/horario.module.scss'
import HorarioButtons from '../../components/UI/molecules/horario/horarioButtons/HorarioButtons'
import { axiosfetchPrivate } from './../../config/axios'
import Loader from '../../components/UI/atoms/loader/Loader'
// import getAlert from '../../hooks/jspdf/alertify'
import GeneratePdf from '../../hooks/jspdf/GeneratePdf'

import { apiHorario } from '../api/'

import dynamic from 'next/dynamic'
const TableDinamic = dynamic(
  () => import('../../components/UI/molecules/tableDinamic/Table'),
  {
    ssr: false,
  }
)

const COLUMNS = [
  {
    label: 'Rango de horas',
    field: 'HorDescription',
    key: 'HorDescription',
    sort: 'asc',
  },
  { label: 'Lunes', field: 'Lunes', key: 'Lunes', sort: 'asc' },
  { label: 'Martes', field: 'Martes', key: 'Martes', sort: 'asc' },
  { label: 'Miércoles', field: 'Miercoles', key: 'Miercoles', sort: 'asc' },
  { label: 'Jueves', field: 'Jueves', key: 'Jueves', sort: 'asc' },
  { label: 'Viernes', field: 'Viernes', key: 'Viernes', sort: 'asc' },
  { label: 'Sábado', field: 'Sabado', key: 'Sabado', sort: 'asc' },
  { label: 'Domingo', field: 'Domingo', key: 'Domingo', sort: 'asc' },
]
const COLUMNS2 = [
  [
    'Rango de horas',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ],
]

const date = new Date()
const Horario = ({ data }: any) => {
  const [horarios, setHorarios] = useState([])
  const [horariosArray, setHorariosArray] = useState([])
  const [Loading, setloading] = useState(false)
  const nameXLS = `Horario__${date.toLocaleTimeString()}.csv`

  useEffect(() => {
    setHorarios(data.detail)
    /*    const obj = {
      detail: 'COLUMNS2',
      redirect: '',
      alertMessage: `Horario`,
    } */
    // getAlert(obj)
    console.log(data.detail)
    // const promise = apiNotes.notesExist('2225135594', 'alertMessage')
    // promise.then((res2) => {
    //   console.log('notesExist', res2)
    //   setloading(false)
    // })
    // const promise2 = apiNotes.notesClass('2225135594', 'alertMessage')
    // promise2.then((res2) => {
    //   console.log('notesClass', res2)
    //   setloading(false)
    // })
    // onDownload()
    const dataArray = data.detail?.map((_: any) => {
      return [
        _.HorDescription,
        _.Lunes,
        _.Martes,
        _.Miercoles,
        _.Jueves,
        _.Viernes,
        _.Sabado,
        _.Domingo,
      ]
    })
    setHorariosArray(dataArray)
  }, [])
  const radioActive = (e: any) => {
    setloading(true)
    const obj = {
      teacherCode: 'N00184865',
      isEpec: e.target.id === 'default_1' ? 0 : 1,
    }
    const promise = apiHorario.teachingTime(obj, 'alertMessage')
    promise.then((res) => {
      setHorarios(res)
      setloading(false)
    })
  }

  const CallReportPDF = () => {
    const obj = {
      head: COLUMNS2,
      body: horariosArray,
      name: `Horario__${date.toLocaleTimeString()}.pdf`,
    }
    GeneratePdf(obj)
  }

  return (
    <div className={styles.contenido}>
      <Loader loading={Loading} />
      <div className={styles.content}>
        <div className={styles.titulo}>
          <h5 className="text-warning">Horario de Clases</h5>
        </div>
        <hr />
        <div className={`${styles.botones} m-3`}>
          <HorarioButtons
            callReportPDF={CallReportPDF}
            radioActive={radioActive}
            horarios={horarios}
            COLUMNS={COLUMNS}
            nameXLS={nameXLS}
            // handleSelectedChange={handleSelectedChange}
          />
        </div>
        <hr className="m-0" />
        <div className={styles.tabla}>
          <TableDinamic
            columns={COLUMNS}
            listData={horarios}
          />
        </div>
      </div>
    </div>
  )
}

export default Horario

export async function getServerSideProps(context: any) {
  const { query } = context
  // const { codeTeacher, hourDay } = query
  console.log('query', query)
  console.log('query222', context)
  try {
    const obj = {
      teacherCode: 'N00184865',
      isEpec: 0,
    }
    const { data } = await axiosfetchPrivate(
      `ClassSchedule/GetTeachingTimeReport/${obj.teacherCode}/${obj.isEpec}`
    )
    return {
      props: { data },
    }
  } catch (error: any) {
    console.log(error)
    const msg = error.response.data.message
    return {
      props: { data: { msg, status: error.response.status } },
    }
  }
}
