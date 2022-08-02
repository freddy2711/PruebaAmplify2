// import Alerta from '../../components/UI/atoms/alert/Alerts'
import Button from '../../components/UI/atoms/button/Button'
import Anchor from '../../components/UI/atoms/anchor/Anchor'
import Label from '../../components/UI/atoms/label/Label'
import Tbody from '../../components/UI/molecules/table/tbody/Tbody'
import Thead from '../../components/UI/molecules/table/thead/Thead'
import Tabla from '../../components/UI/organisms/table/Tabla'
import styles from '../../components/templates/ingresoNotas/IngresoNotas.module.scss'
import dynamic from 'next/dynamic'

const Alerta = dynamic(() => import('../../components/UI/atoms/alert/Alerts'), {
  ssr: false,
})

const IngresoNotas = () => {
  return (
    <div className={styles.contenido}>
      <div className={styles.content}>
        <div className={styles.titulo}>
          <Label classname="text-warning h5 mt-3 mb-3">Ingreso de Notas</Label>
        </div>
        <hr />

        <div className={styles.alertaContent}>
          <Alerta
            classname="w-100"
            variant="info"
          >
            <p className="mb-0">
              <b>Nota:</b>
              <br />
              <ul>
                <li>
                  Al inicio de cada periodo/semestre usted debe vincular su
                  dispositivo móvil con un <b>nuevo</b> código QR.
                </li>
                <li>
                  Todos los códigos QR generados en periodos anteriores se
                  invalidan automáticamente.
                </li>
                <li>
                  Cada vez que haga click en Generar Token, usted deberá
                  vincular <b>nuevamente</b> su dispositivo móvil con el{' '}
                  <b>nuevo</b> código QR.
                </li>
                <li>
                  Cada vez que genera un código QR, este es enviado a su correo
                  electrónico.
                </li>
              </ul>
            </p>
          </Alerta>
        </div>

        <div className={styles.rowButtons}>
          <Button
            type="button"
            variant="primary"
          >
            Generar Token Semestre 2022-1
          </Button>
        </div>

        <hr />

        <div className={styles.tabla}>
          <Tabla>
            <Thead>
              <th scope="col">Seleccionar</th>
              <th scope="col">Semestre</th>
              <th scope="col">Sede</th>
              <th scope="col">Clase</th>
              <th scope="col">Tipo doc.</th>
              <th scope="col">Cód. curso</th>
              <th scope="col">Nombre del curso</th>
              <th scope="col">Carrera</th>
              <th scope="col">Tipo Clase</th>
            </Thead>
            <Tbody>
              <tr>
                <td>
                  <b>
                    <Anchor
                      href="/"
                      classname="text-decoration-none"
                    >
                      Ingresar notas
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
                <td>RM</td>
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
            <strong>Tipo Clase: (PR)</strong> Presencial / <strong>(VT)</strong>{' '}
            Virtual
          </small>
        </div>
      </div>
    </div>
  )
}

export default IngresoNotas
