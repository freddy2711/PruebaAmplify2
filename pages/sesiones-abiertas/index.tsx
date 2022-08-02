import Router from 'next/router'
import { useEffect, useState } from 'react'
// import Alerta from '../../components/UI/atoms/alert/Alerts'
import Anchor from '../../components/UI/atoms/anchor/Anchor'
import Label from '../../components/UI/atoms/label/Label'
import Button from '../../components/UI/atoms/button/Button'
import styles from '../../components/templates/sesiones/abiertas/Abiertas.module.scss'
import { set } from 'local-storage'
import Loader from '../../components/UI/atoms/loader/Loader'
import { apiSeccionOpen } from '../api/index'
import dynamic from 'next/dynamic'

const TableDinamic = dynamic(
  () => import('../../components/UI/molecules/tableDinamic/Table'),
  {
    ssr: false,
  }
)

const Alerta = dynamic(() => import('../../components/UI/atoms/alert/Alerts'), {
  ssr: false,
})
const COLUMNS = [
  { label: 'Seleccionar clase', field: 'Iniciar', sort: 'asc' },
  { label: 'Clase', field: 'classCode', sort: 'asc' },
  { label: 'Curso', field: 'codeGrade', sort: 'asc' },
  { label: 'Carrera', field: 'nameRace', sort: 'asc' },
  { label: 'Tipo doc.', field: 'typeTeacher', sort: 'asc' },
  { label: 'Tipo de sesión', field: 'typeClass', sort: 'asc' },
  { label: 'Fecha/Hora de inicio', field: 'classInit', sort: 'asc' },
  { label: 'Fecha/Hora de término', field: 'classEnd', sort: 'asc' },
]

const SesionesAbiertas = () => {
  const initialStateSeccionOpen = [
    {
      classControl: 0,
      classCode: 0,
      coclDate: 0,
      typeClass: 0,
      classInit: 0,
      classEnd: 0,
      codeGrade: 0,
      nameRace: 0,
      typeTeacher: 0,
      nameTeacher: 0,
      classInit_Out: 0,
      classEnd_Out: 0,
    },
  ]
  const [seccionOpen, setSeccionOpen] = useState(initialStateSeccionOpen)
  const [Loading, setloading] = useState(false)
  // const dataRecover: any = get('dataUser')

  const fetchSeccionOpen = async (codeUser: any) => {
    const resp = await apiSeccionOpen.BySeccionOpen(codeUser)

    const obj = {
      title: 'Portal de Docentes',
      text: 'Lo sentimos, por mantenimiento el registro de notas sólo se puede acceder dentro del campus UPN.',
      confirmButtonText: `Ok`,
    }
    const rows = resp?.map((item: any, index: number) => ({
      ...item,
      classEnd: item.classEnd !== null ? '0' : item.classEnd,
      Iniciar: LinkButton(item, obj),
      // hourIni: convertStringToDateTime(item.hourIni),
      // hourEnd: convertStringToDateTime(item.hourEnd),
    }))

    setSeccionOpen(rows)
    setloading(false)
  }
  useEffect(() => {
    setloading(true)
    fetchSeccionOpen('N00011885')
  }, [])

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
        Registrar asistencia
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
          <Label classname="text-warning h5 mt-3 mb-3">Sesiones Abiertas</Label>
        </div>
        <hr />

        <div className={styles.alertaContent}>
          <Alerta
            classname="w-100"
            variant="info"
          >
            <p className="mb-0">
              <b>Nota:</b> &nbsp; Las clases abiertas tendrán 15 minutos
              adicionales sobre la hora programada para que puedan ser cerradas
              con normalidad, de lo contrario tendrá que regularizarla, desde la
              sección &nbsp;
              <b>
                <Anchor
                  href="/"
                  classname="text-info text-decoration-none"
                >
                  Solicitud de Marcación.
                </Anchor>
              </b>
            </p>
          </Alerta>
        </div>

        <hr />

        <div className={styles.tabla}>
          <TableDinamic
            columns={COLUMNS}
            listData={seccionOpen}
          />
          {/* <Tabla>
            <Thead>
              <th scope="col">Seleccionar clase</th>
              <th scope="col">Clase</th>
              <th scope="col">Curso</th>
              <th scope="col">Carrera</th>
              <th scope="col">Tipo Doc.</th>
              <th scope="col">Tipo de sesión</th>
              <th scope="col">Fecha/Hora de inicio</th>
              <th scope="col">Fecha/Hora de término</th>
            </Thead>
            <Tbody>
              <tr>
                <td>.</td>
                <td>.</td>
                <td>.</td>
                <td>.</td>
                <td></td>
                <td>.</td>
                <td>.</td>
                <td>.</td>
              </tr>
            </Tbody>
          </Tabla> */}
        </div>
      </div>
    </div>
  )
}

export default SesionesAbiertas
