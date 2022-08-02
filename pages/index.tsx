import Router from 'next/router'
import Alerta from '../components/UI/atoms/alert/Alerts'
import Label from '../components/UI/atoms/label/Label'
import Button from '../components/UI/atoms/button/Button'
import Anchor from '../components/UI/atoms/anchor/Anchor'
import styles from './../components/templates/default/Default.module.scss'
import { /* axiosfetchPublic, */ axiosfetchPrivate } from './../config/axios'
import Loader from '../components/UI/atoms/loader/Loader'
// import getAlert from '../hooks/jspdf/alertify'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { set, remove } from 'local-storage'

const TableDinamic = dynamic(
  () => import('../components/UI/molecules/tableDinamic/Table'),
  {
    ssr: false,
  }
)

const COLUMNS = [
  { label: 'Seleccionar clase', field: 'Iniciar', sort: 'asc' },
  { label: 'Sede', field: 'SedeCode', sort: 'asc' },
  { label: 'Semestre', field: 'SemesterCode', sort: 'asc' },
  { label: 'Cód. curso', field: 'cursoCode', sort: 'asc' },
  { label: 'Curso', field: 'cursoName', sort: 'asc' },
  { label: 'Clase', field: 'ClassCodigo', sort: 'asc' },
  { label: 'Hora de Inicio', field: 'hourIni', sort: 'asc' },
  { label: 'Hora Final', field: 'hourEnd', sort: 'asc' },
  { label: 'Carrera', field: 'CarreraName', sort: 'asc' },
  { label: 'Tipo doc.', field: 'cileCode', sort: 'asc' },
]
const COLUMNS2 = [
  { label: 'Click', field: 'Iniciar', sort: 'asc' },
  { label: 'Nro. solicitud', field: 'solRecuperationId', sort: 'asc' },
  { label: 'Sede', field: 'sedeCode', sort: 'asc' },
  { label: 'Semestre', field: 'semesterCode', sort: 'asc' },
  { label: 'Cód. curso', field: 'cursoCode', sort: 'asc' },
  { label: 'Curso', field: 'cursoName', sort: 'asc' },
  { label: 'Clase', field: 'classCode', sort: 'asc' },
  { label: 'Fecha Perdida', field: 'recuperationDateLost', sort: 'asc' },
  { label: 'Hora de Inicio', field: 'hourIni', sort: 'asc' },
  { label: 'Hora Final', field: 'hourEnd', sort: 'asc' },
  { label: 'Carrera', field: 'carreraName', sort: 'asc' },
  { label: 'Tipo doc.', field: 'typeTeacher', sort: 'asc' },
]

