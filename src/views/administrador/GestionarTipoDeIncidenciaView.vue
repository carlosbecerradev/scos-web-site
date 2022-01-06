<template>
  <div class="gestionar-tipo-de-incidencia-view">
    <administrador-layout>
      <div class="mt-5">
        <h2>Mantenimiento de los Tipos de Incidencia</h2>
      </div>
      <tipo-de-incidencia-table></tipo-de-incidencia-table>
      <b-modal
        id="tipo-de-incidencia-form-modal"
        title="Formulario del Tipo de Incidencia"
        hide-footer
        size="lg"
      >
        <tipo-de-incidencia-form></tipo-de-incidencia-form>
      </b-modal>
    </administrador-layout>
  </div>
</template>

<script>
import AdministradorLayout from "@/layout/AdministradorLayout.vue";
import TipoDeIncidenciaTable from "../../components/table/TipoDeIncidenciaTable.vue";
import TipoDeIncidenciaForm from "../../components/form/TipoDeIncidenciaForm.vue";

export default {
  name: "GestionarTipoDeIncidenciaView",
  components: {
    AdministradorLayout,
    TipoDeIncidenciaTable,
    TipoDeIncidenciaForm,
  },
};
</script>
