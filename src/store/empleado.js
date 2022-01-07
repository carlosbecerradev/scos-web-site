const state = {
  empleado: {},
  empleados: [],
}

const mutations = {
  setEmpleado(state, payload) {
    state.empleado = payload
  },
  cleanEmpleado(state) {
    state.empleado = {
      empleadoId: 0,
      nombres: "",
      apellidos: "",
      fotoUrl: "",
      nroDeCarnet: "",
      dni: "",
      nroDeTelefonoMovil: "",
      sexo: null,
      estado: null,
      usuario: {
        usuarioId: null,
        nombreDeUsuario: "",
        contrasenia: "",
        rol: "TECNICO",
        activo: true,
        tokenDeNotificacion: null,
        fechaDeCreacion: null,
        ubicacion: null,
        sede: {
          sedeId: null,
        }
      },
    }
  },
  fillEmpleados(state, payload) {
    state.empleados = payload
  },
}

const actions = {
  async fetchGetEmpleados({ commit, getters }) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/empleado', {
        method: "GET",
        headers: {
          Authorization: 'Bearer ' + getters["JWT"],
        },
      });
      if (response.status == 200) {
        const data = await response.json()
        commit("fillEmpleados", data)
      }
    } catch (error) {
      console.log("fetchGetEmpleados", error)
    }
  },
  async fetchPostAddEmpleado({ getters }, empleado) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/empleado', {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: 'Bearer ' + getters["JWT"],
        },
        body: JSON.stringify(empleado),
      });
      return response.status
    } catch (error) {
      console.log("fetchPostAddEmpleado", error)
    }
  },
  async fetchPutEditEmpleado({ getters }, empleado) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/empleado/' + empleado.empleadoId, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: 'Bearer ' + getters["JWT"],
        },
        body: JSON.stringify(empleado),
      });
      return response.status
    } catch (error) {
      console.log("fetchPutEditEmpleado", error)
    }
  },
  async fetchDeleteDeleteEmpleado({ getters }, id) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/empleado/' + id, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: 'Bearer ' + getters["JWT"],
        },
      });
      return response.status
    } catch (error) {
      console.log("fetchDeleteDeleteEmpleado", error)
    }
  },
}

const getters = {
  empleado: state => state.empleado,
  empleados: state => state.empleados,
}

export default {
  state,
  mutations,
  actions,
  getters
}