const Index = ({ data }: any) => {
  const initialStateByDay = [
    {
      CarreraName: '',
      ClassCodigo: '',
      SedeCode: '',
      SemesterCode: '',
      aulaCode: '',
      bdOrigen: '',
      cileCode: '',
      cursoCode: '',
      cursoName: '',
      hourEnd: '',
      hourIni: '',
      hourMinutes: '',
    },
  ]

  const initialStateRecover = [
    {
      recuperationId: 45317,
      solRecuperationId: '34540',
      sedeCode: 'TML',
      semesterCode: '222413',
      classCode: '22241322813',
      typeTeacher: 'P',
      cursoCode: 'AUDI1501',
      cursoName: 'AUDITORIA ADMINISTRATIVA',
      carreraName: 'Administración',
      recuperationDateLost: '6/29/2022 12:00:00 AM',
      hourIni: '6/27/2022 7:30:00 PM',
      hourEnd: '6/27/2022 10:40:00 PM',
      semCronoCodigo: '2022-1',
      indicador: '0',
    },
  ]

  const [datosByDay, setDatosByDay] = useState(initialStateByDay)
  const [Loading, setloading] = useState(false)
  const [datosRecover, setDatosRecover] = useState(initialStateRecover)

  useEffect(() => {
    remove('recoverSelect')
    const obj = {
      title: 'Portal de Docentes',
      text: 'Lo sentimos, por mantenimiento el registro de notas sólo se puede acceder dentro del campus UPN.',
      confirmButtonText: `Ok`,
    }
    const rows = data.byDay.detail?.map((item: any, index: number) => ({
      ...item,
      Iniciar: LinkButton(item, obj),
      // hourIni: convertStringToDateTime(item.hourIni),
      // hourEnd: convertStringToDateTime(item.hourEnd),
    }))
    setDatosByDay(rows)
    const obj2 = {
      title: 'Portal de Docentes',
      text: 'No se encontraron sesiones programadas para el día de hoy o la sesión de clase ya fue iniciada.',
      confirmButtonText: `Ok`,
    }
    const rows2 = data.recover.detail?.map((item: any, index: number) => ({
      ...item,
      Iniciar: LinkButton(item, obj2),
      hourIni: convertStringToDateTime(item.hourIni),
      hourEnd: convertStringToDateTime(item.hourEnd),
      recuperationDateLost: convertStringToDate(item.recuperationDateLost),
    }))
    setDatosRecover(rows2)

    // if Session("ValRegNo"){
    //   if Session("ValRegNo") = 2 {
    //     ShowMessageAlert("Lo sentimos, por mantenimiento el registro de notas sólo se puede acceder dentro del campus UPN.")
    //   }
    // }else{
    //   if gvProgramadas.Rows.Count = 0 {
    //     lblTipoDocente.Visible = False
    //     ShowMessageAlert("No se encontraron sesiones programadas para el día de hoy o la sesión de clase ya fue iniciada.")
    //   }
    // }else{
    //     lblTipoDocente.Visible = True
    //     if gvRecuperacion.Rows.Count > 0 {
    //       lblRecuperacion.Visible = True
    //     }
    // }
    // getAlert(obj)
    // setDatosByDay(data.byDay.detail)

    /*  const getApiPublic = async () => {
      const resp = await axiosfetchPublic('/forToday/list/N00011107/3')
      console.log(resp)
    }
    getApiPublic() 
  */
  }, [])
  const convertStringToDateTime = (data: any) => {
    const date = new Date(data)
    return date.toLocaleTimeString()
  }
  const convertStringToDate = (data: any) => {
    const date = new Date(data)
    const fechaHora = `
      ${String(date.getDate()).padStart(2, '0')}/${String(
      date.getMonth() + 1
    ).padStart(2, '0')}/${date.getFullYear()}`
    return fechaHora
  }
  const LinkButton = (row: any, obj: any) => {
    return (
      <Button
        type="button"
        onclick={() => linkRedirect(row)}
        classname="text-decoration-none text-warning"
      >
        {/* <Anchor
          href="/registro-asistencia"
          classname="text-decoration-none"
        >
          Iniciar sesión
        </Anchor> */}
        Iniciar sesión
      </Button>
    )
  }
  const linkRedirect = (row: any) => {
    setloading(true)
    set('recoverSelect', row)
    Router.push('./registro-asistencia')
  }
  return (
    <div className={styles.contenido}>
      <Loader loading={Loading} />
      <div className={styles.content}>
        <div className={styles.titulo}>
          <Label classname="text-warning h5 mt-3 mb-3">Página Principal</Label>
        </div>
        <hr />

        <div className={styles.alertContent}>
          <Alerta
            classname="w-100"
            variant="info"
          >
            <p className="mb-0">
              <b>Nota:</b> Tenga en cuenta que una vez iniciada la sesión de
              clase esta únicamente estará visible en la sección{' '}
              <b className="text-primary">Sesiones Abiertas.</b>
            </p>
          </Alerta>
        </div>

        <div className={styles.contentButonTitle}>
          <div>
            <h2>COMANEI 2018</h2>
            <div>
              <Button
                type="button"
                variant="info"
                size="medium"
                classname="text-white"
              >
                Ver conferencia en vivo
              </Button>
            </div>
          </div>

          <div>
            <strong>
              <span>
                Sesiones programadas para HOY: MIÉRCOLES, 22 DE JUNIO DE 2022
              </span>
            </strong>
          </div>
        </div>

        <hr />
        <div className={styles.tablas}>
          <TableDinamic
            columns={COLUMNS}
            listData={datosByDay}
          />
          {/* <Tabla>
            <Thead>
              <th scope="col">Seleccionar clase</th>
              <th scope="col">Sede</th>
              <th scope="col">Semestre</th>
              <th scope="col">Cód. curso </th>
              <th scope="col">Curso</th>
              <th scope="col">Clase</th>
              <th scope="col">Hora de Inicio</th>
              <th scope="col">Hora Final</th>
              <th scope="col">Carrera</th>
              <th scope="col">Tipo doc.</th>
            </Thead>
            <Tbody>
              {datosByDay.map((item: any, index: number) => (
                <tr key={index}>
                  <td>
                    <b>
                      <Anchor
                        href=""
                        classname="text-decoration-none text-warning"
                      >
                        Iniciar sesión
                      </Anchor>
                    </b>
                  </td>
                  <td>{item.SedeCode}</td>
                  <td>{item.SemesterCode}</td>
                  <td>{item.cursoCode}</td>
                  <td>{item.cursoName}</td>
                  <td>{item.ClassCodigo}</td>
                  <td>{item.hourIni}</td>
                  <td>{item.hourEnd}</td>
                  <td>{item.CarreraName}</td>
                  <td>{item.cileCode}</td>
                </tr>
              ))}
            </Tbody>
          </Tabla> */}
        </div>

        <div className={styles.tablas}>
          <TableDinamic
            columns={COLUMNS2}
            listData={datosRecover}
          />
          {/* <Tabla>
            <Thead>
              <th scope="col">Click</th>
              <th scope="col">Nro. solicitud</th>
              <th scope="col">Sede</th>
              <th scope="col">Semestre</th>
              <th scope="col">Cód. curso </th>
              <th scope="col">Curso</th>
              <th scope="col">Clase</th>
              <th scope="col">Fecha Perdida</th>
              <th scope="col">Hora de Inicio</th>
              <th scope="col">Hora Final</th>
              <th scope="col">Carrera</th>
              <th scope="col">Tipo doc.</th>
            </Thead>
            <Tbody>
              {datosRecover.map((item: any, index: number) => (
                <tr key={index}>
                  <td>
                    <b>
                      <Anchor
                        href=""
                        classname="text-decoration-none text-warning"
                      >
                        Iniciar sesión
                      </Anchor>
                    </b>
                  </td>
                  <td>{item.solRecuperationId}</td>
                  <td>{item.sedeCode}</td>
                  <td>{item.semesterCode}</td>
                  <td>{item.cursoCode}</td>
                  <td>{item.cursoName}</td>
                  <td>{item.classCode}</td>
                  <td>{item.recuperationDateLost}</td>
                  <td>{item.hourIni}</td>
                  <td>{item.hourEnd}</td>
                  <td>{item.carreraName}</td>
                  <td>{item.typeTeacher}</td>
                </tr>
              ))}
            </Tbody>
          </Tabla> */}
        </div>

        <div className={`${styles.comment} mt-3`}>
          <small>
            <span id="cphSite_lblTipoDocente">
              <strong>Tipo docente: (P)</strong> Principal /{' '}
              <strong>(S)</strong> Sustituto / <strong>(A)</strong> Auxiliar
            </span>
          </small>
          <small>
            <div className="mb-2">
              <p className="m-0">
                ¿Tiene sesiones de clase abiertas y necesita finalizarlas?
              </p>
              <Anchor
                classname="text-decoration-none text-warning"
                href="SesionAb"
              >
                Finalizar mis sesiones de clase abiertas.
              </Anchor>
            </div>
            <div className="mb-2">
              <p className="m-0">
                ¿Ingresó TODAS sus notas y desea ENVIARLAS a Secretaría
                Académica?
              </p>
              <Anchor
                classname="text-decoration-none text-warning"
                href="EnvNotasSel"
              >
                Enviar mis notas a Secretaría Académica
              </Anchor>
            </div>
            <p className="">
              Mayor información en los manuales de la opción Ayuda del sistema.
            </p>
          </small>
        </div>
      </div>
    </div>
  )
}

export default Index

export async function getServerSideProps(context: any) {
  const { query } = context

  const { codeTeacher, hourDay } = query

  // * '/ClassSchedule/GetSessionTeacherByDay/N00011107/3'
  try {
    const byDay = await axiosfetchPrivate(
      `/ClassSchedule/GetSessionTeacherByDay/${codeTeacher}/${hourDay}`
    )

    const recover = await axiosfetchPrivate(
      `/ClassSchedule/GetSessionTeacherRecuperation/${codeTeacher}/2022-07-26 `
    )
    const competence = await axiosfetchPrivate(
      `/Competence/GetPendingTeachingCompetence/${codeTeacher}`
    )
    /*  const obj = {
      userCode: codeTeacher,
      semesterCode: '2022-1',
    } */
    const coupling = await axiosfetchPrivate.post(`token/updateLogCoupling`)

    const data = {
      byDay: byDay.data,
      recover: recover.data,
      competence: competence.data,
      coupling: coupling.data,
    }

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
