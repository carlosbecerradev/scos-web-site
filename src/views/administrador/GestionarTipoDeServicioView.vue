<template>
  <div class="gestionar-tipo-de-servicio-view">
    <administrador-layout>
      <div class="mt-5">
        <h2>Mantenimiento de Tipos de Servicio</h2>
      </div>
      <tipo-de-servicio-table></tipo-de-servicio-table>
      <b-modal
        id="tipo-de-servicio-form-modal"
        title="Formulario del Tipo de Servicio"
        hide-footer
        size="lg"
      >
        <tipo-de-servicio-form></tipo-de-servicio-form>
      </b-modal>
    </administrador-layout>
  </div>
</template>

<script>
import AdministradorLayout from "@/layout/AdministradorLayout.vue";
import TipoDeServicioTable from "../../components/table/TipoDeServicioTable.vue";
import TipoDeServicioForm from "../../components/form/TipoDeServicioForm.vue";

export default {
  name: "GestionarTipoDeServicioView",
  components: {
    AdministradorLayout,
    TipoDeServicioTable,
    TipoDeServicioForm,
  },
};
</script>
