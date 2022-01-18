const state = {
  ordenes_de_servicio: [],
  ordenes_de_servicio_canceladas: [],
  ordenes_de_servicio_resueltas: [],
}

const mutations = {
  fillOrdenesDeServicio(state, payload) {
    state.ordenes_de_servicio = payload
  },
  fillOrdenesDeServicioCanceladas(state, payload) {
    state.ordenes_de_servicio_canceladas = payload
  },
  fillOrdenesDeServicioResueltas(state, payload) {
    state.ordenes_de_servicio_resueltas = payload
  },
}

const actions = {
  async fetchGetOrdenesDeServicio({ commit, getters }) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/v1/orden-de-servicio/sede/' + getters["miSede"], {
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
  async fetchGetOrdenesDeServicioResueltasTodas({ commit, state }) {
    await this.dispatch("fetchGetOrdenesDeServicio");
    commit("fillOrdenesDeServicioResueltas", state.ordenes_de_servicio.filter(orden => (orden.estado == "RESUELTA" || orden.estado == "CERRADA") && orden.revisada == false))
  },
  async fetchGetOrdenesDeServicioResueltasHoy({ commit, state }) {
    await this.dispatch("fetchGetOrdenesDeServicio");
    commit("fillOrdenesDeServicioResueltas", state.ordenes_de_servicio.filter(orden => {
      let fechaDeResolucion = orden.fechaDeResolucion != null ? new Date(orden.fechaDeResolucion).toLocaleDateString() : orden.fechaDeResolucion;
      let now = new Date();
      let ahora = now.toLocaleDateString();
      return (orden.estado == "RESUELTA" || orden.estado == "CERRADA") && orden.revisada == false && fechaDeResolucion == ahora;
    }))
  },
  async fetchGetOrdenesDeServicioResueltasMes({ commit, state }) {
    await this.dispatch("fetchGetOrdenesDeServicio");
    commit("fillOrdenesDeServicioResueltas", state.ordenes_de_servicio.filter(orden => {
      let fechaDeResolucion = orden.fechaDeResolucion != null ? new Date(orden.fechaDeResolucion).toLocaleDateString().substring(3, 10) : orden.fechaDeResolucion;
      let now = new Date();
      let mes = now.toLocaleDateString().substring(3, 10);
      return (orden.estado == "RESUELTA" || orden.estado == "CERRADA") && orden.revisada == false && fechaDeResolucion == mes;
    }))
  },
}

const getters = {
  ordenesDeServicioCanceladas: state => state.ordenes_de_servicio_canceladas,
  ordenesDeServicioResueltas: state => state.ordenes_de_servicio_resueltas,
  ordenesDeServicio: state => state.ordenes_de_servicio,
}

export default {
  state,
  mutations,
  actions,
  getters
}
