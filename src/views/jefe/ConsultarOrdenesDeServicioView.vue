<template>
  <div class="revisar-ordenes-de-servicio-resueltas-view">
    <jefe-layout>
      <div class="mt-5">
        <h2 class="text-xl">Consultar Órdenes de Servicio</h2>
      </div>

      <b-form-group class="mt-5">
        <b-input-group size="sm">
          <b-form-input
            v-model="filter"
            type="search"
            placeholder="Filtrar por Id, estado o fecha de creación (yyyy-MM-dd)"
          ></b-form-input>
          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">X</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>

      <b-table
        id="ordenes-resueltas-table"
        hover
        small
        responsive
        :fields="fields"
        :items="ordenes"
        :per-page="perPage"
        :current-page="currentPage"
        @filtered="onFiltered"
        :filter="filter"
        :filter-included-fields="filterOn"
      >
        <template #cell(actions)="row">
          <div class="d-flex">
            <b-button
              @click="row.toggleDetails"
              variant="info"
              size="sm"
              class="mr-1"
            >
              {{ row.detailsShowing ? "Esconder" : "Detalle" }}
            </b-button>
          </div>
        </template>
        <template #row-details="row">
          <b-card>
            <b-list-group>
              <b-list-group-item v-if="row.item.fechaDeAsignacion != null">
                <span class="text-purple">Fecha de Asignación: </span>
                {{ row.item.fechaDeAsignacion.replace("T", " ") }}
              </b-list-group-item>
              <b-list-group-item v-if="row.item.fechaDeLlegada != null">
                <span class="text-purple">Fecha de Visita: </span>
                {{ row.item.fechaDeLlegada.replace("T", " ") }}
              </b-list-group-item>
              <b-list-group-item v-if="row.item.fechaDeResolucion != null">
                <span class="text-purple">Fecha de Resolución: </span>
                {{ row.item.fechaDeResolucion.replace("T", " ") }}
              </b-list-group-item>
              <b-list-group-item v-if="row.item.fechaDeCierre != null">
                <span class="text-purple">Fecha de Cierre: </span>
                {{ row.item.fechaDeCierre.replace("T", " ") }}
              </b-list-group-item>
              <b-list-group-item>
                <b-link
                  v-if="row.item.imagenUrl"
                  v-b-modal="'orden-imagen-modal'"
                  @click="ordenSelected = row.item"
                  >Ver Imagen del Problema</b-link
                >
              </b-list-group-item>
              <b-list-group-item>
                <b-link @click="verCliente(row.item)"
                  >Ver Datos del Cliente</b-link
                >
              </b-list-group-item>
              <b-list-group-item v-if="row.item.tecnico != null">
                <b-link @click="verEmpleado(row.item)"
                  >Ver Datos del Técnico</b-link
                >
              </b-list-group-item>
              <b-list-group-item v-if="row.item.fechaDeLlegada != null">
                <b-link @click="verConstanciaDeVisita(row.item)"
                  >Ver Constancia de Visita</b-link
                >
              </b-list-group-item>
              <b-list-group-item v-if="row.item.fechaDeCierre != null">
                <b-link @click="verEncuestaDeAtencion(row.item)"
                  >Ver Encuesta de Atención</b-link
                >
              </b-list-group-item>
            </b-list-group>
          </b-card>
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

      <cliente-info-modal :orden="ordenSelected"></cliente-info-modal>

      <tecnico-info-modal :orden="ordenSelected"></tecnico-info-modal>

      <!-- Constancia modal -->
      <b-modal id="constancia-modal" hide-footer title="Constancia de Visita">
        <div
          v-if="constanciaDeVisita != null"
          class="d-flex justify-content-center"
        >
          <b-list-group flush>
            <b-list-group-item>
              <span class="text-purple">Fecha y Hora</span>
              {{ constanciaDeVisita.fechaDeCreacion.replace("T", " ") }}
            </b-list-group-item>
            <b-list-group-item>
              <b-img
                :src="constanciaDeVisita.imagenUrl"
                fluid-grow
                alt="Constancia de Visita"
              />
            </b-list-group-item>
          </b-list-group>
        </div>
        <div v-else>No hay constancia</div>
      </b-modal>

      <!-- Imagen del problema -->
      <b-modal id="orden-imagen-modal" hide-footer title="Imagen del Problema">
        <div
          v-if="ordenSelected.imagenUrl != null"
          class="d-flex justify-content-center"
        >
          <b-img
            :src="ordenSelected.imagenUrl"
            fluid-grow
            alt="Foto del problema"
          />
        </div>
        <div v-else>No hay imagen</div>
      </b-modal>

      <!-- Encuesta modal -->
      <b-modal
        id="encuesta-de-atencion-modal"
        hide-footer
        title="Encuesta de Atención"
      >
        <div
          v-if="encuestaDeAtencion != null"
          class="d-flex justify-content-center"
        >
          <b-list-group flush>
            <b-list-group-item>
              <span class="text-purple">Fecha y Hora</span>
              {{ encuestaDeAtencion.fechaDeCreacion.replace("T", " ") }}
            </b-list-group-item>
            <b-list-group-item>
              <span class="text-purple">Valoracion</span>
              {{ encuestaDeAtencion.valoracion }}
            </b-list-group-item>
            <b-list-group-item>
              <span class="text-purple">Observacion</span>
              {{ encuestaDeAtencion.observacion }}
            </b-list-group-item>
            <b-list-group-item>
              <span class="text-purple">¿Fue omitida?</span>
              {{ encuestaDeAtencion.omitida ? "Si" : "No" }}
            </b-list-group-item>
          </b-list-group>
        </div>
        <div v-else>No hay encuesta de atención</div>
      </b-modal>
    </jefe-layout>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

