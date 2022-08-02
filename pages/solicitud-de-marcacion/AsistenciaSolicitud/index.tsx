import { useEffect, useState, Fragment } from 'react'
import Button from '../../../components/UI/atoms/button/Button'
import Label from '../../../components/UI/atoms/label/Label'
import Tbody from '../../../components/UI/molecules/table/tbody/Tbody'
import Thead from '../../../components/UI/molecules/table/thead/Thead'
import Tabla from '../../../components/UI/organisms/table/Tabla'
import Loader from '../../../components/UI/atoms/loader/Loader'
import styles from '../../../components/templates/asistencia/registrar/RegistroAsistencia.module.scss'
import axiosfetchPublic from '../../../config/axios'
import dynamic from 'next/dynamic'
import { get } from 'local-storage'
import Swal from 'sweetalert2'
import moment from 'moment'

import {
  TEACHERCODE,
  CLASS_SELECTED_SOL_MARCACION,
  CONTROL_CLASE_ID,
  ASISTENCIA,
  DUENO_SESSION,
  // DATOS DE PRUEBA
  SET_DUENO_SESSION,
} from './../../../consts/storageConst'
import Select from '../../../components/UI/atoms/select/Select'

const Alerta = dynamic(
  () => import('../../../components/UI/atoms/alert/Alerts'),
  {
    ssr: false,
  }
)

