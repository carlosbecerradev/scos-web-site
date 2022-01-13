import router from '../router/index.js'

const state = {
  jwt: "",
  jwt_storage_name: "cablemas_scos_jwt",
  jwt_cLaims: {
    jwt_subject: "username",
    jwt_expiration: "",
    jwt_authority: "",
    jwt_sede: "",
  },
}

const mutations = {
  PROCESS_JWT: (state, jwt) => {
    state.jwt = jwt;
    let claims = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64'));
    state.jwt_cLaims.jwt_subject = claims.sub;
    state.jwt_cLaims.jwt_expiration = claims.exp;
    state.jwt_cLaims.jwt_authority = claims.authorities[0].authority;
    state.jwt_cLaims.jwt_sede = claims.authorities[1].authority;
    console.log("Claims", claims);
  },
  CLEAN_JWT: (state) => {
    state.jwt_cLaims = {
      jwt_subject: "",
      jwt_expiration: "",
      jwt_authority: "",
      jwt_sede: "",
    };
    state.jwt = "";
  },
}

const actions = {
  async login({ commit, getters, state }, { username, password }) {
    try {
      const response = await fetch(getters["apiBaseURL"] + '/auth/login', {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ username, password }),
      });
      let jwt = await response.text();
      localStorage.setItem(state.jwt_storage_name, jwt);
      commit('PROCESS_JWT', jwt);
      this.dispatch('validateRedirect');
      return true;
    } catch (error) {
      console.log("Auth", error);
      return false;
    }
  },
  validateRedirect: ({ getters }) => {
    let userAuthority = getters["JWTClaims"].jwt_authority;

    switch (userAuthority) {
      case "ADMINISTRADOR":
        router.push('/administrador/gestionar/cliente');
        break;
      case "COORDINADOR":
        router.push('/coordinador/ordenes-de-servicio');
        break;
      case "JEFE":
        router.push('/jefe/dashboard');
        break;
      default:
        router.push('/');
        break;
    }
  },
  logout({ commit, state }) {
    localStorage.removeItem(state.jwt_storage_name);
    commit('CLEAN_JWT');
    router.push("/login");
  },
}

const getters = {
  JWT: state => state.jwt,
  JWTClaims: state => state.jwt_cLaims,
}

export default {
  state,
  actions,
  mutations,
  getters
}
