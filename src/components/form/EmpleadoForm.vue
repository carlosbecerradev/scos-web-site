<template>
  <div class="empleado-form">
    <b-form @submit.prevent="guardar">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-form-group label="Id:">
            <b-form-input
              v-model="entidad.empleadoId"
              type="text"
              size="sm"
              disabled
              trim
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-form-group label="Nombres:">
            <b-form-input
              v-model="entidad.nombres"
              type="text"
              size="sm"
              placeholder="Escriba aquí"
              required
              trim
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-form-group label="Apellidos:">
            <b-form-input
              v-model="entidad.apellidos"
              type="text"
              size="sm"
              placeholder="Escriba aquí"
              required
              trim
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-form-group label="N° de Carnet:">
            <b-form-input
              v-model="entidad.nroDeCarnet"
              type="text"
              size="sm"
              required
              trim
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-form-group label="Sexo:">
            <b-form-select
              v-model="entidad.sexo"
              :options="sexos"
              size="sm"
              required
            ></b-form-select>
          </b-form-group>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-form-group label="DNI:">
            <b-form-input
              v-model="entidad.dni"
              type="number"
              size="sm"
              placeholder="00000000"
              required
              trim
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-form-group label="N° Telefono Movil:">
            <b-form-input
              v-model="entidad.nroDeTelefonoMovil"
              type="number"
              size="sm"
              placeholder="000000000"
              required
              trim
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-form-group label="Estado:">
            <b-form-select
              v-model="entidad.estado"
              :options="estadoDeEmpledoOptions"
              size="sm"
              required
            ></b-form-select>
          </b-form-group>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-form-group label="Imagen URL:">
            <b-form-input
              v-model="entidad.fotoUrl"
              type="text"
              size="sm"
              required
              trim
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-form-group label="Sedes:">
            <b-form-select
              v-model="sedeSelected"
              :options="sedeOptions"
              size="sm"
              value-field="sedeId"
              text-field="nombre"
              required
            ></b-form-select>
          </b-form-group>
        </div>
      </div>
      <p class="lead mt-4 font-weight-normal">Datos de Usuario</p>
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-form-group label="Nombre de Usuario:">
            <b-form-input
              v-model="entidad.usuario.nombreDeUsuario"
              type="text"
              size="sm"
              placeholder="Escriba aquí"
              required
              trim
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-form-group label="Contraseña:">
            <b-form-input
              v-model="entidad.usuario.contrasenia"
              type="text"
              size="sm"
              placeholder="Escriba aquí"
              required
              trim
            ></b-form-input>
          </b-form-group>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-button variant="purple" type="submit" block size="sm"
            >Guardar
          </b-button>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "EmpleadoForm",
  data() {
    return {
      entidad: {},
      sedeSelected: null,
      sexos: [
        { value: null, text: "Seleccione" },
        { value: "M", text: "Masculino" },
        { value: "F", text: "Femenino" },
      ],
      estadoDeEmpledoOptions: [
        { value: null, text: "Seleccione" },
        { value: "DISPONIBLE", text: "DISPONIBLE" },
        { value: "ASIGNADO", text: "ASIGNADO" },
        { value: "INACTIVO", text: "INACTIVO" },
      ],
      sedeOptions: [],
    };
  },
  computed: {
    ...mapGetters(["empleado", "empleados", "sedes"]),
  },
  methods: {
    ...mapMutations(["setEmpleado", "setTotalRows"]),
    ...mapActions([
      "fetchPostAddEmpleado",
      "fetchPutEditEmpleado",
      "fetchGetEmpleados",
      "fetchGetSedes",
    ]),
    async fillSedeOptions() {
      await this.fetchGetSedes();
      this.sedeOptions = this.sedes;
      this.sedeOptions.unshift({
        sedeId: null,
        nombre: "Seleccione",
      });
    },
    async guardar() {
      this.entidad.usuario.sede.sedeId = this.sedeSelected;
      let statusCode = 0;

      if (this.entidad.empleadoId <= 0) {
        statusCode = await this.registrar();
      }
      if (this.entidad.empleadoId > 0) {
        statusCode = await this.editar();
      }

      await this.fetchGetEmpleados();
      this.setTotalRows(this.empleado.length);
      this.$bvModal.hide("empleado-form-modal");

      if (statusCode == 201) {
        this.$swal.fire({
          icon: "success",
          title: "Se registro correctamente!",
        });
      }
      if (statusCode == 200) {
        this.$swal.fire({
          icon: "success",
          title: "Se actualizo correctamente!",
        });
      }
      if (statusCode == 500) {
        this.$swal.fire({
          icon: "error",
          title: "Ese nombre ya existe!",
        });
      }
    },
    async registrar() {
      return await this.fetchPostAddEmpleado(this.entidad);
    },
    async editar() {
      return await this.fetchPutEditEmpleado(this.entidad);
    },
  },
  created() {
    this.entidad = JSON.parse(JSON.stringify(this.empleado));
  },
  mounted() {
    this.fillSedeOptions();
    this.sedeSelected = this.entidad.usuario.sede.sedeId;
  },
};
</script>
