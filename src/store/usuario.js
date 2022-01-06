const state = {
  usuario: {
    usuarioId: null,
    nombreDeUsuario: "",
    contrasenia: "",
    rol: null,
    activo: true,
    tokenDeNotificacion: null,
    fechaDeCreacion: null,
    ubicacion: null,
    sede: {
      sedeId: null
    }
  },
  usuarios: [],
}

const mutations = {
  setUsuario(state, payload) {
    state.usuario = payload
  },
  cleanUsuario(state) {
    state.usuario = {
      usuarioId: null,
      nombreDeUsuario: "",
      contrasenia: "",
      rol: null,
      activo: true,
      tokenDeNotificacion: null,
      fechaDeCreacion: null,
      ubicacion: null,
      sede: {
        sedeId: null
      }
    }
  },
  fillUsuarios(state, payload) {
    state.usuarios = payload
  },
}

const actions = {
  async fetchGetUsuarios({ commit, getters }) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/usuario', {
        method: "GET",
        headers: {
          Authorization: 'Bearer ' + getters["JWT"],
        },
      });
      if (response.status == 200) {
        const data = await response.json()
        commit("fillUsuarios", data)
      }
    } catch (error) {
      console.log("fetchGetUsuarios", error)
    }
  },
  async fetchPostAddUsuario({ getters }, usuario) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/usuario', {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: 'Bearer ' + getters["JWT"],
        },
        body: JSON.stringify(usuario),
      });
      return response.status
    } catch (error) {
      console.log("fetchPostAddUsuario", error)
    }
  },
  async fetchPutEditUsuario({ getters }, usuario) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/usuario/' + usuario.usuarioId, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: 'Bearer ' + getters["JWT"],
        },
        body: JSON.stringify(usuario),
      });
      return response.status
    } catch (error) {
      console.log("fetchPutEditUsuario", error)
    }
  },
  async fetchDeleteDeleteUsuario({ getters }, id) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/usuario/' + id, {
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
  usuario: state => state.usuario,
  usuarios: state => state.usuarios,
}

export default {
  state,
  mutations,
  actions,
  getters
}
