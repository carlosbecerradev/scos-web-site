const state = {
  ordenes_de_servicio: [],
  ordenes_de_servicio_canceladas: [],
}

const mutations = {
  fillOrdenesDeServicio(state, payload) {
    state.ordenes_de_servicio = payload
  },
  fillOrdenesDeServicioCanceladas(state, payload) {
    state.ordenes_de_servicio_canceladas = payload
  },
}

const actions = {
  async fetchGetOrdenesDeServicio({ commit, getters }) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/orden-de-servicio', {
        method: "GET",
        headers: {
          Authorization: 'Bearer ' + getters["JWT"],
        },
      });
      if (response.status == 200) {
        const data = await response.json()
        commit("fillOrdenesDeServicio", data)
      }
    } catch (error) {
      console.log("fetchGetOrdenesDeServicio", error)
    }
  },
  async fetchGetOrdenesDeServicioCanceladasHoy({ commit, state }) {
    await this.dispatch("fetchGetOrdenesDeServicio");
    commit("fillOrdenesDeServicioCanceladas", state.ordenes_de_servicio.filter(orden => {
      let fechaDeCancelacion = orden.fechaDeCancelacion != null ? new Date(orden.fechaDeCancelacion).toLocaleDateString() : orden.fechaDeCancelacion;
      let now = new Date();
      let ahora = now.toLocaleDateString();
      return orden.estado == "CANCELADA" && orden.revisada == false && fechaDeCancelacion == ahora;
    }))
  },
  async fetchGetOrdenesDeServicioCanceladasMes({ commit, state }) {
    await this.dispatch("fetchGetOrdenesDeServicio");
    commit("fillOrdenesDeServicioCanceladas", state.ordenes_de_servicio.filter(orden => {
      let fechaDeCancelacion = orden.fechaDeCancelacion != null ? orden.fechaDeCancelacion.substring(0, 7) : orden.fechaDeCancelacion;
      let now = new Date();
      let mes = now.toISOString().substring(0, 7);
      return orden.estado == "CANCELADA" && orden.revisada == false && fechaDeCancelacion == mes;
    }))
  },
  async fetchGetOrdenesDeServicioCanceladasTodas({ commit, state }) {
    await this.dispatch("fetchGetOrdenesDeServicio");
    commit("fillOrdenesDeServicioCanceladas", state.ordenes_de_servicio.filter(orden => orden.estado == "CANCELADA" && orden.revisada == false))
  },
  async fetchPutRevisarOrdenDeServicio({ getters }, id) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/orden-de-servicio/revisar/' + id, {
        method: "PUT",
        headers: {
          Authorization: 'Bearer ' + getters["JWT"],
        },
      });
      return response.status
    } catch (error) {
      console.log("fetchPutRevisarOrdenDeServicio", error)
    }
  },
}

const getters = {
  ordenesDeServicioCanceladas: state => state.ordenes_de_servicio_canceladas,
}

export default {
  state,
  mutations,
  actions,
  getters
}
