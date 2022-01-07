<template>
  <div class="gestionar-empleado-view">
    <administrador-layout>
      <div class="mt-5">
        <h2 class="text-xl">Mantenimiento de Empleados</h2>
      </div>
      <empleado-table></empleado-table>
      <b-modal
        id="empleado-form-modal"
        title="Formulario del Empleado"
        hide-footer
        size="xl"
      >
        <empleado-form></empleado-form>
      </b-modal>
    </administrador-layout>
  </div>
</template>

<script>
import AdministradorLayout from "@/layout/AdministradorLayout.vue";
import EmpleadoTable from "../../components/table/EmpleadoTable.vue";
import EmpleadoForm from "../../components/form/EmpleadoForm.vue";

export default {
  name: "GestionarEmpleadoView",
  components: {
    AdministradorLayout,
    EmpleadoTable,
    EmpleadoForm,
  },
};
</script>
