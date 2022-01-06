<template>
  <div class="cliente-form">
    <b-form @submit.prevent="guardar">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-form-group label="Id:">
            <b-form-input
              v-model="entidad.clienteId"
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
          <b-form-group label="Fecha de Nacimiento:">
            <b-form-input
              v-model="entidad.fechaDeNacimiento"
              type="date"
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
          <b-form-group label="N° Telefono Fijo:">
            <b-form-input
              v-model="entidad.nroDeTelefonoFijo"
              type="number"
              size="sm"
              placeholder="0000000"
              required
              trim
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-6">
          <b-form-group label="Direccion:">
            <b-form-input
              v-model="entidad.direccion"
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
              :options="tipoDeServicioOptions"
              size="sm"
              value-field="tipoDeServicioId"
              text-field="nombre"
              required
            ></b-form-select>
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
      <p class="lead mt-4 font-weight-normal">
        Ubicación del domicilio, según Google Maps
      </p>
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-form-group label="Dirección:">
            <b-form-input
              v-model="entidad.usuario.ubicacion.direccion"
              type="text"
              size="sm"
              placeholder="Escriba aquí"
              required
              trim
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-form-group label="Latitud:">
            <b-form-input
              v-model="entidad.usuario.ubicacion.latitud"
              type="text"
              size="sm"
              placeholder="Escriba aquí"
              required
              trim
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <b-form-group label="Longitud:">
            <b-form-input
              v-model="entidad.usuario.ubicacion.longitud"
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
  name: "ClienteForm",
  data() {
    return {
      entidad: {},
      tipoDeServicioSelected: null,
      sedeSelected: null,
      sexos: [
        { value: null, text: "Seleccione" },
        { value: "M", text: "Masculino" },
        { value: "F", text: "Femenino" },
      ],
      tipoDeServicioOptions: [],
      sedeOptions: [],
    };
  },
  computed: {
    ...mapGetters(["cliente", "clientes", "tiposDeServicio", "sedes"]),
  },
  methods: {
    ...mapMutations(["setCliente", "setTotalRows"]),
    ...mapActions([
      "fetchPostAddCliente",
      "fetchPutEditCliente",
      "fetchGetClientes",
      "fetchGetTiposDeServicio",
      "fetchGetSedes",
    ]),
    async fillTipoDeServicioOptions() {
      await this.fetchGetTiposDeServicio();
      this.tipoDeServicioOptions = this.tiposDeServicio;
      this.tipoDeServicioOptions.unshift({
        tipoDeServicioId: null,
        nombre: "Seleccione",
      });
    },
    async fillSedeOptions() {
      await this.fetchGetSedes();
      this.sedeOptions = this.sedes;
      this.sedeOptions.unshift({
        sedeId: null,
        nombre: "Seleccione",
      });
    },
    async guardar() {
      this.entidad.tipoDeServicio.tipoDeServicioId =
        this.tipoDeServicioSelected;
      this.entidad.usuario.sede.sedeId = this.sedeSelected;
      let statusCode = 0;

      if (this.entidad.clienteId <= 0) {
        this.completarDatosPorDefecto();
        statusCode = await this.registrar();
      }
      if (this.entidad.clienteId > 0) {
        statusCode = await this.editar();
      }
      await this.fetchGetClientes();
      this.setTotalRows(this.clientes.length);
      this.$bvModal.hide("cliente-form-modal");

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
      return await this.fetchPostAddCliente(this.entidad);
    },
    async editar() {
      return await this.fetchPutEditCliente(this.entidad);
    },
    completarDatosPorDefecto() {
      this.entidad.usuario.nombreDeUsuario = this.entidad.dni;
      this.entidad.usuario.contrasenia = this.generarContraseña();
    },
    generarContraseña() {
      let cliente = this.entidad;
      return cliente.nombres.split(" ")[0];
    },
  },
  created() {
    this.entidad = JSON.parse(JSON.stringify(this.cliente));
  },
  mounted() {
    this.fillTipoDeServicioOptions();
    this.fillSedeOptions();
    this.tipoDeServicioSelected = this.entidad.tipoDeServicio.tipoDeServicioId;
    this.sedeSelected = this.entidad.usuario.sede.sedeId;
  },
};
</script>
