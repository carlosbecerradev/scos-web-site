import Vue from 'vue'
import VueRouter from 'vue-router'
import IniciarSesionView from '../views/IniciarSesionView'
import GestionarClienteView from '../views/administrador/GestionarClienteView'
import GestionarEmpleadoView from '../views/administrador/GestionarEmpleadoView'
import GestionarSedeView from '../views/administrador/GestionarSedeView'
import GestionarTipoDeIncidenciaView from '../views/administrador/GestionarTipoDeIncidenciaView'
import GestionarTipoDeServicioView from '../views/administrador/GestionarTipoDeServicioView'
import GestionarUsuarioView from '../views/administrador/GestionarUsuarioView'
import ConsultarOrdenesDeServicioView from '../views/coordinador/ConsultarOrdenesDeServicioView'
import GenerarOrdenDeServicioView from '../views/coordinador/GenerarOrdenDeServicioView'
import ConsultarReporteDeTecnicosView from '../views/jefe/ConsultarReporteDeTecnicosView'
import ConsultarReporteDeTiposDeIncidenciaView from '../views/jefe/ConsultarReporteDeTiposDeIncidenciaView'
import DashboardView from '../views/jefe/DashboardView'
import RevisarOrdenesDeServicioCanceladasView from '../views/jefe/RevisarOrdenesDeServicioCanceladasView'
import RevisarOrdenesDeServicioResueltasView from '../views/jefe/RevisarOrdenesDeServicioResueltasView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'IniciarSesionView',
    component: IniciarSesionView
  },
  {
    path: '/administrador/gestionar/cliente',
    name: 'GestionarClienteView',
    component: GestionarClienteView,
    meta: { protectedRoute: true }
  },
  {
    path: '/administrador/gestionar/empleado',
    name: 'GestionarEmpleadoView',
    component: GestionarEmpleadoView,
    meta: { protectedRoute: true }
  },
  {
    path: '/administrador/gestionar/sede',
    name: 'GestionarSedeView',
    component: GestionarSedeView,
    meta: { protectedRoute: true }
  },
  {
    path: '/administrador/gestionar/tipo-de-incidencia',
    name: 'GestionarTipoDeIncidenciaView',
    component: GestionarTipoDeIncidenciaView,
    meta: { protectedRoute: true }
  },
  {
    path: '/administrador/gestionar/tipo-de-servicio',
    name: 'GestionarTipoDeServicioView',
    component: GestionarTipoDeServicioView,
    meta: { protectedRoute: true }
  },
  {
    path: '/administrador/gestionar/usuario',
    name: 'GestionarUsuarioView',
    component: GestionarUsuarioView,
    meta: { protectedRoute: true }
  },
  {
    path: '/coordinador/ordenes-de-servicio',
    name: 'ConsultarOrdenesDeServicioView',
    component: ConsultarOrdenesDeServicioView,
    meta: { protectedRoute: true }
  },
  {
    path: '/coordinador/orden-de-servicio/generar',
    name: 'GenerarOrdenDeServicioView',
    component: GenerarOrdenDeServicioView,
    meta: { protectedRoute: true }
  },
  {
    path: '/jefe/reporte/tecnicos',
    name: 'ConsultarReporteDeTecnicosView',
    component: ConsultarReporteDeTecnicosView,
    meta: { protectedRoute: true }
  },
  {
    path: '/jefe/reporte/tipos-de-incidencia',
    name: 'ConsultarReporteDeTiposDeIncidenciaView',
    component: ConsultarReporteDeTiposDeIncidenciaView,
    meta: { protectedRoute: true }
  },
  {
    path: '/jefe/dashboard',
    name: 'DashboardView',
    component: DashboardView,
    meta: { protectedRoute: true }
  },
  {
    path: '/jefe/ordenes-de-servicio/canceladas',
    name: 'RevisarOrdenesDeServicioCanceladasView',
    component: RevisarOrdenesDeServicioCanceladasView,
    meta: { protectedRoute: true }
  },
  {
    path: '/jefe/ordenes-de-servicio/resueltas',
    name: 'RevisarOrdenesDeServicioResueltasView',
    component: RevisarOrdenesDeServicioResueltasView,
    meta: { protectedRoute: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

import store from '../store/index.js'

router.beforeEach((to, from, next) => {
  const isProtectedRoute = to.matched.some(route => route.meta.protectedRoute)
  const JWT = localStorage.getItem("cablemas_scos_jwt")
  if (isProtectedRoute) {
    if (JWT == null) {
      next({ path: '/login' })
    }
    if (isExpiredJWT(JWT)) {
      next({ path: '/login' })
    } else {
      store.commit('PROCESS_JWT', JWT)
      next()
    }
  }
  next()
});

const isExpiredJWT = (token) => {
  try {
    const jwtExpired = JSON.parse(Buffer.from(token.split('.')[1], 'base64')).exp;
    const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
    return currentTimestampInSeconds - jwtExpired >= 0 ? true : false;
  } catch (error) {
    return true;
  }
};

export default router
