<template>
  <div class="tipo-de-servicio-form">
    <b-form @submit.prevent="guardar">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-form-group label="Id:">
            <b-form-input
              v-model="entidad.tipoDeIncidenciaId"
              type="text"
              size="sm"
              disabled
              trim
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-form-group label="Nombre:">
            <b-form-input
              v-model="entidad.nombre"
              type="text"
              size="sm"
              placeholder="Escriba aquí"
              required
              trim
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-form-group label="Tipo de Servicio:">
            <b-form-select
              v-model="tipoDeServicioSelected"
              :options="tiposDeServicioOptions"
              size="sm"
              value-field="tipoDeServicioId"
              text-field="nombre"
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
  name: "TipoDeIncidenciaForm",
  data() {
    return {
      entidad: {},
      tipoDeServicioSelected: null,
      stateOptions: [
        { value: true, text: "Si" },
        { value: false, text: "No" },
      ],
      tiposDeServicioOptions: [],
    };
  },
  computed: {
    ...mapGetters(["tipoDeIncidencia", "tiposDeServicio", "tiposDeIncidencia"]),
  },
  methods: {
    ...mapMutations(["setTipoDeIncidencia", "setTotalRows"]),
    ...mapActions([
      "fetchPostAddTipoDeIncidencia",
      "fetchPutEditTipoDeIncidencia",
      "fetchGetTiposDeIncidencia",
      "fetchGetTiposDeServicio",
    ]),
    async fillTiposDeServicioOptions() {
      await this.fetchGetTiposDeServicio();
      this.tiposDeServicioOptions = this.tiposDeServicio;
      this.tiposDeServicioOptions.unshift({
        tipoDeServicioId: null,
        nombre: "Seleccione",
      });
    },
    async guardar() {
      this.entidad.tipoDeServicio.tipoDeServicioId =
        this.tipoDeServicioSelected;

      let statusCode = 0;

      if (this.entidad.tipoDeIncidenciaId <= 0) {
        statusCode = await this.registrar();
      }
      if (this.entidad.tipoDeIncidenciaId > 0) {
        statusCode = await this.editar();
      }
      await this.fetchGetTiposDeIncidencia();
      this.setTotalRows(this.tiposDeIncidencia.length);
      this.$bvModal.hide("tipo-de-incidencia-form-modal");

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
      return await this.fetchPostAddTipoDeIncidencia(this.entidad);
    },
    async editar() {
      return await this.fetchPutEditTipoDeIncidencia(this.entidad);
    },
  },
  mounted() {
    this.fillTiposDeServicioOptions();
    this.entidad = JSON.parse(JSON.stringify(this.tipoDeIncidencia));
    this.tipoDeServicioSelected = this.entidad.tipoDeServicio.tipoDeServicioId;
  },
};
</script>
