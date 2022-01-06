<template>
  <div class="sede-form">
    <b-form @submit.prevent="guardar">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-form-group label="Id:">
            <b-form-input
              v-model="sedeActual.sedeId"
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
              v-model="sedeActual.nombre"
              type="text"
              size="sm"
              placeholder="Escriba ..."
              required
              trim
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-form-group label="Activo:">
            <b-form-select
              v-model="sedeActual.activo"
              :options="stateOptions"
              size="sm"
            ></b-form-select>
          </b-form-group>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-button variant="purple" type="submit" block size="sm"
            >Guardar</b-button
          >
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "SedeForm",
  data() {
    return {
      sedeActual: {},
      stateOptions: [
        { value: true, text: "Si" },
        { value: false, text: "No" },
      ],
    };
  },
  computed: {
    ...mapGetters(["sede", "sedes"]),
  },
  methods: {
    ...mapMutations(["setSede", "setTotalRows"]),
    ...mapActions(["fetchPostAddSede", "fetchPutEditSede", "fetchGetSedes"]),
    async guardar() {
      let statusCode = 0;
      if (this.sedeActual.sedeId <= 0) {
        statusCode = await this.registrar();
      }
      if (this.sedeActual.sedeId > 0) {
        statusCode = await this.editar();
      }

      await this.fetchGetSedes();
      this.setTotalRows(this.sedes.length);
      this.$bvModal.hide("sede-form-modal");

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
      return await this.fetchPostAddSede(this.sedeActual);
    },
    async editar() {
      return await this.fetchPutEditSede(this.sedeActual);
    },
  },
  mounted() {
    this.sedeActual = JSON.parse(JSON.stringify(this.sede));
  },
};
</script>
