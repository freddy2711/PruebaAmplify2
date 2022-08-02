import Alerta from '../../components/UI/atoms/alert/Alerts'
import Anchor from '../../components/UI/atoms/anchor/Anchor'
import Button from '../../components/UI/atoms/button/Button'
import Label from '../../components/UI/atoms/label/Label'
import Select from '../../components/UI/atoms/select/Select'
import Tbody from '../../components/UI/molecules/table/tbody/Tbody'
import Thead from '../../components/UI/molecules/table/thead/Thead'
import Tabla from '../../components/UI/organisms/table/Tabla'
import styles from '../../components/templates/asistencia/seleccionarSesion/SeleccionarSesion.module.scss'

const SeleccionarSesion = () => {
  return (
    <div className={styles.contenido}>
      <div className={styles.content}>
        <div className={styles.titulo}>
          <Label classname="text-warning h5 mt-3 mb-3">
            Sesiones Anteriores
          </Label>
        </div>
        <hr />

        <div className={styles.alertaContent}>
          <Alerta
            classname="w-100"
            variant="info"
          >
            <p className="mb-0">
              <b>Nota:</b> &nbsp; Seleccione una sesión clase para ver sus
              integrantes.
            </p>
          </Alerta>
        </div>

        <div>
          <div>
            <Button
              type="button"
              variant="secondary"
              classname=""
            >
              Regresar
            </Button>
          </div>
          <div className="row mt-3">
            <small className="col-sm-12 col-md-6 d-block d-md-inline">
              <span id="cphSite_lblSesionesAnteriores">
                <strong>Sesión:</strong> CLASE 2225136111 - DISEÑO
                ORGANIZACIONAL Y PROC.
              </span>
            </small>
            <small className="col-sm-12 col-md-6 d-block d-md-inline">
              <span id="cphSite_lblFechas">
                <strong>Periodo de Pago:</strong> Del 07/06/2021 al 04/07/2021
              </span>
            </small>
          </div>
          <div className="col-sm-12 col-md-2 pl-0 mb-3 mt-2">
            <Select id="sesionesSelect">
              <option>Todas mis sesiones</option>
            </Select>
          </div>
        </div>

        <hr />

        <div className={styles.tabla}>
          <Tabla>
            <Thead>
              <th scope="col">Asistencias</th>
              <th scope="col">Dueño</th>
              <th scope="col">Fecha</th>
              <th scope="col">Tipo de sesión</th>
              <th scope="col">Fecha y hora de inicio</th>
              <th scope="col">Fecha y hora de término</th>
              <th scope="col">Horas Contabilizadas</th>
              <th scope="col">Cierre de sesión</th>
              <th scope="col">Estado</th>
            </Thead>
            <Tbody>
              <tr>
                <td>
                  <b>
                    <Anchor
                      href="/registro-asistencia"
                      classname="text-decoration-none"
                    >
                      Ver asistencias
                    </Anchor>
                  </b>
                </td>
                <td>RVI</td>
                <td>18/05/2022 </td>
                <td>Normal</td>
                <td>18/05/2022 19:23:45</td>
                <td>18/05/2022 22:40:00 </td>
                <td>4.00</td>
                <td>Manual</td>
                <td>Cerrado</td>
              </tr>
            </Tbody>
          </Tabla>
        </div>
      </div>
    </div>
  )
}

export default SeleccionarSesion
