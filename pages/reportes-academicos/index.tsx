import Alerta from '../../components/UI/atoms/alert/Alerts'
import Label from '../../components/UI/atoms/label/Label'
import styles from '../../components/templates/reportes/Reporte.module.scss'
import Tbody from '../../components/UI/molecules/table/tbody/Tbody'
import Thead from '../../components/UI/molecules/table/thead/Thead'
import Tabla from '../../components/UI/organisms/table/Tabla'

const index = () => {
  return (
    <div className={styles.contenido}>
      <div className={styles.content}>
        <div className={styles.titulo}>
          <Label classname="text-warning h5 mt-3 mb-3">Reportes</Label>
        </div>
        <hr />

        <div className={styles.alertaContent}>
          <Alerta
            classname="w-100"
            variant="info"
          >
            <p className="mb-0">
              Para poder visualizar los reportes, primero debe seleccionar una
              clase, haciendo click en el botón {'"Seleccionar"'} ubicado en la
              columna izquierda de los resultados mostrados.
            </p>
          </Alerta>
        </div>

        <hr />

        <div className={styles.tabla}>
          <Tabla>
            <Thead>
              <th scope="col">Seleccionar clase</th>
              <th scope="col">Semestre</th>
              <th scope="col">Sede</th>
              <th scope="col">Clase</th>
              <th scope="col">Tipo Doc.</th>
              <th scope="col">Cód. curso</th>
              <th scope="col">Nombre del curso</th>
              <th scope="col">Carrera</th>
              <th scope="col">Aplica Evaluación de Competencias</th>
            </Thead>
            <Tbody>
              <tr>
                <td>.</td>
                <td>.</td>
                <td>.</td>
                <td>.</td>
                <td>.</td>
                <td>.</td>
                <td>.</td>
                <td>.</td>
                <td>.</td>
              </tr>
            </Tbody>
          </Tabla>
        </div>

        <div>
          <small>
            <strong>Tipo docente: (P)</strong> Principal / <strong>(S)</strong>{' '}
            Sustituto / <strong>(A)</strong> Auxiliar
          </small>
        </div>
      </div>
    </div>
  )
}

export default index
