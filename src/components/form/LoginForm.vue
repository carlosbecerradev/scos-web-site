<template>
  <div class="login-form">
    <div class="text-center my-4">
      <img
        class="img-fluid w-50"
        src="@/assets/img/cablemashd_logo.png"
        alt=""
      />
      <p class="text-center my-4 text-uppercase lead font-weight-normal">
        Iniciar Sesión
      </p>
    </div>
    <b-card class="p-2 shadow">
      <b-form @submit.prevent="executeLogin">
        <b-form-group label="Nombre de Usuario:">
          <b-form-input
            v-model="loginRequest.username"
            type="text"
            required
            trim
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Contraseña:">
          <b-form-input
            v-model="loginRequest.password"
            type="password"
            required
            trim
          ></b-form-input>
        </b-form-group>

        <b-button block type="submit" variant="purple" class="mt-4"
          >Ingresar al Sistema</b-button
        >
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LoginForm",
  data() {
    return {
      loginRequest: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["login"]),
    async executeLogin() {
      let flag = await this.login(this.loginRequest);
      if (flag == false) {
        this.$swal.fire({
          icon: "error",
          title: "Su nombre de usuario o contraseña es incorrecto!",
        });
      }
      if (flag) {
        this.$swal.fire({
          icon: "success",
          title: "Inicio sesión correctamente!",
        });
      }
    },
  },
};
</script>
