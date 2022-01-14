<template>
  <b-modal id="tecnico-info-modal" hide-footer title="Datos del Técnico">
    <b-list-group flush v-if="orden.empleado != null">
      <b-list-group-item>
        <span class="text-purple">Id:</span>
        {{ orden.empleado.id }}
      </b-list-group-item>
      <b-list-group-item>
        <span class="text-purple">Nombres:</span>
        {{ orden.empleado.nombres }}
      </b-list-group-item>
      <b-list-group-item>
        <span class="text-purple">Apellidos:</span>
        {{ orden.empleado.apellidos }}
      </b-list-group-item>
      <b-list-group-item>
        <span class="text-purple">DNI:</span>
        {{ orden.empleado.dni }}
      </b-list-group-item>
      <b-list-group-item>
        <span class="text-purple">Sexo:</span>
        {{ orden.empleado.sexo == "F" ? "Femenino" : "Masculino" }}
      </b-list-group-item>
      <b-list-group-item>
        <span class="text-purple">N° Telef. Móvil:</span>
        {{ orden.empleado.nroDeTelefonoMovil }}
      </b-list-group-item>
      <b-list-group-item>
        <span class="text-purple">N° N° de Carnet:</span>
        {{ orden.empleado.nroDeCarnet }}
      </b-list-group-item>
      <b-list-group-item>
        <span class="text-purple">Estado:</span>
        {{ orden.empleado.estado }}
      </b-list-group-item>
      <b-list-group-item>
        <span class="text-purple">Sede:</span>
        {{ orden.empleado.sede }}
      </b-list-group-item>
      <b-list-group-item>
        <div class="d-flex justify-content-center">
          <b-img
            :src="orden.empleado.fotoUrl"
            style="height: 320px"
            alt="Foto del técnico"
          />
        </div>
      </b-list-group-item>
    </b-list-group>
  </b-modal>
</template>

<script>
export default {
  name: "TecnicoInfoModal",
  props: {
    orden: {
      typeof: Object,
      require: true,
      default: {},
    },
  },
};
</script>
