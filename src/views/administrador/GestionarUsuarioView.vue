<template>
  <div class="gestionar-usuario-view">
    <administrador-layout>
      <usuario-form></usuario-form>
    </administrador-layout>
  </div>
</template>

<script>
import AdministradorLayout from "@/layout/AdministradorLayout.vue";
import UsuarioForm from "@/components/form/UsuarioForm.vue";

export default {
  name: "GestionarUsuarioView",
  components: {
    AdministradorLayout,
    UsuarioForm,
  },
};
</script>
