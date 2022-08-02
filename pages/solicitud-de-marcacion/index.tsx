import { useState, useEffect } from 'react'
import Router from 'next/router'
import Anchor from '../../components/UI/atoms/anchor/Anchor'
import Label from '../../components/UI/atoms/label/Label'
import SolMarcaButtons from '../../components/UI/molecules/solMarcaButtons/SolMarcaButtons'
import styles from '../../components/templates/solicitudMarcacion/solMarcacion.module.scss'
import axiosfetchPublic from '../../config/axios'
import Loader from '../../components/UI/atoms/loader/Loader'
import moment from 'moment'
import 'moment/locale/es'
import dynamic from 'next/dynamic'
import { get, set } from 'local-storage'
// import Swal from 'sweetalert2'

import {
  TEACHERCODE,
  CLASS_SELECTED_SOL_MARCACION,
  LIST_SESION_SOL,
  DUENO_SESSION,
  ASISTENCIA,
} from './../../consts/storageConst'

const TableDinamic = dynamic(
  () => import('../../components/UI/molecules/tableDinamic/Table'),
  {
    ssr: false,
  }
)

const Alerta = dynamic(() => import('../../components/UI/atoms/alert/Alerts'), {
  ssr: false,
})

const SolicitudMarcacion = () => {
  moment.locale('es')
  const [datosNoInit, setDatosNoInit] = useState([])
  const [datosNoClose, setDatosNoClose] = useState([])
  const [datosPendientes, setDatosPendientes] = useState([])
  const [Loading, setloading] = useState(false)
  const [opcion, setOpcion] = useState<number>(1)

  const handleClickRow = (e: any, item: any) => {
    e.preventDefault()

    item.teacherCode = get(TEACHERCODE)

    // TODO: Guardar en storage nombre del usuario de la sesion ("DUEÑO")
    set(DUENO_SESSION, 'RVI')

    // TODO: mandar asistencia = 1
    set(ASISTENCIA, 1)

    set(CLASS_SELECTED_SOL_MARCACION, JSON.stringify(item))
    Router.push('/solicitud-de-marcacion/AsistenciaSolicitud')
  }

  const formatedData = (obj: any, setstate: any) => {
    let items = obj.map((item: any, index: number) => {
      const dateSplit = item.hoursIni.split('T')
      const date = `${dateSplit[0]} ${dateSplit[1]}`
      item.hoursIni = date
      return item
    })

    items = obj.map((item: any, index: number) => {
      const dateSplit = item.hoursEnd.split('T')
      const date = `${dateSplit[0]} ${dateSplit[1]}`
      item.hoursEnd = date
      return item
    })

    const rows = items.map((item: any, index: number) => ({
      ...item,
      select: (
        <Anchor
          href=""
          onClick={(e) => handleClickRow(e, item)}
          classname="text-decoration-none text-center w-100 d-block"
        >
          Seleccionar
        </Anchor>
      ),
    }))

    setstate(rows)
  }

  useEffect(() => {
    setloading(true)

    const teacherCode = 'N00011885'

    set(TEACHERCODE, teacherCode)

    const consultaApi = async () => {
      try {
        const respApi: any = await axiosfetchPublic(
          `/solicitud-de-marcacion/list/${teacherCode}`
        )

        const { noinit, noClose, pending } = respApi.data

        set(LIST_SESION_SOL, JSON.stringify(respApi.data))

        formatedData(noinit, setDatosNoInit)
        formatedData(noClose, setDatosNoClose)
        formatedData(pending, setDatosPendientes)

        setloading(false)
      } catch (error) {
        console.log(error)
        setloading(false)
      }
    }
    consultaApi()
  }, [])

  const COLUMNS_SESIONES = [
    { label: 'Seleccionar clase', field: 'select', sort: 'asc' },
    { label: 'Sede', field: 'SedCode', sort: 'asc' },
    { label: 'Semestre', field: 'SemCode', sort: 'asc' },
    { label: 'Clase', field: 'ClaCode', sort: 'asc' },
    { label: 'Aula', field: 'ClassRoomCode', sort: 'asc' },
    { label: 'Carrera', field: 'CarName', sort: 'asc' },
    { label: 'Curso', field: 'CurName', sort: 'asc' },
    { label: 'Fecha', field: 'HoursDate', sort: 'asc' },
    { label: 'Nro Día', field: 'CoclNrDay', sort: 'asc' },
    { label: 'Día', field: 'HourDayWeek', sort: 'asc' },
    { label: 'Hora de Inicio', field: 'hoursIni', sort: 'asc' },
    { label: 'Hora Final', field: 'hoursEnd', sort: 'asc' },
    { label: 'Tipo Docente', field: 'CoclTypeTeacher', sort: 'asc' },
  ]

  const COLUMNS_PENDIENTES = [
    { label: 'Seleccionar clase', field: 'select', sort: 'asc' },
    { label: 'Sede', field: 'SedCode', sort: 'asc' },
    { label: 'Semestre', field: 'SemCode', sort: 'asc' },
    { label: 'Clase', field: 'ClaCode', sort: 'asc' },
    { label: 'Aula', field: 'ClassRoomCode', sort: 'asc' },
    { label: 'Carrera', field: 'CarName', sort: 'asc' },
    { label: 'Curso', field: 'CurName', sort: 'asc' },
    { label: 'Fecha', field: 'HoursDate', sort: 'asc' },
    { label: 'Nro Día', field: 'CoclNrDay', sort: 'asc' },
    { label: 'Día', field: 'HourDayWeek', sort: 'asc' },
    { label: 'Hora de Inicio', field: 'hoursIni', sort: 'asc' },
    { label: 'Hora Final', field: 'hoursEnd', sort: 'asc' },
    { label: 'Tipo Docente', field: 'CoclTypeTeacher', sort: 'asc' },
  ]

  return (
    <div className={styles.contenido}>
      <Loader loading={Loading} />
      <div className={styles.content}>
        <div className={styles.titulo}>
          <Label classname="text-warning h5 mt-3 mb-3">
            Solicitud de Marcación
          </Label>
        </div>
        <hr />

        <div className={styles.alertaContent}>
          <Alerta
            classname="w-100"
            variant="info"
          >
            <div className="mb-0">
              <b>Nota:</b>
              <br />
              <ul>
                <li>
                  Usted sólo podrá registrar una solicitud de marcación para
                  aquellas sesiones de clase que{' '}
                  <b>no pudo iniciar y/o cerrar en los últimos 7 días.</b>
                </li>
                <li>
                  Una vez registrada la solicitud de marcación, esta se enviará
                  a los Coordinadores y Directores de carrera para su{' '}
                  <b>aprobación.</b>
                </li>
                <li>
                  Usted podrá hacer seguimiento a las solicitudes de marcación
                  enviadas, en la opción <b>Estado de Solicitudes.</b>
                </li>
                <li>
                  Usted podrá visualizar las sesiones de clase aprobadas en la
                  sección{' '}
                  <b>
                    <Anchor
                      href="/"
                      classname="text-info text-decoration-none"
                    >
                      Sesiones Anteriores.
                    </Anchor>
                  </b>
                </li>
              </ul>
            </div>
          </Alerta>
        </div>

        <div className={styles.rowButtons}>
          <SolMarcaButtons setOpcion={setOpcion} />
        </div>

        <hr />

        <div className={styles.tabla}>
          {opcion === 1 && (
            <TableDinamic
              columns={COLUMNS_SESIONES}
              listData={datosNoInit}
            />
          )}
          {opcion === 2 && (
            <TableDinamic
              columns={COLUMNS_SESIONES}
              listData={datosNoClose}
            />
          )}

          {opcion === 3 && (
            <TableDinamic
              columns={COLUMNS_PENDIENTES}
              listData={datosPendientes}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default SolicitudMarcacion
