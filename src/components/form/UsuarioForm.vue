<template>
  <div class="usuario-form">
    <b-form @submit.prevent="guardar">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-form-group label="Id:">
            <b-form-input
              v-model="entidad.usuarioId"
              type="text"
              size="sm"
              disabled
              trim
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-form-group label="Nombre de Usuario:">
            <b-form-input
              v-model="entidad.nombreDeUsuario"
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
              v-model="entidad.contrasenia"
              type="text"
              size="sm"
              placeholder="Escriba aquí"
              required
              trim
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-form-group label="Rol:">
            <b-form-select
              v-model="entidad.rol"
              :options="rolOptions"
              size="sm"
              required
            ></b-form-select>
          </b-form-group>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-form-group label="Activo:">
            <b-form-select
              v-model="entidad.activo"
              :options="stateOptions"
              size="sm"
            ></b-form-select>
          </b-form-group>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-form-group label="Sede:">
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
        <div class="col-12 col-sm-12 col-md-8 col-lg-6">
          <b-form-group label="Token de notificación:">
            <b-form-input
              v-model="entidad.tokenDeNotificacion"
              type="text"
              size="sm"
              placeholder="Escriba aquí"
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
  name: "UsuarioForm",
  data() {
    return {
      entidad: {},
      sedeSelected: null,
      rolOptions: [
        { value: null, text: "Seleccione" },
        { value: "CLIENTE", text: "CLIENTE" },
        { value: "TECNICO", text: "TECNICO" },
        { value: "JEFE", text: "JEFE" },
        { value: "ADMINISTRADOR", text: "ADMINISTRADOR" },
      ],
      stateOptions: [
        { value: true, text: "Si" },
        { value: false, text: "No" },
      ],
      sedeOptions: [],
    };
  },
  computed: {
    ...mapGetters(["usuario", "usuarios", "sedes"]),
  },
  methods: {
    ...mapMutations(["setUsuario", "setTotalRows"]),
    ...mapActions([
      "fetchPostAddUsuario",
      "fetchPutEditUsuario",
      "fetchGetUsuarios",
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
      this.entidad.sede.sedeId = this.sedeSelected;

      let statusCode = 0;

      if (this.entidad.usuarioId <= 0) {
        statusCode = await this.registrar();
      }
      if (this.entidad.usuarioId > 0) {
        statusCode = await this.editar();
      }

      await this.fetchGetUsuarios();
      this.setTotalRows(this.usuarios.length);
      this.$bvModal.hide("usuario-form-modal");

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
          title: "Ese nombre de usuario ya existe!",
        });
      }
    },
    async registrar() {
      return await this.fetchPostAddUsuario(this.entidad);
    },
    async editar() {
      return await this.fetchPutEditUsuario(this.entidad);
    },
  },
  mounted() {
    this.fillSedeOptions();
    this.entidad = JSON.parse(JSON.stringify(this.usuario));
    this.sedeSelected = this.entidad.sede.sedeId;
  },
};
</script>

