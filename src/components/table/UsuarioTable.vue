<template>
  <div class="usuario-table">
    <b-button
      @click="cleanUsuario()"
      variant="outline-purple"
      v-b-modal="'usuario-form-modal'"
      class="mb-4"
      size="sm"
      >Agregar nuevo
    </b-button>

    <div class="usuario-filter-table row">
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
      id="usuario-table"
      hover
      small
      responsive
      bordered
      :fields="fields"
      :items="usuarios"
      :per-page="perPage"
      :current-page="currentPage"
      @filtered="onFiltered"
      :filter="filter"
      :filter-included-fields="filterOn"
    >
      <template #cell(actions)="row">
        <div class="d-flex">
          <button
            @click="edit(row.item)"
            v-b-modal="'usuario-form-modal'"
            class="btn btn-outline-warning btn-sm mr-1"
          >
            Editar
          </button>
          <button
            @click="deleteById(row.item.usuarioId)"
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
  name: "UsuarioTable",
  data() {
    return {
      currentPage: 1,
      filter: null,
      filterOn: ["nombreDeUsuario"],
      fields: [
        { key: "usuarioId", label: "Id" },
        { key: "nombreDeUsuario", label: "Nombre de Usuario" },
        { key: "rol", label: "Rol" },
        { key: "sede.nombre", label: "Sede" },
        { key: "tokenDeNotificacion", label: "Token de Notificación" },
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
        },
        { key: "actions", label: "Acciones" },
      ],
    };
  },
  computed: {
    ...mapGetters(["usuarios", "totalRows", "perPage"]),
  },
  methods: {
    ...mapMutations(["setUsuario", "setTotalRows", "cleanUsuario"]),
    ...mapActions(["fetchGetUsuarios", "fetchDeleteDeleteUsuario"]),
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.setTotalRows(filteredItems.length);
      this.currentPage = 1;
    },
    async edit(item) {
      this.setUsuario(item);
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
            let statusCode = await this.fetchDeleteDeleteUsuario(id);
            if (statusCode == 200) {
              this.fillTable();
              this.$swal.fire({ title: "Registro eliminado", icon: "success" });
            }
          }
        });
    },
    async fillTable() {
      await this.fetchGetUsuarios();
      this.setTotalRows(this.usuarios.length);
    },
  },
  mounted() {
    this.fillTable();
  },
};
</script>
