<template>
  <div class="usuario-form">
    <p class="lead">Formulario de Usuario</p>
    <b-form>
      <b-form-group label="Email address:">
        <b-form-input
          id="input-1"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Activo">
        <b-form-select class="mb-3">
          <b-form-select-option value="null"
            >Please select an option</b-form-select-option
          >
          <b-form-select-option value="1">Si</b-form-select-option>
          <b-form-select-option value="0" disabled>No</b-form-select-option>
        </b-form-select>
      </b-form-group>
      <b-button variant="primary">Button</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "UsuarioForm",
};
</script>

