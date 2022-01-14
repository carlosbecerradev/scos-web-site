const state = {
  encuesta_de_atencion: null,
}

const mutations = {
  setEncuestaDeAtencion(state, payload) {
    state.encuesta_de_atencion = payload
  },
}

const actions = {
  async fetchGetEncuestaDeAtencion({ commit, getters }, id) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/encuesta-de-atencion/orden-de-servicio/id/' + id, {
        method: "GET",
        headers: {
          Authorization: 'Bearer ' + getters["JWT"],
        },
      });
      if (response.status == 200) {
        const data = await response.json()
        commit("setEncuestaDeAtencion", data)
      }
    } catch (error) {
      console.log("fetchGetEncuestaDeAtencion", error)
    }
  },
}

const getters = {
  encuestaDeAtencion: state => state.encuesta_de_atencion,
}

export default {
  state,
  mutations,
  actions,
  getters
}
