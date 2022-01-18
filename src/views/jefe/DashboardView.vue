<template>
  <div class="jefe-dashboard-view">
    <jefe-layout>
      <div class="my-5">
        <h2 class="text-xl">Dashboard</h2>
      </div>

      <div class="container-fluid my-5">
        <div class="row">
          <div class="col-12 col-md-6">
            <p class="lead font-weight-bold">Órdenes de Servicio Resueltas</p>
            <line-chart
              :chart-data="datacollectionOrdenesResueltasPorMesesSeleccionados"
              :options="lineChartOptions"
            ></line-chart>
          </div>

          <div class="col-12 col-md-6">
            <p class="lead font-weight-bold">Órdenes de Servicio Canceladas</p>
            <line-chart
              :chart-data="datacollectionOrdenesCanceladasPorMesesSeleccionados"
              :options="lineChartOptions"
            ></line-chart>
          </div>

          <div class="col-12 col-md-6">
            <p class="mt-5 lead font-weight-bold">Técnicos por su Estado</p>
            <bar-chart
              :chart-data="dataCollectionTecnicosXEstado"
              :options="barChartOptions"
            ></bar-chart>
          </div>

          <div class="col-12 col-md-6">
            <p class="mt-5 lead font-weight-bold">
              Órdenes de Servicio de Hoy por su Estado
            </p>
            <bar-chart
              :chart-data="dataCollectionOrdenesDeHoyXEstado"
              :options="barChartOptions"
            ></bar-chart>
          </div>
        </div>
      </div>
    </jefe-layout>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import JefeLayout from "@/layout/JefeLayout.vue";
import LineChart from "../../components/charts/LineChart.vue";
import BarChart from "../../components/charts/BarChart.vue";

