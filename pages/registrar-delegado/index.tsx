import { useState, useEffect } from 'react'
import { axiosfetchPrivate } from './../../config/axios'
import Anchor from '../../components/UI/atoms/anchor/Anchor'
import Label from '../../components/UI/atoms/label/Label'
import styles from '../../components/templates/delegado/Delegado.module.scss'
import dynamic from 'next/dynamic'
import Loader from '../../components/UI/atoms/loader/Loader'
import { apiDelegado } from '../api/'
import moment from 'moment'
import Button from '../../components/UI/atoms/button/Button'
import Swal from 'sweetalert2'
import useCheckDelegate from '../../hooks/useCheckDelegate'

const Alerta = dynamic(() => import('../../components/UI/atoms/alert/Alerts'), {
  ssr: false,
})

const TableDinamic = dynamic(
  () => import('../../components/UI/molecules/tableDinamic/Table'),
  {
    ssr: false,
  }
)
let listaNueva: any = []

const cantDelegadoPermitido = 1

const Delegado = ({ data }: any) => {
  const [datos, setDatos] = useState([])
  const [Loading, setloading] = useState(false)
  const [classCode, setClassCode] = useState('')
  const [Alumnos, setAlumnos] = useState([])
  const { delegados, setdelegados } = useCheckDelegate()
  const [elegido, setElegido] = useState<string>('')

  useEffect(() => {
    const items = data.detail.map((item: any, index: number) => {
      const date = new Date(item.StartDateOfClass)
      const fechaIni = moment(date).format('l')
      item.StartDateOfClass = fechaIni
      return item
    })

    const rows = items.map((item: any, index: number) => ({
      ...item,
      select: (
        <Anchor
          href="#"
          onClick={(e) =>
            handleClickRow(
              e,
              item.ClassCode,
              item.TypeOfDocument,
              item.StartDateOfClass
            )
          }
          classname="text-decoration-none text-center w-100 d-block"
        >
          Seleccionar
        </Anchor>
      ),
    }))

    setDatos(rows)
  }, [])

  const checkDelegado = (e: any, item: any, codClass: string) => {
    const checked = e.target.checked

    if (checked) {
      listaNueva.push(item)
      setdelegados(listaNueva)
    } else {
      const nuevaLista = listaNueva.filter((i: any) => i.code !== item.code)
      listaNueva = nuevaLista
      setdelegados(nuevaLista)
      console.log(codClass)
      if (item.state === true) {
        deleteDelegate(item.code, codClass)
      }
    }
  }

  const delegateselected = (item: any) => {
    const { delegateId, state } = item

    if (typeof delegateId !== 'object' && delegateId !== '') {
      if (typeof state !== 'object' && state !== '' && state === true) {
        setElegido(`${item.Name} ${item.firstName} ${item.lastName}`)
        listaNueva.push(item)

        setdelegados(listaNueva)
        return true
      }
    }

    return false
  }

  const handleSave = async () => {
    if (delegados.length > cantDelegadoPermitido) {
      Swal.fire({
        title: 'Portal de Docentes',
        text: `Solo se permite el registro de ${cantDelegadoPermitido} delegado.`,
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      })
      return
    }

    if (!delegados[0]?.code.trim() || delegados.length < 1) {
      Swal.fire({
        title: 'Portal de Docentes',
        text: `Por favor seleccione al menos un alumno para delegado.`,
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      })
      return
    }

    const alumno = delegados[0]
    try {
      setloading(true)
      const xmldata = `
        <registro>
          <delegado 
            s_alu_codigo='${alumno.code}' 
            s_cla_codigo='${classCode}' 
            b_estado='1' 
            audit_usuario='POOL' />
        </registro>`

      const resp = await apiDelegado.createDelegate(classCode, xmldata)
      if (resp?.Status === true) {
        Swal.fire({
          title: 'Portal de Docentes',
          text: `El Registro del delegado de la clase se ha guardado con éxito.`,
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        })

        setElegido(`${alumno.Name} ${alumno.firstName} ${alumno.lastName}`)
        ListarAlumnos(classCode)
        setloading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteDelegate = async (codeAlumno: string, codclase: string) => {
    try {
      setloading(true)
      const xmldata = `
        <registro>
          <delegado 
            s_alu_codigo='${codeAlumno}' 
            s_cla_codigo='${codclase}' 
            b_estado='0' 
            audit_usuario='POOL' />
        </registro>
    `
      const resp = await apiDelegado.deleteDelegate(codclase, xmldata)
      if (resp?.Status === true) {
        setloading(false)
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: 'Portal de Docentes',
        text: `Hubo un error.`,
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      })
      setloading(false)
    }
  }

  const handleCancelar = () => {
    console.log('Fn Cancelar')
    setClassCode('')
    setAlumnos([])
    setdelegados([])
    setElegido('')
    listaNueva = []
  }

  const handleClickRow = async (
    e: any,
    classcode: string,
    tipoDoc: string,
    fechaIni: string
  ) => {
    e.preventDefault()

    if (fechaIni === 'NO') {
      Swal.fire({
        title: 'Portal de Docentes',
        text: `No puede realizar el registro de delegados por que la clase aún inicia el ${fechaIni}.`,
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      })
      return
    }

    const dateIni = moment(new Date(fechaIni), 'YYYY-MM-DD')
    const today = moment(new Date(), 'YYYY-MM-DD')

    if (dateIni >= today) {
      Swal.fire({
        title: 'Portal de Docentes',
        text: `No puede realizar el registro de delegados por que la clase aún inicia el ${dateIni}.`,
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      })
      return
    }

    // llamado a api
    try {
      setloading(true)
      setClassCode(classcode)

      ListarAlumnos(classcode)
    } catch (error) {
      console.log('error', error)
      setloading(false)
    }
  }

  const ListarAlumnos = async (classcode: string) => {
    setAlumnos([])
    setdelegados([])
    setElegido('')
    listaNueva = []

    const result = await apiDelegado.listByClass(classcode)
    const listaDelegados = result?.data

    if (listaDelegados) {
      setloading(false)

      const codClass = classcode

      const listaDelegadosSinDatos = listaDelegados.map(
        (item: any, index: number) => {
          if (item.state !== true) {
            item.emailUPN = ''
            item.Email = ''
            item.cellMovil = ''
          }

          return item
        }
      )

      const rows = listaDelegadosSinDatos.map((item: any, index: number) => ({
        ...item,
        select: (
          <input
            key={index}
            type="checkbox"
            onChange={(e) => checkDelegado(e, item, codClass)}
            className="text-decoration-none text-center w-100 d-block"
            name="checkDelegado"
            id="checkDelegado"
            value={JSON.stringify(item)}
            defaultChecked={delegateselected(item)}
          />
        ),
      }))

      setAlumnos(rows)
    }
  }

  const COLUMNS = [
    { label: 'Seleccionar', field: 'select', sort: 'asc' },
    { label: 'Semestre', field: 'SemesterCode', sort: 'asc' },
    { label: 'Sede', field: 'PlaceCode', sort: 'asc' },
    { label: 'Clase', field: 'ClassCode', sort: 'asc' },
    {
      label: 'Fecha de inicio',
      field: 'StartDateOfClass',
      sort: 'asc',
    },
    { label: 'Tipo Doc.', field: 'TypeOfDocument', sort: 'asc' },
    { label: 'Cód. curso', field: 'CodeCourse', sort: 'asc' },
    { label: 'Nombre del curso', field: 'NameCourse', sort: 'asc' },
  ]

  const COLUMNSDELEGADO = [
    { label: 'Seleccionar', field: 'select', sort: 'asc' },
    { label: 'Cód. alumno', field: 'code', sort: 'asc' },
    { label: 'Ap. paterno', field: 'firstName', sort: 'asc' },
    { label: 'Ap. materno', field: 'lastName', sort: 'asc' },
    { label: 'Nombres', field: 'Name', sort: 'asc' },
    { label: 'Vez', field: 'madeNroVeces', sort: 'asc' },
    { label: 'Clase', field: 'classCode', sort: 'asc' },
    { label: 'Estado', field: 'madeEstate', sort: 'asc' },
    { label: 'Email UPN', field: 'emailUPN', sort: 'asc' },
    { label: 'Email Personal', field: 'Email', sort: 'asc' },
    { label: 'Celular', field: 'cellMovil', sort: 'asc' },
  ]

  return (
    <div className={styles.contenido}>
      <Loader loading={Loading} />
      <div className={styles.content}>
        <div className={styles.titulo}>
          <Label classname="text-warning h5 mt-3 mb-3">
            Registrar Delegado
          </Label>
        </div>
        <hr />
        {Alumnos.length > 0 ? (
          <>
            <div className={styles.delegadoContent}>
              <p>
                <b>Delegado: </b> {elegido}
              </p>
            </div>

            <hr />

            <div className={styles.tabla}>
              <TableDinamic
                columns={COLUMNSDELEGADO}
                listData={Alumnos}
              />
            </div>
            <div className="d-flex justify-content-center gap-4">
              <Button
                type="button"
                variant="primary"
                onclick={handleSave}
              >
                Guardar
              </Button>

              <Button
                type="button"
                variant="secondary"
                onclick={handleCancelar}
              >
                Cancelar
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.alertaContent}>
              <Alerta
                classname="w-100"
                variant="info"
              >
                <p className="mb-0">
                  <b>Nota:</b> &nbsp;Seleccione una clase para registrar su
                  delegado.
                </p>
              </Alerta>
            </div>

            <hr />

            <div className={styles.tabla}>
              <TableDinamic
                columns={COLUMNS}
                listData={datos}
              />
            </div>

            <div>
              <small>
                <strong>Tipo docente: (P)</strong> Principal /{' '}
                <strong>(S)</strong> Sustituto / <strong>(A)</strong> Auxiliar
              </small>
              <br />
              <small>
                <span id="cphSite_lblTipoClase">
                  <strong>Tipo Clase: (PR)</strong> Presencial /{' '}
                  <strong>(VT)</strong> Virtual
                </span>
              </small>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Delegado

export async function getServerSideProps(context: any) {
  const { query } = context

  console.log('query', query)

  try {
    const obj = {
      teacherCode: 'N00327842',
      isEpec: 0,
    }

    const { data } = await axiosfetchPrivate(
      `/Attendance/GetDelegateRegisterByClass/${obj.teacherCode}`
    )
    return {
      props: { data },
    }
  } catch (error) {}
}
