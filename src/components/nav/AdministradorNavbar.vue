<template>
  <div class="administrador-navbar">
    <div>
      <b-navbar toggleable="lg" type="light" variant="light">
        <b-container>
          <b-navbar-brand href="#">
            <img
              src="@/assets/img/cablemashd_logo.png"
              height="40"
              alt="cablemashd_logo"
            />
          </b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="mx-auto">
              <b-nav-item href="/administrador/gestionar/cliente"
                >Clientes</b-nav-item
              >
              <b-nav-item href="/administrador/gestionar/empleado"
                >Empleados</b-nav-item
              >
              <b-nav-item href="/administrador/gestionar/usuario"
                >Usuarios</b-nav-item
              >
              <b-nav-item href="/administrador/gestionar/sede"
                >Sedes</b-nav-item
              >
              <b-nav-item href="/administrador/gestionar/tipo-de-incidencia"
                >Tipos de Incidencia</b-nav-item
              >
              <b-nav-item href="/administrador/gestionar/tipo-de-servicio"
                >Tipos de Servicio</b-nav-item
              >
            </b-navbar-nav>
          </b-collapse>
        </b-container>
      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdministradorNavbar",
};
</script>
