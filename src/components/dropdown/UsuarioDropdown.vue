<template>
  <div class="ml-auto">
    <b-nav pills v-if="JWTClaims.jwt_subject != 'username'">
      <b-nav-item-dropdown
        id="my-nav-dropdown"
        toggle-class="nav-link-custom bg-white text-dark"
        right
      >
        <template #button-content>
          <span class="mr-2">{{ JWTClaims.jwt_subject }}</span>
          <b-icon icon="person-circle" aria-hidden="true"></b-icon>
        </template>
        <b-dropdown-item @click="logout">Cerrar Sesión</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>
    <b-nav v-else>
      <b-button to="/login" variant="light">
        <span class="mr-2">Ingresar</span>
        <span><b-icon icon="person-circle" aria-hidden="true"></b-icon></span>
      </b-button>
    </b-nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UsuarioDropdown",
  computed: {
    ...mapGetters(["JWTClaims"]),
  },
  methods: {
    ...mapActions(["logout"]),
  },
};
</script>
