<template>
  <div class="cliente-table">
    <b-button
      variant="outline-purple"
      v-b-modal="'cliente-form-modal'"
      class="mb-4"
      @click="cleanCliente()"
      size="sm"
      >Agregar nuevo</b-button
    >

    <div class="cliente-filter-table row">
      <b-form-group class="col-12 col-md-5">
        <b-input-group size="sm">
          <b-form-input
            v-model="filter"
            type="search"
            placeholder="Filtrar por nombres, apellidos o DNI ..."
          ></b-form-input>
        </b-input-group>
      </b-form-group>
    </div>

    <b-table
      id="cliente-table"
      hover
      small
      responsive
      :fields="fields"
      :items="clientes"
      :per-page="perPage"
      :current-page="currentPage"
      @filtered="onFiltered"
      :filter="filter"
      :filter-included-fields="filterOn"
    >
      <!-- A virtual composite column -->
      <template #cell(actions)="row">
        <div class="d-flex">
          <a
            :href="
              'https://www.google.com/maps/@' +
              row.item.usuario.ubicacion.latitud +
              ',' +
              row.item.usuario.ubicacion.longitud +
              ',22z'
            "
            target="_blank"
            class="btn btn-outline-info btn-sm mr-1"
            >Ubicar</a
          >
          <button
            @click="edit(row.item)"
            v-b-modal="'cliente-form-modal'"
            class="btn btn-outline-warning btn-sm mr-1"
          >
            Editar
          </button>
          <button
            @click="deleteById(row.item.clienteId)"
            class="btn btn-outline-danger btn-sm"
          >
            Eliminar
          </button>
        </div>
      </template>
    </b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      align="center"
      size="sm"
    >
    </b-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "ClienteTable",
  data() {
    return {
      currentPage: 1,
      filter: null,
      filterOn: ["nombres", "apellidos", "dni"],
      fields: [
        { key: "clienteId", label: "Id" },
        { key: "nombres", label: "Nombres" },
        { key: "apellidos", label: "Apellidos" },
        { key: "fechaDeNacimiento", label: "Fecha de Nacimiento" },
        { key: "sexo", label: "sexo" },
        { key: "dni", label: "DNI" },
        { key: "nroDeTelefonoMovil", label: "N° Telef. Móvil" },
        { key: "nroDeTelefonoFijo", label: "N° Telef. Fijo" },
        { key: "direccion", label: "Dirección" },
        { key: "usuario.sede.nombre", label: "Sede" },
        { key: "tipoDeServicio.nombre", label: "Tipo de Servicio" },
        { key: "actions", label: "Acciones" },
      ],
    };
  },
  computed: {
    ...mapGetters(["clientes", "totalRows", "perPage"]),
  },
  methods: {
    ...mapMutations(["setCliente", "setTotalRows", "cleanCliente"]),
    ...mapActions(["fetchGetClientes", "fetchDeleteDeleteCliente"]),
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.setTotalRows(filteredItems.length);
      this.currentPage = 1;
    },
    async edit(item) {
      this.setCliente(item);
    },
    async deleteById(id) {
      this.$swal
        .fire({
          title: "¿Está seguro?",
          text: "No podrás revertir esta acción!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Si, eliminar!",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            let statusCode = await this.fetchDeleteDeleteCliente(id);
            if (statusCode == 200) {
              this.fillTable();
              this.$swal.fire({ title: "Registro eliminado", icon: "success" });
            }
          }
        });
    },
    async fillTable() {
      await this.fetchGetClientes();
      this.setTotalRows(this.clientes.length);
    },
  },
  mounted() {
    this.fillTable();
  },
};
</script>
