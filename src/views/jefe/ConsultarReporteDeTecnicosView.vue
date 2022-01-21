<template>
  <div class="consultar-reporte-de-tecnicos-view">
    <jefe-layout>
      <div class="mt-5 mb-4">
        <h2 class="text-xl">
          Reporte de Atención en la Resolución de Órdenes de Servicio
        </h2>
      </div>

      <div class="d-flex">
        <b-form-group class="col-12 col-md-8">
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              placeholder="Filtrar por N° de carnet, técnico, tipo de incidencia o fecha"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">X</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

        <download-excel
          class="btn btn-success btn-sm mb-3 ml-auto"
          :data="reporteData"
          :fields="json_fields"
          type="xlsx"
          name="nombre_de_archivo.xls"
        >
          Exportar Excel
        </download-excel>
      </div>

      <b-table
        id="reporte-tecnicos-table"
        hover
        small
        responsive
        :fields="fields"
        :items="json_data"
        :per-page="perPage"
        :current-page="currentPage"
        @filtered="onFiltered"
        :filter="filter"
        :filter-included-fields="filterOn"
      >
      </b-table>

      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="center"
        size="sm"
      >
      </b-pagination>
    </jefe-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import JefeLayout from "@/layout/JefeLayout.vue";

export default {
  name: "ConsultarReporteDeTecnicosView",
  components: {
    JefeLayout,
  },
  data() {
    return {
      filter: null,
      filterOn: [
        "nroDeCarnet",
        "tecnico",
        "fechaDeCreacion",
        "tipoDeIncidencia",
      ],
      json_fields: {
        Id: "ordenId",
        "Tipo de Incidencia": "tipoDeIncidencia",
        Técnico: "tecnico",
        "N° de Carnet": "nroDeCarnet",
        Cliente: "cliente",
        "F. Creación": "fechaDeCreacion",
        "Duración de Espera (min)": "duracionDeEspera",
        "Duración de Llegada (min)": "duracionDeRecorrido",
        "Duración de Resolución (min)": "duracionDeResolucion",
        "Duración de Encuesta (min)": "duracionDeEncuesta",
        Valoracion: "valoracion",
        Estado: "estado",
      },
      json_data: [],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
      fields: [
        { key: "ordenId", label: "Id" },
        {
          key: "tipoDeIncidencia",
          label: "Tipo de Incidencia",
          sortable: true,
        },
        { key: "nroDeCarnet", label: "N° de Carnet" },
        { key: "tecnico", label: "Técnico", sortable: true },
        { key: "cliente", label: "Cliente" },
        { key: "fechaDeCreacion", label: "F. Creación" },
        {
          key: "duracionDeEspera",
          label: "Duración de Espera (min)",
          class: "text-center",
        },
        {
          key: "duracionDeRecorrido",
          label: "Duración de Llegada (min)",
          class: "text-center",
        },
        {
          key: "duracionDeResolucion",
          label: "Duración de Resolución (min)",
          class: "text-center",
        },
        {
          key: "duracionDeEncuesta",
          label: "Duración de Encuesta (min)",
          class: "text-center",
        },
        { key: "valoracion", label: "Valoracion", sortable: true },
        { key: "estado", label: "Estado" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 6,
      reporteData: [],
    };
  },
  computed: {
    ...mapGetters(["miSede", "apiBaseURL", "JWT"]),
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
      this.reporteData = filteredItems;
    },
    async fetchReporte() {
      try {
        const response = await fetch(
          this.apiBaseURL + "/v1/reporte/tecnicos/sede/" + this.miSede,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + this.JWT,
            },
          }
        );
        if (response.status == 200) {
          const data = await response.json();
          this.json_data = data;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  async mounted() {
    await this.fetchReporte();
    this.totalRows = this.json_data.length;
    this.reporteData = this.json_data;
  },
};
</script>