const AsistenciaSolicitud = () => {
  const [datos, setdatos] = useState([])
  const [teacherId, setTeacherId] = useState('')
  const [Loading, setloading] = useState(false)
  const [btnTomarAsistencia, setBtnTomarAsistencia] = useState(true)

  // state para habilitar y deshabilitar botones
  const [disabledBtns, setDisabledBtns] = useState({
    btnActivar: false,
    btnFinSesion: true,
    btnRegresar: false,
  })

  // const [ActivateBtnFinSesion, setActivateBtnFinSesion] = useState(false)  btnFinSesion

  // state para mostrar u ocultar botones
  const [showBtns, setShowBtns] = useState({
    btnActivar: true,
    btnFinSesion: false,
    btnRegresar: false,
  })

  useEffect(() => {
    setloading(true)

    const consultaApi = async () => {
      if (get(CLASS_SELECTED_SOL_MARCACION) !== null) {
        const obj: any = get(CLASS_SELECTED_SOL_MARCACION)
        const item = JSON.parse(obj)

        try {
          const { data } = await axiosfetchPublic.post(
            '/solicitud-de-marcacion/detailClass/',
            item
          )
          const teacherCode: any = get(TEACHERCODE)
          setTeacherId(teacherCode)
          setdatos(data.detail)
        } catch (error) {
          console.log(error)
          setloading(false)
        }
      }
    }

    consultaApi()

    const validaciones = async () => {
      const obj: any = get(CLASS_SELECTED_SOL_MARCACION)
      const item = JSON.parse(obj)

      // TODO: llenar Session("ControlClaseID") ControlClaseID
      const ControlClaseID = get(CONTROL_CLASE_ID) ? get(CONTROL_CLASE_ID) : 0
      console.log(ControlClaseID)

      // TODO: validar si asistencia = 1 then valida tipo de docente
      const Asistencia: string = get(ASISTENCIA)

      if (parseInt(Asistencia) === 1) {
        // TODO: validar tipo de docente solo tipo P puede registrar , los tipo A no!
        console.log(item)
        if (item.CoclTypeTeacher === 'A') {
          // TODO: desactivar boton de tomar asistencia.
          setDisabledBtns({
            btnActivar: true,
            btnFinSesion: true,
            btnRegresar: false,
          })
          // TODO: mostrar mensaje de error
          Swal.fire({
            title: 'Portal de Docentes',
            text: `Los docentes auxiliares no pueden registrar asistencia de alumnos. Ud. solo podrá marcar el término de su sesión de clase.`,
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          })
        } else {
          setDisabledBtns({
            btnActivar: false,
            btnFinSesion: false,
            btnRegresar: false,
          })
        }
      }

      // TODO: validar si el dueño y el user de sesion son el mismo : sDueno <> sUserName Then
      const DUENO = get(DUENO_SESSION)

      if (DUENO !== SET_DUENO_SESSION) {
        // ? Las sesiones de clase solo pueden ser modificadas por el docente" & sDueno
        Swal.fire({
          title: 'Portal de Docentes',
          text: `Las sesiones de clase solo pueden ser modificadas por el docente ${DUENO}`,
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        })

        // TODO: Deshabilitar todos los botones
        //! deshabilitar todos los botones
        /*
          btnActivar.Enabled = False
          btnFinSesion.Enabled = False
          btnRegresar.Enabled = False
          btnGuardar.Enabled = False
          btnCancelar.Enabled = False
        */
      } else {
        // TODO: Deshabilitar todos los botones menos Regresar
        /*
          btnActivar.Enabled = False
          btnFinSesion.Enabled = False
          btnRegresar.Enabled = true
          btnGuardar.Enabled = False
          btnCancelar.Enabled = False
        */
      }

      // * next
      let valasistencias
      // TODO: pa_CHEQUEA_ASISTENCIA_ALUMNO_SOLICITUD validarAsistenciasolicitud
      try {
        const aula = item.ClassRoomCode ? item.ClassRoomCode : 'null'
        const fecha = moment(item.HoursDate, 'DD-MM-YYYY').format('YYYY-MM-DD')

        // * api (aula, ControlClaseID, fecha) TeacherAttendance/VerifyAsistanceStudentSolicitud/{aula}/{ControlClaseID}/{fecha}
        const { data } = await axiosfetchPublic(
          `/solicitud-de-marcacion/cheAsisAlum/${aula}/${ControlClaseID}/${fecha}`
        )
        valasistencias = data
      } catch (error) {
        console.log(error)
      }

      // ? si el resultado del api es = 0
      if (parseInt(valasistencias) === 0) {
        // ? then activa boton enviar asistencia (habilita)
        /*
        btnActivar.Enabled = True
        btnActivar.Visible = True
        btnFinSesion.Enabled = False
        btnFinSesion.Visible = False
        */

        setDisabledBtns({
          btnActivar: false,
          btnFinSesion: true,
          btnRegresar: true,
        })

        setShowBtns({
          btnActivar: true,
          btnFinSesion: false,
          btnRegresar: false,
        })
      }

      // * next

      let PemitirCerrarSesionSinAsistenciaEstudiante

      // TODO: PemitirCerrarSesionSinAsistenciaEstudiante() Valida el cierre sin asistencia ("CIERRE_SIN_ASIST", Session("ClaseID") pa_GET_CLASE_DETALLE
      // TODO: /ClassSchedule/GetParameterByCodeAndClass/{classCode}/{parameterCode}
      console.log('holaaaaaaa')

      try {
        const { data } = await axiosfetchPublic(
          `/solicitud-de-marcacion/getClaseDetalle/${item.ClaCode}/CIERRE_SIN_ASIST`
        )
        PemitirCerrarSesionSinAsistenciaEstudiante = data
      } catch (error) {
        console.log(error)
      }

      console.log('Permitir', PemitirCerrarSesionSinAsistenciaEstudiante)

      // TODO: si el count es mayor a 1 then valida si s_par_valor es igual a 1 si es asi devuelve permitir sino no permite
      if (parseInt(PemitirCerrarSesionSinAsistenciaEstudiante) === 1) {
        setBtnTomarAsistencia(false)
        // btnActivar.Text = "Enviar Solicitud"
      } else {
        // TODO: mostrar modal con mensaje
        Swal.fire({
          title: 'Portal de Docentes',
          text: `El sistema ha detectado que aun no registra la asistencia de los estudiantes`,
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        })
      }

      setloading(false)
    }

    validaciones()
  }, [])

  const handleTomarAsistencia = () => {
    /**
       * TODO: obtiene el valor del select de motivo y 
       * 
       * TODO: valida si no ha seleccionado muentra mensaje que debe seleccionar uno
       * If comentario = motivos(0) Then
            btnActivar.Enabled = True
            ShowMessageAlert("Debe seleccionar un motivo para poder regularizar su marcación")
          Return

       * TODO: sino continua... 
          guarda en storage el motivo como Session("Comentario") = comentario
          next
       * TODO: validarControlClaseID  pa_GET_SESIONES_DOCENTE_SOLICITAR_VALIDAR () 
         TODO: validar si el reultado de la api anteior es 0 

       * TODO: PemitirCerrarSesionSinAsistenciaEstudiante() Valida el cierre sin asistencia ("CIERRE_SIN_ASIST", Session("ClaseID") pa_GET_CLASE_DETALLE

       * TODO: /ClassSchedule/GetParameterByCodeAndClass/{classCode}/{parameterCode}

       * TODO: si el count es mayor a 1 then valida si s_par_valor es igual a 1 si es asi devuelve permitir sino no permite

        If PemitirCerrarSesionSinAsistenciaEstudiante() Then
          *TODO: ver que es el parametro 7 = B o S
          *TODO: obtener Ip 
              iControlClase = cSesion.getInsertaSesion_Solicitud(sClase, Session("UserID"), Session("ControlClaseAula"), Session("ControlClaseNroDia"), Session("TipoDocente"), Session("ControlClaseFecha"), "S", Session("UserName"), comentario, sFechaHoraInicio, sFechaHoraFin, Ip)
              *! Aqui obtengo el ControlClaseID
              Session("ControlClaseID") = iControlClase
              btnFinSesion_Click(sender, e)
          Else
          *TODO: ver que es el parametro 7 = B o S
          *TODO: obtener Ip 
              iControlClase = cSesion.getInsertaSesion_Solicitud(sClase, Session("UserID"), Session("ControlClaseAula"), Session("ControlClaseNroDia"), Session("TipoDocente"), Session("ControlClaseFecha"), "B", Session("UserName"), comentario, sFechaHoraInicio, sFechaHoraFin, Ip)
              *! Aqui obtengo el ControlClaseID
              Session("ControlClaseID") = iControlClase
              mvAsistenciaSolicitud.SetActiveView(vAsistencia)
          End If

          *TODO: ver de donde sale    sControlClaseEstado = Session("ControlClaseEstado")
          pa_GET_INSERTA_SESION_SOLICITUD

          RegAsistenciaDS.SelectParameters("N_CONTROL_CLASE_ID").DefaultValue = iControlClase

          pa_ASISTENCIA_PLANILLA /TeacherAttendance/GetPayrollAssistance/4468100 este sp llena la tabla de asistencias.
       */
  }

  const handleMotivo = (e: any) => {
    console.log(e.target.value)
  }

  return (
    <div className={styles.contenido}>
      <Loader loading={Loading} />
      <div className={styles.content}>
        <div className={styles.titulo}>
          <Label classname="text-warning h5 mt-3 mb-3">
            Registro de asistencia
          </Label>
        </div>
        <hr />

        <div className={styles.alertaContent}>
          <Alerta
            classname="w-100"
            variant="info"
          >
            <p className="mb-0">
              <b>Nota:</b> &nbsp;Por defecto todos los estudiantes no registran
              ningún estado de asistencia (Asistencia = N). Sólo cuando haya
              registrado la asistencia de los estudiantes se procederá a enviar
              la solicitud.
            </p>
          </Alerta>
        </div>

        <hr />

        <div className={styles.tablaRA}>
          <Tabla classname="tablaRA">
            <Thead>
              <th
                scope="col"
                colSpan={2}
              >
                DATOS DE LA SESIÓN DE CLASE
              </th>
            </Thead>
            <Tbody>
              {datos.map((item: any, index: number) => (
                <Fragment key={index}>
                  <tr>
                    <td className="w-50">Sede</td>
                    <td>{item.SedCode}</td>
                  </tr>
                  <tr>
                    <td>Nombre del curso</td>
                    <td>{item.CurName}</td>
                  </tr>
                  <tr>
                    <td>Clase</td>
                    <td>{item.ClaCode}</td>
                  </tr>
                  <tr>
                    <td>Dueño de la sesión de clase</td>
                    <td>{teacherId}</td>
                  </tr>
                  <tr>
                    <td>Tipo de docente</td>
                    <td>{item.CoclTypeTeacher}</td>
                  </tr>
                  <tr>
                    <td>Tope de faltas</td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>Fecha y hora de inicio</td>
                    <td>{item.hoursIni}</td>
                  </tr>
                  <tr>
                    <td>Fecha y hora de término</td>
                    <td>{item.hoursEnd}</td>
                  </tr>
                  <tr>
                    <td>Tipo de sesión</td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>Motivo</td>
                    <td>
                      <Select
                        id="motivo"
                        classname="w-75"
                        onChange={handleMotivo}
                      >
                        <option value="Seleccione un motivo">
                          Seleccione un motivo
                        </option>
                        <option value="Bloqueo de cuenta de usuario">
                          Bloqueo de cuenta de usuario
                        </option>
                        <option value="Docente nuevo, no contaba con accesos">
                          Docente nuevo, no contaba con accesos
                        </option>
                        <option value="Problemas técnicos del equipo">
                          Problemas técnicos del equipo
                        </option>
                        <option value="Clases fuera de campo">
                          Clases fuera de campo
                        </option>
                        <option value="No estaba programada la clase en el sistema">
                          No estaba programada la clase en el sistema
                        </option>
                        <option value="No había fluido eléctrico">
                          No había fluido eléctrico
                        </option>
                        <option value="Problemas de conectividad">
                          Problemas de conectividad
                        </option>
                        <option value="Regularizar marcación de clase abierta">
                          Regularizar marcación de clase abierta
                        </option>
                      </Select>
                    </td>
                  </tr>
                </Fragment>
              ))}
            </Tbody>
          </Tabla>
        </div>

        <div className={styles.botones}>
          <div>
            {showBtns.btnActivar && (
              <Button
                type="button"
                classname="mx-2"
                variant="primary"
                onclick={handleTomarAsistencia}
                disabled={disabledBtns.btnActivar}
              >
                {btnTomarAsistencia ? 'Tomar asistencia' : 'Enviar Solicitud'}
              </Button>
            )}

            {showBtns.btnFinSesion && (
              <Button
                type="button"
                classname="mx-2"
                variant="primary"
                onclick={handleTomarAsistencia}
                disabled={disabledBtns.btnFinSesion}
              >
                Fin Sesion
              </Button>
            )}

            {showBtns.btnRegresar && (
              <Button
                type="button"
                classname="mx-2"
                variant="secondary"
                onclick={() => {}}
                disabled={disabledBtns.btnRegresar}
              >
                Regresar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AsistenciaSolicitud
