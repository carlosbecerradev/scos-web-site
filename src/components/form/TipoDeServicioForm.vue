<template>
  <div class="tipo-de-servicio-form">
    <b-form @submit.prevent="guardar">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-form-group label="Id:">
            <b-form-input
              v-model="entidad.tipoDeServicioId"
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
  name: "TipoDeServicioForm",
  data() {
    return {
      entidad: {},
      stateOptions: [
        { value: true, text: "Si" },
        { value: false, text: "No" },
      ],
    };
  },
  computed: {
    ...mapGetters(["tipoDeServicio", "tiposDeServicio"]),
  },
  methods: {
    ...mapMutations(["setTipoDeServicio", "setTotalRows"]),
    ...mapActions([
      "fetchPostAddTipoDeServicio",
      "fetchPutEditTipoDeServicio",
      "fetchGetTiposDeServicio",
    ]),
    async guardar() {
      let statusCode = 0;
      if (this.entidad.tipoDeServicioId <= 0) {
        statusCode = await this.registrar();
      }
      if (this.entidad.tipoDeServicioId > 0) {
        statusCode = await this.editar();
      }

      await this.fetchGetTiposDeServicio();
      this.setTotalRows(this.tiposDeServicio.length);
      this.$bvModal.hide("tipo-de-servicio-form-modal");

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
      return await this.fetchPostAddTipoDeServicio(this.entidad);
    },
    async editar() {
      return await this.fetchPutEditTipoDeServicio(this.entidad);
    },
  },
  mounted() {
    this.entidad = JSON.parse(JSON.stringify(this.tipoDeServicio));
  },
};
</script>
