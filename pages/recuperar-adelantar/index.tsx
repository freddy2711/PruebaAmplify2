import Anchor from '../../components/UI/atoms/anchor/Anchor'
import Label from '../../components/UI/atoms/label/Label'
import RecuperarButtons from '../../components/UI/molecules/recuperarButtons/RecuperarButtons'
import Tbody from '../../components/UI/molecules/table/tbody/Tbody'
import Thead from '../../components/UI/molecules/table/thead/Thead'
import Tabla from '../../components/UI/organisms/table/Tabla'
import styles from '../../components/templates/recuperar/Recuperar.module.scss'

const Recuperar = () => {
  return (
    <div className={styles.contenido}>
      <div className={styles.content}>
        <div className={styles.titulo}>
          <Label classname="text-warning h5 mt-3 mb-3">
            Recuperar/Adelantar clases
          </Label>
        </div>

        <hr />

        <div className={styles.botones}>
          <RecuperarButtons />
        </div>

        <hr />

        <div className={styles.tabla}>
          <Tabla>
            <Thead>
              <th scope="col">&nbsp;</th>
              <th scope="col">Número</th>
              <th scope="col">Sede</th>
              <th scope="col">Semestre</th>
              <th scope="col">Clase</th>
              <th scope="col">Curso</th>
              <th scope="col">Carrera</th>
              <th scope="col">Fecha perdida</th>
              <th scope="col">Fecha recuperación</th>
              <th scope="col">Horas</th>
              <th scope="col">Estado</th>
            </Thead>
            <Tbody>
              <tr>
                <td>
                  <b>
                    <Anchor
                      href="/"
                      classname="text-decoration-none"
                    >
                      Editar
                    </Anchor>
                  </b>
                </td>
                <td>29791</td>
                <td>TML</td>
                <td>222513</td>
                <td>2225132395</td>
                <td>SUPP1401A</td>
                <td>Adm. y Gestión Comercial</td>
                <td>15-04-2022</td>
                <td>12-04-2022</td>
                <td>2</td>
                <td>P</td>
              </tr>
            </Tbody>
          </Tabla>
        </div>

        <div>
          <small>
            <strong>Tipo docente: (P)</strong> Principal / <strong>(S)</strong>{' '}
            Sustituto / <strong>(A)</strong> Auxiliar
          </small>
          <br />
          <small>
            <strong>Estado solicitud: (I)</strong> Solicitada /{' '}
            <strong>(P)</strong> Programada / <strong>(A)</strong> Anulada /{' '}
            <strong>(E)</strong> Ejecutada
          </small>
        </div>
      </div>
    </div>
  )
}

export default Recuperar
