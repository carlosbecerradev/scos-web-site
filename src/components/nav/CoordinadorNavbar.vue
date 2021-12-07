<template>
  <div class="coordinador-navbar">
    <div>
      <b-navbar toggleable="lg" type="light" variant="light">
        <b-container>
          <b-navbar-brand href="/coordinador/ordenes-de-servicio">
            <img
              src="@/assets/img/cablemashd_logo.png"
              height="40"
              alt="cablemashd_logo"
            />
          </b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="mx-auto">
              <b-nav-item-dropdown text="Órdenes de Servicio">
                <b-dropdown-item href="/coordinador/ordenes-de-servicio"
                  >Listar</b-dropdown-item
                >
                <b-dropdown-item href="/coordinador/orden-de-servicio/generar"
                  >Registrar</b-dropdown-item
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
  name: "CoordinadorNavbar",
};
</script>