import JefeLayout from "@/layout/JefeLayout.vue";
import ClienteInfoModal from "../../components/modal/ClienteInfoModal.vue";
import TecnicoInfoModal from "../../components/modal/TecnicoInfoModal.vue";

export default {
  name: "RevisarOrdenesDeServicioResueltasView",
  components: {
    JefeLayout,
    ClienteInfoModal,
    TecnicoInfoModal,
  },
  data() {
    return {
      filter: null,
      filterOn: ["id", "estado", "fechaDeCreacion"],
      ordenes: [],
      ordenSelected: {},
      currentPage: 1,
      tabIndex: 0,
      fields: [
        { key: "id", label: "Id" },
        {
          key: "tipoDeIncidencia",
          label: "Tipo de Incidencia",
          sortable: true,
        },
        { key: "descripcionDelProblema", label: "Descripción" },
        { key: "estado", label: "Estado", sortable: true },
        {
          key: "fechaDeCreacion",
          label: "Fecha de Creación",
          formatter: (value) => {
            return value != null ? value.replace("T", " ") : "";
          },
        },
        { key: "actions", label: "Acciones" },
      ],
    };
  },
  computed: {
    ...mapGetters([
      "totalRows",
      "perPage",
      "constanciaDeVisita",
      "ordenesDeServicio",
      "encuestaDeAtencion",
    ]),
  },
  methods: {
    ...mapMutations([
      "setTotalRows",
      "setEncuestaDeAtencion",
      "setConstanciaDeVisita",
    ]),
    ...mapActions([
      "fetchGetOrdenesDeServicio",
      "fetchGetConstanciaDeVisita",
      "fetchGetEncuestaDeAtencion",
    ]),
    onFiltered(filteredItems) {
      this.setTotalRows(filteredItems.length);
      this.currentPage = 1;
    },
    verCliente(orden) {
      this.ordenSelected = orden;
      this.$bvModal.show("cliente-info-modal");
    },
    verEmpleado(orden) {
      this.ordenSelected = orden;
      this.$bvModal.show("tecnico-info-modal");
    },
    async verConstanciaDeVisita(orden) {
      let id = orden.id;
      this.setConstanciaDeVisita(null);
      await this.fetchGetConstanciaDeVisita(id);
      this.$bvModal.show("constancia-modal");
    },
    async verEncuestaDeAtencion(orden) {
      let id = orden.id;
      this.setEncuestaDeAtencion(null);
      await this.fetchGetEncuestaDeAtencion(id);
      this.$bvModal.show("encuesta-de-atencion-modal");
    },
    async fillTable() {
      await this.fetchGetOrdenesDeServicio();
      this.ordenes = this.ordenesDeServicio;
      this.setTotalRows(this.ordenesDeServicio.length);
    },
    todas() {
      this.fillTable();
    },
  },
  mounted() {
    this.fillTable();
  },
};
</script>
