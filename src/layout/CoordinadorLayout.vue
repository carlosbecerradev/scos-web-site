<template>
  <div class="coordinador-layout">
    <coordinador-navbar></coordinador-navbar>
    <div class="coordinador-layout-wrapper">
      <div class="container">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import CoordinadorNavbar from "../components/nav/CoordinadorNavbar.vue";

export default {
  name: "CoordinadorLayout",
  components: {
    CoordinadorNavbar,
  },
};
</script>
