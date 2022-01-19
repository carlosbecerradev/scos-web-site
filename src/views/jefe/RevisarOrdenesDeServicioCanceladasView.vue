<template>
  <div class="revisar-ordenes-de-servicio-canceladas-view">
    <jefe-layout>
      <div class="mt-5">
        <h2 class="text-xl">Órdenes de Servicio Canceladas</h2>
      </div>

      <div class="my-4">
        <b-tabs v-model="tabIndex" content-class="mt-3">
          <b-tab title="Hoy" @click="hoy()"></b-tab>
          <b-tab title="Mes" @click="mes()"></b-tab>
          <b-tab title="Todas" active @click="todas()"></b-tab>
        </b-tabs>
      </div>

      <b-table
        id="ordenes-canceladas-table"
        hover
        small
        responsive
        :fields="fields"
        :items="ordenes"
        :per-page="perPage"
        :current-page="currentPage"
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
            <b-button @click="revisar(row.item.id)" variant="purple" size="sm">
              Revisar
            </b-button>
          </div>
        </template>
        <template #row-details="row">
          <b-card>
            <b-list-group>
              <b-list-group-item>
                <span class="text-purple">Estado: </span> {{ row.item.estado }}
              </b-list-group-item>
              <b-list-group-item>
                <span class="text-purple">Fecha de Creación: </span>
                {{ row.item.fechaDeCreacion }}
              </b-list-group-item>
              <b-list-group-item>
                <span class="text-purple">Fecha de Asignación: </span>
                {{ row.item.fechaDeAsignacion }}
              </b-list-group-item>
              <b-list-group-item v-if="row.item.fechaDeLlegada != null">
                <span class="text-purple">Fecha de Visita: </span>
                {{ row.item.fechaDeLlegada }}
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
              <b-list-group-item>
                <b-link @click="verEmpleado(row.item)"
                  >Ver Datos del Técnico</b-link
                >
              </b-list-group-item>
              <b-list-group-item>
                <b-link @click="verConstanciaDeVisita(row.item)"
                  >Ver Constancia de Visita</b-link
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

      <b-modal id="constancia-modal" hide-footer title="Constancia de Visita">
        <div
          v-if="constanciaDeVisita != null"
          class="d-flex justify-content-center"
        >
          <b-list-group flush>
            <b-list-group-item>
              <span class="text-purple">Fecha y Hora</span>
              {{ constanciaDeVisita.fechaDeCreacion }}
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
    </jefe-layout>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

import JefeLayout from "@/layout/JefeLayout.vue";
import ClienteInfoModal from "../../components/modal/ClienteInfoModal.vue";
import TecnicoInfoModal from "../../components/modal/TecnicoInfoModal.vue";

export default {
  name: "RevisarOrdenesDeServicioCanceladasView",
  components: {
    JefeLayout,
    ClienteInfoModal,
    TecnicoInfoModal,
  },
  data() {
    return {
      ordenes: [],
      ordenSelected: {},
      currentPage: 1,
      tabIndex: 0,
      fields: [
        { key: "id", label: "Id" },
        { key: "tipoDeIncidencia", label: "Tipo de Incidencia" },
        { key: "descripcionDelProblema", label: "Descripción" },
        { key: "motivoDeCancelacion", label: "Motivo" },
        {
          key: "fechaDeCancelacion",
          label: "Fecha de Cancelación",
          formatter: (value) => {
            return value.replace("T", " ");
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
      "ordenesDeServicioCanceladas",
    ]),
  },
  methods: {
    ...mapMutations(["setTotalRows", "setConstanciaDeVisita"]),
    ...mapActions([
      "fetchGetOrdenesDeServicioCanceladasHoy",
      "fetchGetOrdenesDeServicioCanceladasMes",
      "fetchGetOrdenesDeServicioCanceladasTodas",
      "fetchGetConstanciaDeVisita",
      "fetchPutRevisarOrdenDeServicio",
    ]),
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
    async fillTable() {
      await this.fetchGetOrdenesDeServicioCanceladasTodas();
      this.ordenes = this.ordenesDeServicioCanceladas;
      this.setTotalRows(this.ordenesDeServicioCanceladas.length);
    },
    async hoy() {
      await this.fetchGetOrdenesDeServicioCanceladasHoy();
      this.ordenes = this.ordenesDeServicioCanceladas;
      this.setTotalRows(this.ordenesDeServicioCanceladas.length);
    },
    async mes() {
      await this.fetchGetOrdenesDeServicioCanceladasMes();
      this.ordenes = this.ordenesDeServicioCanceladas;
      this.setTotalRows(this.ordenesDeServicioCanceladas.length);
    },
    todas() {
      this.fillTable();
    },
    async revisar(orden_de_servicio_id) {
      this.$swal
        .fire({
          title: "¿Está seguro?",
          text: "No podrás revertir esta acción!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Si, marcar como revisada!",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            let statusCode = await this.fetchPutRevisarOrdenDeServicio(
              orden_de_servicio_id
            );
            if (statusCode == 200) {
              this.fillTable();
              this.$swal.fire({
                title: "Se marco como revisada!",
                icon: "success",
              });
            }
            this.tabIndex = 2;
          }
        });
    },
  },
  mounted() {
    this.fillTable();
  },
};
</script>
