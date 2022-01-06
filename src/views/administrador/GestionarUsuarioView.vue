<template>
  <div class="gestionar-usuario-view">
    <administrador-layout>
      <div class="mt-5">
        <h2 class="text-xl">Mantenimiento de Usuarios</h2>
      </div>
      <usuario-table></usuario-table>
      <b-modal
        id="usuario-form-modal"
        title="Formulario del Usuario"
        hide-footer
        size="lg"
      >
        <usuario-form></usuario-form>
      </b-modal>
    </administrador-layout>
  </div>
</template>

<script>
import AdministradorLayout from "@/layout/AdministradorLayout.vue";
import UsuarioForm from "@/components/form/UsuarioForm.vue";
import UsuarioTable from "../../components/table/UsuarioTable.vue";

export default {
  name: "GestionarUsuarioView",
  components: {
    AdministradorLayout,
    UsuarioForm,
    UsuarioTable,
  },
};
</script>
