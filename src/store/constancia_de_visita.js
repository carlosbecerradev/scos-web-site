const state = {
  constancia_de_visita: null,
}

const mutations = {
  setConstanciaDeVisita(state, payload) {
    state.constancia_de_visita = payload
  },
}

const actions = {
  async fetchGetConstanciaDeVisita({ commit, getters }, id) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/constancia-de-visita/orden-de-servicio/id/' + id, {
        method: "GET",
        headers: {
          Authorization: 'Bearer ' + getters["JWT"],
        },
      });
      if (response.status == 200) {
        const data = await response.json()
        commit("setConstanciaDeVisita", data)
      }
    } catch (error) {
      console.log("fetchGetConstanciaDeVisita", error)
    }
  },
}

const getters = {
  constanciaDeVisita: state => state.constancia_de_visita,
}

export default {
  state,
  mutations,
  actions,
  getters
}
