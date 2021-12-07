<template>
  <div class="jefe-layout">
    <jefe-navbar></jefe-navbar>
    <div class="jefe-layout-wrapper">
      <div class="container">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import JefeNavbar from "../components/nav/JefeNavbar.vue";

export default {
  name: "JefeLayout",
  components: {
    JefeNavbar,
  },
};
</script>
