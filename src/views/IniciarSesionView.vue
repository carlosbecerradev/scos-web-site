<template>
  <div class="iniciar-sesion-view">
    <div class="container">
      <div
        class="
          row
          justify-content-center justify-content-sm-end
          align-items-center
        "
        style="height: 100vh"
      >
        <div class="col-10 col-md-6 col-lg-4">
          <login-form></login-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "../components/form/LoginForm.vue";

export default {
  name: "IniciarSesionView",
  components: {
    LoginForm,
  },
};
</script>
