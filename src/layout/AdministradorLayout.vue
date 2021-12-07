<template>
  <div class="administrador-layout">
    <administrador-navbar></administrador-navbar>
    <div class="administrador-layout--wrapper">
      <div class="container">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import AdministradorNavbar from "../components/nav/AdministradorNavbar.vue";

export default {
  name: "AdministradorLayout",
  components: {
    AdministradorNavbar,
  },
};
</script>
