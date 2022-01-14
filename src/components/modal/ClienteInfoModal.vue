<template>
  <b-modal id="cliente-info-modal" hide-footer title="Datos del Cliente">
    <b-list-group flush v-if="orden.cliente != null">
      <b-list-group-item>
        <span class="text-purple">Id:</span>
        {{ orden.cliente.id }}
      </b-list-group-item>
      <b-list-group-item>
        <span class="text-purple">Nombres:</span>
        {{ orden.cliente.nombres }}
      </b-list-group-item>
      <b-list-group-item>
        <span class="text-purple">Apellidos:</span>
        {{ orden.cliente.apellidos }}
      </b-list-group-item>
      <b-list-group-item>
        <span class="text-purple">DNI:</span>
        {{ orden.cliente.dni }}
      </b-list-group-item>
      <b-list-group-item>
        <span class="text-purple">Sexo:</span>
        {{ orden.cliente.sexo == "F" ? "Femenino" : "Masculino" }}
      </b-list-group-item>
      <b-list-group-item>
        <span class="text-purple">N° Telef. Móvil:</span>
        {{ orden.cliente.nroDeTelefonoMovil }}
      </b-list-group-item>
      <b-list-group-item>
        <span class="text-purple">N° Telef. Fijo:</span>
        {{ orden.cliente.nroDeTelefonoFijo }}
      </b-list-group-item>
      <b-list-group-item>
        <span class="text-purple">Dirección:</span>
        {{ orden.cliente.direccion }}
      </b-list-group-item>
      <b-list-group-item>
        <span class="text-purple">Sede:</span>
        {{ orden.cliente.sede }}
      </b-list-group-item>
      <b-list-group-item>
        <span class="text-purple">Tipo de Servicio:</span>
        {{ orden.cliente.tipoDeServicio }}
      </b-list-group-item>
    </b-list-group>
  </b-modal>
</template>

<script>
export default {
  name: "ClienteInfoModal",
  props: {
    orden: {
      typeof: Object,
      require: true,
      default: {},
    },
  },
};
</script>
