<template>
  <div class="empleado-table">
    <b-button
      variant="outline-purple"
      v-b-modal="'empleado-form-modal'"
      class="mb-4"
      @click="cleanEmpleado()"
      size="sm"
      >Agregar nuevo
    </b-button>

    <div class="empleado-filter-table row">
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
      id="empleado-table"
      hover
      small
      responsive
      :fields="fields"
      :items="empleados"
      :per-page="perPage"
      :current-page="currentPage"
      @filtered="onFiltered"
      :filter="filter"
      :filter-included-fields="filterOn"
    >
      <template #cell(fotoUrl)="row">
        <a
          @click="empleadoSelected = row.item"
          v-b-modal="'empleado-foto-form-modal'"
          class="btn-sm"
          >Ver
        </a>
      </template>

      <template #cell(actions)="row">
        <div class="d-flex">
          <a
            v-if="row.item.usuario.ubicacion != null"
            :href="
              'https://www.google.com/maps/@' +
              row.item.usuario.ubicacion.latitud +
              ',' +
              row.item.usuario.ubicacion.longitud +
              ',22z'
            "
            target="_blank"
            class="btn btn-outline-info btn-sm mr-1"
            >Ubicar
          </a>
          <button
            @click="edit(row.item)"
            v-b-modal="'empleado-form-modal'"
            class="btn btn-outline-warning btn-sm mr-1"
          >
            Editar
          </button>
          <button
            @click="deleteById(row.item.empleadoId)"
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

    <b-modal
      id="empleado-foto-form-modal"
      hide-footer
      :title="empleadoSelected.nombres + ' ' + empleadoSelected.apellidos"
    >
      <div class="d-flex justify-content-center">
        <b-img
          :src="empleadoSelected.fotoUrl"
          fluid-grow
          alt="Foto del empleado seleccionado"
        />
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "EmpleadoTable",
  data() {
    return {
      currentPage: 1,
      filter: null,
      filterOn: ["nombres", "apellidos", "dni"],
      fields: [
        { key: "empleadoId", label: "Id" },
        { key: "nombres", label: "Nombres" },
        { key: "apellidos", label: "Apellidos" },
        { key: "nroDeCarnet", label: "N° de Carnet" },
        { key: "sexo", label: "Sexo" },
        { key: "dni", label: "DNI" },
        { key: "nroDeTelefonoMovil", label: "N° Telef. Móvil" },
        { key: "usuario.sede.nombre", label: "Sede" },
        { key: "estado", label: "Estado" },
        { key: "fotoUrl", label: "Foto" },
        { key: "actions", label: "Acciones" },
      ],
      empleadoSelected: {
        nombres: "",
        apellidos: "",
        fotoUrl: "",
      },
    };
  },
  computed: {
    ...mapGetters(["empleados", "totalRows", "perPage"]),
  },
  methods: {
    ...mapMutations(["setEmpleado", "setTotalRows", "cleanEmpleado"]),
    ...mapActions(["fetchGetEmpleados", "fetchDeleteDeleteEmpleado"]),
    onFiltered(filteredItems) {
      this.setTotalRows(filteredItems.length);
      this.currentPage = 1;
    },
    async edit(item) {
      this.setEmpleado(item);
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
            let statusCode = await this.fetchDeleteDeleteEmpleado(id);
            if (statusCode == 200) {
              this.fillTable();
              this.$swal.fire({ title: "Registro eliminado", icon: "success" });
            }
          }
        });
    },
    async fillTable() {
      await this.fetchGetEmpleados();
      this.setTotalRows(this.empleados.length);
    },
  },
  mounted() {
    this.fillTable();
  },
};
</script>
