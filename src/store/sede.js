const state = {
  sede: {
    sedeId: 0,
    nombre: "",
    activo: true,
    fechaDeCreacion: null
  },
  sedes: [],
}

const mutations = {
  setSede(state, payload) {
    state.sede = payload
  },
  cleanSede(state) {
    state.sede = {
      sedeId: 0,
      nombre: "",
      activo: true,
      fechaDeCreacion: null
    }
  },
  fillSedes(state, payload) {
    state.sedes = payload
  },
}

const actions = {
  async fetchGetSedes({ commit, getters, state }) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/sede', {
        method: "GET",
        headers: {
          Authorization: 'Bearer ' + getters["JWT"],
        },
      });
      if (response.status == 200) {
        const data = await response.json()
        commit("fillSedes", data)
        commit("setTotalRows", data.length);
      }
    } catch (error) {
      console.log("fetchSedes", error)
    }
  },
  async fetchPostAddSede({ getters }, sede) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/sede', {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: 'Bearer ' + getters["JWT"],
        },
        body: JSON.stringify(sede),
      });
      return response.status
    } catch (error) {
      console.log("fetchPostAddSede", error)
    }
  },
  async fetchPutEditSede({ getters }, sede) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/sede/' + sede.sedeId, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: 'Bearer ' + getters["JWT"],
        },
        body: JSON.stringify(sede),
      });
      return response.status
    } catch (error) {
      console.log("fetchPutEditSede", error)
    }
  },
  async fetchDeleteDeleteSede({ getters }, sedeId) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/sede/' + sedeId, {
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
  sede: state => state.sede,
  sedes: state => state.sedes,
}

export default {
  state,
  mutations,
  actions,
  getters
}
