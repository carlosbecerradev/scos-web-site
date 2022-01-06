const state = {
  cliente: {},
  clientes: [],
}

const mutations = {
  setCliente(state, payload) {
    state.cliente = payload
  },
  cleanCliente(state) {
    state.cliente = {
      clienteId: 0,
      nombres: "",
      apellidos: "",
      fechaDeNacimiento: null,
      sexo: null,
      dni: "",
      nroDeTelefonoMovil: "",
      nroDeTelefonoFijo: "",
      direccion: "",
      usuario: {
        usuarioId: null,
        nombreDeUsuario: "",
        contrasenia: "",
        rol: "CLIENTE",
        activo: true,
        tokenDeNotificacion: null,
        fechaDeCreacion: null,
        ubicacion: {
          ubicacionId: null,
          direccion: null,
          latitud: null,
          longitud: null,
        },
        sede: {
          sedeId: null,
        }
      },
      tipoDeServicio: {
        tipoDeServicioId: null,
      },
    }
  },
  fillClientes(state, payload) {
    state.clientes = payload
  },
}

const actions = {
  async fetchGetClientes({ commit, getters }) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/cliente', {
        method: "GET",
        headers: {
          Authorization: 'Bearer ' + getters["JWT"],
        },
      });
      if (response.status == 200) {
        const data = await response.json()
        commit("fillClientes", data)
      }
    } catch (error) {
      console.log("fetchGetClientes", error)
    }
  },
  async fetchPostAddCliente({ getters }, cliente) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/cliente', {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: 'Bearer ' + getters["JWT"],
        },
        body: JSON.stringify(cliente),
      });
      return response.status
    } catch (error) {
      console.log("fetchPostAddCliente", error)
    }
  },
  async fetchPutEditCliente({ getters }, cliente) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/cliente/' + cliente.clienteId, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: 'Bearer ' + getters["JWT"],
        },
        body: JSON.stringify(cliente),
      });
      return response.status
    } catch (error) {
      console.log("fetchPutEditCliente", error)
    }
  },
  async fetchDeleteDeleteCliente({ getters }, id) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/cliente/' + id, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: 'Bearer ' + getters["JWT"],
        },
      });
      return response.status
    } catch (error) {
      console.log("fetchDeleteDeleteUsuario", error)
    }
  },
}

const getters = {
  cliente: state => state.cliente,
  clientes: state => state.clientes,
}

export default {
  state,
  mutations,
  actions,
  getters
}
