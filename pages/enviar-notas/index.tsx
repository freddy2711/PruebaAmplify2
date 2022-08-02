import Anchor from '../../components/UI/atoms/anchor/Anchor'
import Label from '../../components/UI/atoms/label/Label'
import Tbody from '../../components/UI/molecules/table/tbody/Tbody'
import Thead from '../../components/UI/molecules/table/thead/Thead'
import Tabla from '../../components/UI/organisms/table/Tabla'
import styles from '../../components/templates/enviarNotas/EnviarNotas.module.scss'

const EnviarNotas = () => {
  return (
    <div className={styles.contenido}>
      <div className={styles.content}>
        <div className={styles.titulo}>
          <Label classname="text-warning h5 mt-3 mb-3">
            Envío de notas a Secretaría Académica
          </Label>
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
              <th scope="col">Enviado</th>
            </Thead>
            <Tbody>
              <tr>
                <td>
                  <b>
                    <Anchor
                      href="/"
                      classname="text-decoration-none"
                    >
                      Enviar notas
                    </Anchor>
                  </b>
                </td>
                <td>222513</td>
                <td>TML</td>
                <td>2225136111</td>
                <td>P</td>
                <td>MAGM1204A</td>
                <td>DISEÑO ORGANIZACIONAL Y PROC.</td>
                <td>Adm. y Gestión Comercial</td>
                <td>NO</td>
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

export default EnviarNotas
