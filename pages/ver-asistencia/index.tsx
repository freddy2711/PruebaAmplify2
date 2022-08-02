import Alerta from '../../components/UI/atoms/alert/Alerts'
import Button from '../../components/UI/atoms/button/Button'
// import Anchor from '../components/UI/atoms/anchor/Anchor'
import Label from '../../components/UI/atoms/label/Label'
import BotonesAsistencia from '../../components/UI/molecules/asistencia/BotonesAsistencia'
import Tbody from '../../components/UI/molecules/table/tbody/Tbody'
import Thead from '../../components/UI/molecules/table/thead/Thead'
import Tabla from '../../components/UI/organisms/table/Tabla'
import styles from '../../components/templates/asistencia/ver/VerAsistencia.module.scss'

const VerAsistencias = () => {
  return (
    <div className={styles.contenido}>
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
              <b>Nota:</b> &nbsp;Por defecto todos los alumnos no registran
              ningún estado de asistencia <b>(Asistencia = N)</b>. En listados
              grandes, ir grabando cada cierto tiempo.
            </p>
          </Alerta>
        </div>

        <div>
          <small>
            <strong>Indique: (A)</strong> Asistió / <strong>(T)</strong> Tardó /{' '}
            <strong>(F)</strong> Faltó.
          </small>
        </div>

        <hr />

        <div className={styles.tabla}>
          <Tabla>
            <Thead>
              <th scope="col">Asistencia</th>
              <th scope="col">Cód. alumno</th>
              <th scope="col">Ap. paterno</th>
              <th scope="col">Ap. materno</th>
              <th scope="col">Nombres</th>
              <th scope="col">Carrera</th>
              <th scope="col">Vez</th>
              <th scope="col">Clase</th>
              <th scope="col">Faltas</th>
              <th scope="col">Estado</th>
              <th scope="col">Tipo Clase</th>
            </Thead>
            <Tbody>
              <tr>
                <td>
                  <BotonesAsistencia />
                </td>
                <td>N00267181</td>
                <td>CABANILLAS</td>
                <td>SANCHEZ</td>
                <td>ANA LAURA</td>
                <td>Adm. y Gestión Comercial </td>
                <td>1</td>
                <td>2225136111</td>
                <td>0</td>
                <td>-</td>
                <td>RM</td>
              </tr>
            </Tbody>
          </Tabla>
        </div>

        <div className={styles.botones}>
          <div>
            <Button
              type="button"
              variant="primary"
            >
              Guardar Registro
            </Button>
          </div>
          <div>
            <Button
              type="button"
              variant="secondary"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerAsistencias
