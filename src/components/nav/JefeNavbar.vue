<template>
  <div class="jefe-navbar">
    <div>
      <b-navbar toggleable="lg" type="light" variant="light">
        <b-container>
          <b-navbar-brand href="/jefe/dashboard">
            <img
              src="@/assets/img/cablemashd_logo.png"
              height="40"
              alt="cablemashd_logo"
            />
          </b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="mx-auto">
              <b-nav-item href="/jefe/dashboard">Dashboard</b-nav-item>

              <b-nav-item-dropdown text="Órdenes de Servicio">
                <b-dropdown-item href="/jefe/ordenes-de-servicio/resueltas"
                  >Resueltas</b-dropdown-item
                >
                <b-dropdown-item href="/jefe/ordenes-de-servicio/canceladas"
                  >Canceladas</b-dropdown-item
                >
              </b-nav-item-dropdown>

              <b-nav-item-dropdown text="Reportes">
                <b-dropdown-item href="/jefe/reporte/tecnicos"
                  >Técnicos</b-dropdown-item
                >
                <b-dropdown-item href="/jefe/reporte/tipos-de-incidencia"
                  >Tipos de Incidencia</b-dropdown-item
                >
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-container>
      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "JefeNavbar",
};
</script>
