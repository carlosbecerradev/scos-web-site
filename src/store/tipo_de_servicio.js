const state = {
  tipo_de_servicio: {
    tipoDeServicioId: 0,
    nombre: "",
    activo: true,
    fechaDeCreacion: null
  },
  tipos_de_servicio: [],
}

const mutations = {
  setTipoDeServicio(state, payload) {
    state.tipo_de_servicio = payload
  },
  cleanTipoDeServicio(state) {
    state.tipo_de_servicio = {
      tipoDeServicioId: 0,
      nombre: "",
      activo: true,
      fechaDeCreacion: null
    }
  },
  fillTiposDeServicio(state, payload) {
    state.tipos_de_servicio = payload
  },
}

const actions = {
  async fetchGetTiposDeServicio({ commit, getters }) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/tipo-de-servicio', {
        method: "GET",
        headers: {
          Authorization: 'Bearer ' + getters["JWT"],
        },
      });
      if (response.status == 200) {
        const data = await response.json()
        commit("fillTiposDeServicio", data)
      }
    } catch (error) {
      console.log("fetchGetTiposDeServicio:", error)
    }
  },
  async fetchPostAddTipoDeServicio({ getters }, tipoDeServicio) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/tipo-de-servicio', {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: 'Bearer ' + getters["JWT"],
        },
        body: JSON.stringify(tipoDeServicio),
      });
      return response.status
    } catch (error) {
      console.log("fetchPostAddTipoDeServicio", error)
    }
  },
  async fetchPutEditTipoDeServicio({ getters }, tipoDeServicio) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/tipo-de-servicio/' + tipoDeServicio.tipoDeServicioId, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: 'Bearer ' + getters["JWT"],
        },
        body: JSON.stringify(tipoDeServicio),
      });
      return response.status
    } catch (error) {
      console.log("fetchPutEditTipoDeServicio", error)
    }
  },
  async fetchDeleteDeleteTipoDeServicio({ getters }, id) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/tipo-de-servicio/' + id, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: 'Bearer ' + getters["JWT"],
        },
      });
      return response.status
    } catch (error) {
      console.log("fetchPutEditSede", error)
    }
  },
}

const getters = {
  tipoDeServicio: state => state.tipo_de_servicio,
  tiposDeServicio: state => state.tipos_de_servicio,
}

export default {
  state,
  mutations,
  actions,
  getters
}
