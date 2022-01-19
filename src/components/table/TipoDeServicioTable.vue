<template>
  <div class="tipo-de-servicio-table">
    <b-button
      @click="cleanTipoDeServicio()"
      variant="outline-purple"
      v-b-modal="'tipo-de-servicio-form-modal'"
      class="mb-4"
      size="sm"
      >Agregar nuevo
    </b-button>

    <div class="tipo-de-servicio-filter-table row">
      <b-form-group class="col-12 col-md-4">
        <b-input-group size="sm">
          <b-form-input
            v-model="filter"
            type="search"
            placeholder="Filtrar por nombre"
          ></b-form-input>
          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">X</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </div>

    <b-table
      id="tipo-de-servicio-table"
      hover
      small
      responsive
      :fields="fields"
      :items="tiposDeServicio"
      :per-page="perPage"
      :current-page="currentPage"
      @filtered="onFiltered"
      :filter="filter"
      :filter-included-fields="filterOn"
    >
      <!-- A virtual composite column -->
      <template #cell(actions)="row">
        <div class="d-flex">
          <button
            @click="edit(row.item)"
            v-b-modal="'tipo-de-servicio-form-modal'"
            class="btn btn-outline-warning btn-sm mr-1"
          >
            Editar
          </button>
          <button
            @click="deleteById(row.item.tipoDeServicioId)"
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
  name: "TipoDeServicioTable",
  data() {
    return {
      currentPage: 1,
      filter: null,
      filterOn: ["nombre"],
      fields: [
        { key: "tipoDeServicioId", label: "Id" },
        { key: "nombre", label: "Nombres" },
        {
          key: "activo",
          label: "Activo",
          formatter: (value) => {
            return value ? "Si" : "No";
          },
        },
        {
          key: "fechaDeCreacion",
          label: "F. Creación",
          formatter: (value) => {
            return value.replace("T", " ");
          },
        },
        { key: "actions", label: "Acciones" },
      ],
    };
  },
  computed: {
    ...mapGetters(["tiposDeServicio", "totalRows", "perPage"]),
  },
  methods: {
    ...mapMutations([
      "setTipoDeServicio",
      "setTotalRows",
      "cleanTipoDeServicio",
    ]),
    ...mapActions([
      "fetchGetTiposDeServicio",
      "fetchDeleteDeleteTipoDeServicio",
    ]),
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.setTotalRows(filteredItems.length);
      this.currentPage = 1;
    },
    async edit(item) {
      this.setTipoDeServicio(item);
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
            let statusCode = await this.fetchDeleteDeleteTipoDeServicio(id);
            if (statusCode == 200) {
              this.fillTable();
              this.$swal.fire({ title: "Registro eliminado", icon: "success" });
            }
          }
        });
    },
    async fillTable() {
      await this.fetchGetTiposDeServicio();
      this.setTotalRows(this.tiposDeServicio.length);
    },
  },
  mounted() {
    this.fillTable();
  },
};
</script>
