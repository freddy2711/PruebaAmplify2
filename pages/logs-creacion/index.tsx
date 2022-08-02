import Label from '../../components/UI/atoms/label/Label'
import Tbody from '../../components/UI/molecules/table/tbody/Tbody'
import Thead from '../../components/UI/molecules/table/thead/Thead'
import Tabla from '../../components/UI/organisms/table/Tabla'
import styles from '../../components/templates/logsToken/LogsToken.module.scss'

const LogsCreacion = () => {
  return (
    <div className={styles.contenido}>
      <div className={styles.content}>
        <div className={styles.titulo}>
          <Label classname="text-warning h5 mt-3 mb-3">
            Logs Token de Notas
          </Label>
        </div>

        <hr />

        <div className={styles.tabla}>
          <Tabla>
            <Thead>
              <th
                scope="col"
                colSpan={2}
              >
                TOKEN ACTIVO Semestre 2022-1
              </th>
            </Thead>
            <Tbody>
              <tr>
                <td>Fecha Solicitud</td>
                <td>22-06-2022, 10:52 a. m.</td>
              </tr>
            </Tbody>
          </Tabla>
        </div>

        <div className={styles.subtitle}>
          <span>Lista de Token Generados Semestre 2022-1</span>
        </div>

        <div className={styles.tabla}>
          <Tabla>
            <Thead>
              <th scope="col">Fecha Solicitud</th>
              <th scope="col">Hora Solicitud</th>
              <th scope="col">Activo</th>
            </Thead>
            <Tbody>
              <tr>
                <td>22-06-2022</td>
                <td>10:52 a. m.</td>
                <td>Sí</td>
              </tr>
              <tr>
                <td>20-06-2022</td>
                <td>04:44 p. m.</td>
                <td>No</td>
              </tr>
              <tr>
                <td>28-04-2022</td>
                <td>05:45 p. m.</td>
                <td>No</td>
              </tr>
            </Tbody>
          </Tabla>
        </div>
      </div>
    </div>
  )
}

export default LogsCreacion
