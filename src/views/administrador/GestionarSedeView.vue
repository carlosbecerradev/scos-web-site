<template>
  <div class="gestionar-sede-view">
    <administrador-layout>
      <div class="mt-5">
        <h2 class="text-xl">Mantenimiento de Sedes</h2>
      </div>
      <sede-table></sede-table>
      <b-modal
        id="sede-form-modal"
        title="Formulario de la Sede"
        hide-footer
        size="lg"
      >
        <sede-form></sede-form>
      </b-modal>
    </administrador-layout>
  </div>
</template>

<script>
import AdministradorLayout from "@/layout/AdministradorLayout.vue";
import SedeTable from "../../components/table/SedeTable.vue";
import SedeForm from "../../components/form/SedeForm.vue";

export default {
  name: "GestionarSedeView",
  components: {
    AdministradorLayout,
    SedeTable,
    SedeForm,
  },
};
</script>
