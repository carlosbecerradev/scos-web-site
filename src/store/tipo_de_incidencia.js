const state = {
  tipo_de_incidencia: {
    tipoDeIncidenciaId: 0,
    nombre: "",
    activo: true,
    fechaDeCreacion: null,
    tipoDeServicio: {
      tipoDeServicioId: null,
    }
  },
  tipos_de_incidencia: [],
}

const mutations = {
  setTipoDeIncidencia(state, payload) {
    state.tipo_de_incidencia = payload
  },
  cleanTipoDeIncidencia(state) {
    state.tipo_de_incidencia = {
      tipoDeIncidenciaId: 0,
      nombre: "",
      activo: true,
      fechaDeCreacion: null,
      tipoDeServicio: {
        tipoDeServicioId: null,
      }
    }
  },
  fillTiposDeIncidencia(state, payload) {
    state.tipos_de_incidencia = payload
  },
}

const actions = {
  async fetchGetTiposDeIncidencia({ commit, getters }) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/tipo-de-incidencia', {
        method: "GET",
        headers: {
          Authorization: 'Bearer ' + getters["JWT"],
        },
      });
      if (response.status == 200) {
        const data = await response.json()
        commit("fillTiposDeIncidencia", data)
      }
    } catch (error) {
      console.log("fetchGetTiposDeIncidencia:", error)
    }
  },
  async fetchPostAddTipoDeIncidencia({ getters }, tipoDeIncidencia) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/tipo-de-incidencia', {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: 'Bearer ' + getters["JWT"],
        },
        body: JSON.stringify(tipoDeIncidencia),
      });
      return response.status
    } catch (error) {
      console.log("fetchPostAddTipoDeIncidencia", error)
    }
  },
  async fetchPutEditTipoDeIncidencia({ getters }, tipoDeIncidencia) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/tipo-de-incidencia/' + tipoDeIncidencia.tipoDeIncidenciaId, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: 'Bearer ' + getters["JWT"],
        },
        body: JSON.stringify(tipoDeIncidencia),
      });
      return response.status
    } catch (error) {
      console.log("fetchPutEditTipoDeIncidencia", error)
    }
  },
  async fetchDeleteDeleteTipoDeIncidencia({ getters }, id) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/tipo-de-incidencia/' + id, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: 'Bearer ' + getters["JWT"],
        },
      });
      return response.status
    } catch (error) {
      console.log("fetchDeleteDeleteTipoDeIncidencia", error)
    }
  },
}

const getters = {
  tipoDeIncidencia: state => state.tipo_de_incidencia,
  tiposDeIncidencia: state => state.tipos_de_incidencia,
}

export default {
  state,
  mutations,
  actions,
  getters
}
