<template>
  <div class="gestionar-cliente-view">
    <administrador-layout>
      <div class="mt-5">
        <h2 class="text-xl">Mantenimiento de Clientes</h2>
      </div>
      <cliente-table></cliente-table>
      <b-modal
        id="cliente-form-modal"
        title="Formulario del Cliente"
        hide-footer
        size="xl"
      >
        <cliente-form></cliente-form>
      </b-modal>
    </administrador-layout>
  </div>
</template>

<script>
import AdministradorLayout from "@/layout/AdministradorLayout.vue";
import ClienteTable from "../../components/table/ClienteTable.vue";
import ClienteForm from "../../components/form/ClienteForm.vue";

export default {
  name: "GestionarClienteView",
  components: {
    AdministradorLayout,
    ClienteTable,
    ClienteForm,
  },
};
</script>