export default {
  name: "DashboardView",
  components: {
    JefeLayout,
    LineChart,
    BarChart,
  },
  data() {
    return {
      datacollectionOrdenesResueltasPorMesesSeleccionados: {},
      datacollectionOrdenesCanceladasPorMesesSeleccionados: {},
      cantidadDeMesesSeleccionados: 4,
      dataOrdenesCanceladas: [],
      dataOrdenesResueltas: [],
      lineChartOptions: {
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0, // disables bezier curves
          },
        },
      },
      labels: [],
      meses: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Setiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      dataCollectionTecnicosXEstado: {},
      dataCollectionOrdenesDeHoyXEstado: {},
      barChartOptions: {
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  },
  computed: {
    ...mapGetters(["ordenesDeServicio", "empleados", "miSede"]),
  },
  methods: {
    ...mapActions(["fetchGetOrdenesDeServicio", "fetchGetEmpleados"]),
    fillLabelsPorMesesSeleccionados() {
      let fechaActual = new Date();
      let mesActual = fechaActual.getMonth();
      for (let index = 0; index < this.cantidadDeMesesSeleccionados; index++) {
        let diferencia = mesActual - index;
        if (diferencia < 0) {
          this.labels.unshift(this.meses[this.meses.length + diferencia]);
        } else {
          this.labels.unshift(this.meses[diferencia]);
        }
      }
    },
    fillLineChartOrdenesResueltas() {
      let fechaActual = new Date();
      let mesActual = fechaActual.getMonth();

      let ordenes = JSON.parse(
        JSON.stringify(
          this.ordenesDeServicio.filter((orden) => orden.estado == "RESUELTA")
        )
      );

      for (let index = 0; index < this.cantidadDeMesesSeleccionados; index++) {
        let diferencia = mesActual - index;
        if (diferencia < 0) {
          fechaActual.setMonth(12 + diferencia);
          fechaActual.setFullYear(fechaActual.getFullYear() - 1);
        } else {
          fechaActual.setMonth(fechaActual.getMonth() - diferencia);
        }
        let mesYAnioActual = fechaActual.toLocaleString().substring(3, 10);

        let count = ordenes.filter((orden) => {
          let fechaDeResolucion = null;
          if (orden.fechaDeResolucion != null) {
            fechaDeResolucion = new Date(orden.fechaDeResolucion);

            fechaDeResolucion =
              fechaDeResolucion.getDate() > 9
                ? fechaDeResolucion.toLocaleDateString().substring(3, 10)
                : fechaDeResolucion.toLocaleDateString().substring(2, 9);
            return fechaDeResolucion.trim() == mesYAnioActual.trim();
          }
        }).length;

        this.dataOrdenesResueltas.unshift(count);
      }
      this.datacollectionOrdenesResueltasPorMesesSeleccionados = {
        labels: this.labels,
        datasets: [
          {
            label: "Órdenes Resueltas",
            data: this.dataOrdenesResueltas,
            borderColor: "#7EF1DE",
            backgroundColor: "#7EF1DE10",
          },
        ],
      };
    },
    fillLineChartOrdenesCanceladas() {
      let fechaActual = new Date();
      let mesActual = fechaActual.getMonth();

      let ordenes = JSON.parse(
        JSON.stringify(
          this.ordenesDeServicio.filter((orden) => orden.estado == "CANCELADA")
        )
      );

      for (let index = 0; index < this.cantidadDeMesesSeleccionados; index++) {
        let diferencia = mesActual - index;
        if (diferencia < 0) {
          fechaActual.setMonth(12 + diferencia);
          fechaActual.setFullYear(fechaActual.getFullYear() - 1);
        } else {
          fechaActual.setMonth(fechaActual.getMonth() - diferencia);
        }
        let mesYAnioActual = fechaActual.toLocaleString().substring(3, 10);

        let count = ordenes.filter((orden) => {
          let fechaDeCancelacion = null;
          if (orden.fechaDeCancelacion != null) {
            fechaDeCancelacion = new Date(orden.fechaDeCancelacion);

            fechaDeCancelacion =
              fechaDeCancelacion.getDate() > 9
                ? fechaDeCancelacion.toLocaleDateString().substring(3, 10)
                : fechaDeCancelacion.toLocaleDateString().substring(2, 9);
            return fechaDeCancelacion.trim() == mesYAnioActual.trim();
          }
        }).length;

        this.dataOrdenesCanceladas.unshift(count);
      }
      this.datacollectionOrdenesCanceladasPorMesesSeleccionados = {
        labels: this.labels,
        datasets: [
          {
            label: "Órdenes Canceladas",
            data: this.dataOrdenesCanceladas,
            borderColor: "#7E031E",
            backgroundColor: "#7E031E10",
          },
        ],
      };
    },
    fillBarChartTecnicosPorEstado() {
      let empleados = JSON.parse(
        JSON.stringify(
          this.empleados.filter(
            (empleado) => empleado.usuario.sede.nombre == this.miSede
          )
        )
      );
      let tecnicosDisponibles = 0,
        tecnicosAsignados = 0;

      for (let empleado of empleados) {
        if (empleado.estado == "DISPONIBLE") {
          tecnicosDisponibles++;
        }
        if (empleado.estado == "ASIGNADO") {
          tecnicosAsignados++;
        }
      }

      const data = [];
      data.push(tecnicosDisponibles);
      data.push(tecnicosAsignados);

      this.dataCollectionTecnicosXEstado = {
        labels: ["DISPONIBLE", "ASIGNADO"],
        datasets: [
          {
            label: "",
            data: data,
            backgroundColor: ["#63FFBD", "#F58A34"],
          },
        ],
      };
    },
    fillBarChartOrdenesPorEstadoDeHoy() {
      let diaActual = new Date().toLocaleString().substring(0, 10);
      let ordenes = JSON.parse(
        JSON.stringify(
          this.ordenesDeServicio.filter((orden) => {
            let fechaDeCreacion = null;
            if (orden.fechaDeCreacion != null) {
              fechaDeCreacion = new Date(orden.fechaDeCreacion);

              fechaDeCreacion =
                fechaDeCreacion.getDate() > 9
                  ? fechaDeCreacion.toLocaleDateString().substring(0, 10)
                  : fechaDeCreacion.toLocaleDateString().substring(0, 9);

              return fechaDeCreacion.trim() == diaActual.trim();
            }
          })
        )
      );

      let ordenesCreadas = 0,
        ordenesAsignadas = 0,
        ordenesVisitadas = 0,
        ordenesCanceladas = 0,
        ordenesResueltas = 0,
        ordenesCerradas = 0;

      for (let orden of ordenes) {
        if (orden.estado == "CREADA") {
          ordenesCreadas++;
        }
        if (orden.estado == "ASIGNADA") {
          ordenesAsignadas++;
        }
        if (orden.estado == "VISITADA") {
          ordenesVisitadas++;
        }
        if (orden.estado == "CANCELADA") {
          ordenesCanceladas++;
        }
        if (orden.estado == "RESUELTA") {
          ordenesResueltas++;
        }
        if (orden.estado == "CERRADA") {
          ordenesCerradas++;
        }
      }

      let data = [];
      data.push(ordenesCreadas);
      data.push(ordenesAsignadas);
      data.push(ordenesVisitadas);
      data.push(ordenesCanceladas);
      data.push(ordenesResueltas);
      data.push(ordenesCerradas);

      this.dataCollectionOrdenesDeHoyXEstado = {
        labels: [
          "CREADA",
          "ASIGNADA",
          "VISITADA",
          "CANCELADA",
          "RESUELTA",
          "CERRADA",
        ],
        datasets: [
          {
            label: "",
            data: data,
            backgroundColor: [
              "#63FFBD",
              "#F58A34",
              "#35E8FA",
              "#F4554F",
              "#F2FB57",
              "#2F6DDE",
            ],
          },
        ],
      };
    },
  },
  async mounted() {
    await this.fetchGetOrdenesDeServicio();
    await this.fetchGetEmpleados();
    this.fillLabelsPorMesesSeleccionados();
    this.fillLineChartOrdenesResueltas();
    this.fillLineChartOrdenesCanceladas();
    this.fillBarChartTecnicosPorEstado();
    this.fillBarChartOrdenesPorEstadoDeHoy();
  },
};
</script>
