import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/UI/atoms/button/Button'
import Image from '../../components/UI/atoms/imagen/Imagen'
import Input from '../../components/UI/atoms/input/Input'
import ItemList from '../../components/UI/atoms/ItemList/ItemList'
import Label from '../../components/UI/atoms/label/Label'
import ProgressBars from '../../components/UI/atoms/progressBar/ProgressBars'
import Form from '../../components/UI/molecules/form/Form'
import List from '../../components/UI/molecules/lista/List'
import Pane from '../../components/UI/molecules/pane/Pane'
import TabChild from '../../components/UI/molecules/tabchild/TabChild'
import TabBlock from '../../components/UI/organisms/tabs/TabBlock'
import styles from './../../components/templates/datosPersonales/datosPersonales.module.scss'
// import styles from './../templates/datosPersonales/datosPersonales.module.scss'

// Actions de redux'
import { addExpLabAction } from '../../src/redux/actions/datosPersonalesActions'
import Alerta from '../../components/UI/atoms/alert/Alerts'

const DatosPersonales = () => {
  const dispatch = useDispatch()
  const addExpLabDispatch = () => dispatch<any>(addExpLabAction())
  const handleAddExpLab = () => {
    addExpLabDispatch()
  }

  const cargando = useSelector((state: any) => state?.datosPersonales?.loading)
  console.log(cargando)

  return (
    <div className={styles.default}>
      <div className={`${styles.content} container`}>
        <div className={styles.container}>
          <div className={styles.titulo}>
            <Label classname="text-warning h5 mt-3 mb-3">
              Datos Personales
            </Label>
          </div>

          <hr />

          <div className={styles.alertContent}>
            <Alerta
              classname="w-100"
              variant="primary"
            >
              <p className="mb-0">
                <b>Nota:</b> (*) Llenar estas pestañas es obligatorio.
              </p>
            </Alerta>
          </div>

          <div className={styles.confirmBtn}>
            <Button
              type="button"
              variant="primary"
              size="medium"
              classname="m-auto mb-3"
            >
              CONFIRMACIÓN DE DATOS
            </Button>
          </div>

          <div className={styles.barContent}>
            <ProgressBars
              now={100}
              variant="info"
              label="Avance"
            />
          </div>

          <div className={styles.tabsContent}>
            <TabBlock defaultActiveKey="Información General">
              <TabChild
                eventKey="Información General"
                title="Información General"
              >
                <Form id="form1">
                  <Pane classname="row px-2">
                    <div className="col-12 col-md-7 mt-3">
                      <div className="form-group row mb-3">
                        <Label classname="col-12 col-md-4">
                          Apellido Paterno:
                        </Label>
                        <div className="col-12 col-md-8">
                          <Input
                            type="text"
                            id="txtApellidoPaterno"
                            name="txtApellidoPaterno"
                            placeholder="Apellido Paterno"
                            disabled={true}
                          />
                        </div>
                      </div>

                      <div className="form-group row mb-3">
                        <Label classname="col-12 col-md-4">
                          Apellido Materno:
                        </Label>
                        <div className="col-12 col-md-8">
                          <Input
                            type="text"
                            id="txtApellidoMaterno"
                            name="txtApellidoMaterno"
                            placeholder="Apellido Materno"
                            disabled={true}
                          />
                        </div>
                      </div>

                      <div className="form-group row mb-3">
                        <Label classname="col-12 col-md-4">Nombres:</Label>
                        <div className="col-12 col-md-8">
                          <Input
                            type="text"
                            id="txtNombre"
                            name="txtNombre"
                            placeholder="Apellido Paterno"
                            disabled={true}
                          />
                        </div>
                      </div>

                      <div className="form-group row mb-3">
                        <Label classname="col-12 col-md-4">
                          Fecha Nacimiento:
                        </Label>
                        <div className="col-12 col-md-8">
                          <Input
                            type="text"
                            id="txtFechaNacimiento"
                            name="txtFechaNacimiento"
                            placeholder="Fecha Nacimiento"
                            disabled={true}
                          />
                        </div>
                      </div>

                      <div className="form-group row mb-3">
                        <Label classname="col-12 col-md-4">
                          Pais Nacimiento:
                        </Label>
                        <div className="col-12 col-md-8">
                          <Input
                            type="text"
                            id="ddlPais"
                            name="ddlPais"
                            placeholder="Pais Nacimiento"
                            disabled={true}
                          />
                        </div>
                      </div>

                      <div className="form-group row mb-3">
                        <Label classname="col-12 col-md-4">
                          Tipo Documento:
                        </Label>
                        <div className="col-12 col-md-8">
                          <Input
                            type="text"
                            id="ddlTipoDocumento"
                            name="ddlTipoDocumento"
                            placeholder="Tipo Documento"
                            disabled={true}
                          />
                        </div>
                      </div>

                      <div className="form-group row mb-3">
                        <Label classname="col-12 col-md-4">
                          Número Documento:
                        </Label>
                        <div className="col-12 col-md-8">
                          <Input
                            type="text"
                            id="txtNumeroDocumento"
                            name="txtNumeroDocumento"
                            placeholder="Número Documento"
                            disabled={true}
                          />
                        </div>
                      </div>

                      <div className="form-group row mb-3">
                        <Label classname="col-12 col-md-4">Sexo:</Label>
                        <div className="col-12 col-md-8">
                          <Input
                            type="text"
                            id="ddlSexo"
                            name="ddlSexo"
                            placeholder="Sexo"
                            disabled={true}
                          />
                        </div>
                      </div>

                      <div className="form-group row mb-3">
                        <Label classname="col-12 col-md-4">Estado Civil:</Label>
                        <div className="col-12 col-md-8">
                          <Input
                            type="text"
                            id="ddlEstadoCivil"
                            name="ddlEstadoCivil"
                            placeholder="Estado Civil"
                            disabled={true}
                          />
                        </div>
                      </div>

                      <div className="form-group row mb-3">
                        <Label classname="col-12 col-md-4">
                          Semestre de Ingreso:
                        </Label>
                        <div className="col-12 col-md-8">
                          <Input
                            type="text"
                            id="txtSemestreIngreso"
                            name="txtSemestreIngreso"
                            placeholder="Semestre de Ingreso"
                            disabled={true}
                          />
                        </div>
                      </div>

                      <div className="form-group row mb-3">
                        <Label classname="col-12 col-md-4">
                          ¿Tiene Discapacidad?:
                        </Label>
                        <div className="col-12 col-md-8">
                          <Input
                            type="text"
                            id="discapacidad"
                            name="discapacidad"
                            placeholder="¿Tiene Discapacidad?"
                            disabled={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-5 my-auto">
                      <div className="form-group row">
                        <Image
                          src="https://intranet.upn.edu.pe/wsfoto/foto/18859999-6/Collaborator"
                          alt="user"
                          classname="user mx-auto d-block border p-0"
                        />
                      </div>

                      <div className="form-group row mt-3">
                        <Button
                          type="button"
                          variant="primary"
                          classname="btn-sm mx-auto col-3"
                        >
                          Añadir Foto
                        </Button>
                      </div>
                    </div>
                    <div className="col-12 text-center text-danger">
                      <strong>
                        ESTOS DATOS NO SON EDITABLES Y PROVIENEN DEL SISTEMA DE
                        PLANILLA, SI DESEA MODIFICARLO CONTÁCTESE CON EL ÁREA DE
                        RRHH. DE SU SEDE.
                      </strong>
                    </div>
                  </Pane>
                </Form>
              </TabChild>

              <TabChild
                eventKey="Contacto"
                title="Contacto"
              >
                <Form
                  id="frmContacto"
                  classname="px-3 py-3"
                >
                  <Pane classname="row px-2">
                    <div className="form-group row mb-3">
                      <Label classname="col-12 col-md-4">Distrito:</Label>
                      <div className="col-12 col-md-8 text-center">
                        <Input
                          type="text"
                          id="ddlDistrito"
                          name="ddlDistrito"
                          placeholder="Distrito"
                          disabled={true}
                        />
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <Label classname="col-12 col-md-4">Dirección:</Label>
                      <div className="col-12 col-md-8 text-center">
                        <Input
                          type="text"
                          id="txtDireccionUbigeo"
                          name="txtDireccionUbigeo"
                          placeholder="Dirección"
                          disabled={true}
                        />
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <Label classname="col-12 col-md-4">Teléfono Fijo:</Label>
                      <div className="col-12 col-md-8 text-center">
                        <Input
                          type="text"
                          id="txtTelfFijo"
                          name="txtTelfFijo"
                          placeholder="Teléfono Fijo"
                          disabled={true}
                        />
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <Label classname="col-12 col-md-4">
                        Teléfono Celular 1:
                      </Label>
                      <div className="col-12 col-md-8 text-center">
                        <Input
                          type="text"
                          id="txtTelfCelularSpring"
                          name="txtTelfCelularSpring"
                          placeholder="Teléfono Celular 1"
                          disabled={true}
                        />
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <Label classname="col-12 col-md-4">
                        Teléfono Celular 2:
                      </Label>
                      <div className="col-12 col-md-8 text-center">
                        <Input
                          type="text"
                          id="txtTelfCelular"
                          name="txtTelfCelular"
                          placeholder="Teléfono Celular 2"
                          disabled={true}
                        />
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <Label classname="col-12 col-md-4">Correo Laboral:</Label>
                      <div className="col-12 col-md-8 text-center">
                        <Input
                          type="text"
                          id="txtCorreoLaboral"
                          name="txtCorreoLaboral"
                          placeholder="Correo Laboral"
                          disabled={true}
                        />
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <Label classname="col-12 col-md-4">
                        Correo Personal 1:
                      </Label>
                      <div className="col-12 col-md-8 text-center">
                        <Input
                          type="text"
                          id="txtCorreoPersonal1"
                          name="txtCorreoPersonal1"
                          placeholder="Correo Personal 1"
                          disabled={true}
                        />
                      </div>
                    </div>

                    <div className="form-group row mb-3">
                      <Label classname="col-12 col-md-4">
                        Correo Personal 2:
                      </Label>
                      <div className="col-12 col-md-8 text-center">
                        <Input
                          type="text"
                          id="txtCorreoPersonal"
                          name="txtCorreoPersonal"
                          placeholder="Correo Personal 2"
                          disabled={true}
                        />
                      </div>
                    </div>

                    <div className="col-12 px-0 text-center">
                      <Button
                        type="button"
                        variant="primary"
                        classname="btn-sm"
                      >
                        Guardar
                      </Button>
                    </div>
                  </Pane>
                </Form>
              </TabChild>

              <TabChild
                eventKey="Experiencia Laboral"
                title="Experiencia Laboral"
              >
                <Form id="px-3 py-3">
                  <div className="form-group row mb-3">
                    <div className="col-sm-3">
                      <Button
                        type="button"
                        variant="secondary"
                        classname="btn-sm"
                        onclick={handleAddExpLab}
                      >
                        Agregar
                      </Button>
                    </div>
                  </div>

                  <List classname="mb-3">
                    <ItemList classname="row d-flex py-3 px-0 mx-0">
                      <div className="col-12 col-md-6">
                        <p className="mb-1">
                          SUPERVISOR DE TRAFICO PESADO en CASA GRANDE S.A.A. -
                          GRUPO GLORIA
                        </p>
                        <p className="mb-1">
                          Del: 10/06/2014 al 01/11/2014{`(`}0 Años - 4 Meses
                          {`)`}
                          <br />
                          Abastecimiento y Logística
                          <label
                            className="text-danger"
                            id="mensajeEXLAB_5565"
                          ></label>
                        </p>
                        <span className="d-none"></span>
                      </div>
                      <div className="col-12 col-md-6 text-end">
                        <Button
                          type="button"
                          variant="secondary"
                          classname="btn-sm me-2"
                        >
                          Editar
                        </Button>
                        <Button
                          type="button"
                          variant="danger"
                          classname="btn-sm"
                        >
                          Eliminar
                        </Button>
                      </div>
                    </ItemList>
                  </List>

                  <hr />

                  <div className="form-group row mt-3 mb-3">
                    <Label classname="col-sm-4 col-form-label">
                      Total de Años Experiencia Profesional :
                    </Label>
                    <div className="col-sm-2">
                      <Input
                        id="txtTotalExperienciaProfesional"
                        type="text"
                        name="txtTotalExperienciaProfesional"
                        classname="text-center"
                        placeholder="0"
                        disabled={true}
                      />
                    </div>
                  </div>

                  <div className="form-group row mb-3">
                    <Label classname="col-sm-4 col-form-label">
                      Total de Años Experiencia Docente :
                    </Label>
                    <div className="col-sm-2">
                      <Input
                        id="txtTotalExperienciaDocente"
                        type="text"
                        name="txtTotalExperienciaDocente"
                        classname="text-center"
                        placeholder="0"
                        disabled={true}
                      />
                    </div>
                  </div>

                  <div className="col-12 px-0 text-justify text-muted">
                    <strong>
                      El total de experiencia profesional y docente se calcula
                      de manera automática según datos registrados.
                    </strong>
                  </div>
                </Form>
              </TabChild>

              <TabChild
                eventKey="Estudios"
                title="Estudios"
              >
                <Form id="px-3 py-3">
                  <div className="form-group row mb-3">
                    <div className="col-sm-3">
                      <Button
                        type="button"
                        variant="secondary"
                        classname="btn-sm"
                      >
                        Agregar
                      </Button>
                    </div>
                  </div>

                  <List classname="mb-3">
                    <ItemList classname="row d-flex py-3 px-0 mx-0">
                      <div className="col-12 col-md-6">
                        <p className="mb-1">
                          <b>
                            MAESTRÍA EN INGENIERÍA INDUSTRIAL CON MENCIÓN EN
                            GERENCIA DE OPERACIONES
                          </b>{' '}
                          en Universidad Nacional de Trujillo
                        </p>
                        <p className="mb-1">
                          Maestria
                          <br />
                          Del: 01/04/2002 Al 01/04/2006 En Curso Perú
                          <br />
                          Pendiente de Validación en SUNEDU
                        </p>
                        <span className="d-none"></span>
                      </div>
                      <div className="col-12 col-md-6 text-end">
                        <Button
                          type="button"
                          variant="secondary"
                          classname="btn-sm me-2"
                        >
                          Editar
                        </Button>
                        <Button
                          type="button"
                          variant="danger"
                          classname="btn-sm"
                        >
                          Eliminar
                        </Button>
                      </div>
                    </ItemList>
                  </List>
                </Form>
              </TabChild>

              <TabChild
                eventKey="Conocimientos"
                title="Conocimientos"
              >
                <Form id="px-3 py-3">
                  <div className="form-group row mb-3">
                    <div className="col-sm-3">
                      <Button
                        type="button"
                        variant="secondary"
                        classname="btn-sm"
                      >
                        Agregar
                      </Button>
                    </div>
                  </div>

                  <List classname="mb-3">
                    <ItemList classname="row d-flex py-3 px-0 mx-0">
                      <div className="col-12 col-md-6">
                        <p className="mb-1">
                          <b>SAP myAgri</b>
                        </p>
                        <p className="mb-1">Básico</p>
                        <span className="d-none"></span>
                      </div>
                      <div className="col-12 col-md-6 text-end">
                        <Button
                          type="button"
                          variant="secondary"
                          classname="btn-sm me-2"
                        >
                          Editar
                        </Button>
                        <Button
                          type="button"
                          variant="danger"
                          classname="btn-sm"
                        >
                          Eliminar
                        </Button>
                      </div>
                    </ItemList>
                  </List>
                </Form>
              </TabChild>

              <TabChild
                eventKey="Idiomas"
                title="Idiomas"
              >
                <Form id="px-3 py-3">
                  <div className="form-group row mb-3">
                    <div className="col-sm-3">
                      <Button
                        type="button"
                        variant="secondary"
                        classname="btn-sm"
                      >
                        Agregar
                      </Button>
                    </div>
                  </div>

                  <List classname="mb-3">
                    <ItemList classname="row d-flex py-3 px-0 mx-0">
                      <div className="col-12 col-md-6">
                        <p className="mb-1">
                          <b>Inglés</b>
                        </p>
                        <p className="mb-1">
                          Nivel Oral: Básico
                          <br />
                          Nivel Escrito :Básico
                        </p>
                        <span className="d-none"></span>
                      </div>
                      <div className="col-12 col-md-6 text-end">
                        <Button
                          type="button"
                          variant="secondary"
                          classname="btn-sm me-2"
                        >
                          Editar
                        </Button>
                        <Button
                          type="button"
                          variant="danger"
                          classname="btn-sm"
                        >
                          Eliminar
                        </Button>
                      </div>
                    </ItemList>
                  </List>
                </Form>
              </TabChild>

              <TabChild
                eventKey="Referencia Laboral"
                title="Referencia Laboral"
              >
                <Form id="px-3 py-3">
                  <div className="form-group row">
                    <div className="col-sm-3">
                      <Button
                        type="button"
                        variant="secondary"
                        classname="btn-sm"
                      >
                        Agregar
                      </Button>
                    </div>
                  </div>
                </Form>
                Referencia Laboral
              </TabChild>

              <TabChild
                eventKey="Documentos"
                title="Documentos"
              >
                <Form id="px-3 py-3">
                  <div className="form-group row">
                    <div className="col-sm-3">
                      <Button
                        type="button"
                        variant="secondary"
                        classname="btn-sm"
                      >
                        Agregar
                      </Button>
                    </div>
                  </div>
                </Form>
                Documentos
              </TabChild>
            </TabBlock>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DatosPersonales
