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
    component: GestionarClienteView
  },
  {
    path: '/administrador/gestionar/empleado',
    name: 'GestionarEmpleadoView',
    component: GestionarEmpleadoView
  },
  {
    path: '/administrador/gestionar/sede',
    name: 'GestionarSedeView',
    component: GestionarSedeView
  },
  {
    path: '/administrador/gestionar/tipo-de-incidencia',
    name: 'GestionarTipoDeIncidenciaView',
    component: GestionarTipoDeIncidenciaView
  },
  {
    path: '/administrador/gestionar/tipo-de-servicio',
    name: 'GestionarTipoDeServicioView',
    component: GestionarTipoDeServicioView
  },
  {
    path: '/administrador/gestionar/usuario',
    name: 'GestionarUsuarioView',
    component: GestionarUsuarioView
  },
  {
    path: '/coordinador/ordenes-de-servicio',
    name: 'ConsultarOrdenesDeServicioView',
    component: ConsultarOrdenesDeServicioView
  },
  {
    path: '/coordinador/orden-de-servicio/generar',
    name: 'GenerarOrdenDeServicioView',
    component: GenerarOrdenDeServicioView
  },
  {
    path: '/jefe/reporte/tecnicos',
    name: 'ConsultarReporteDeTecnicosView',
    component: ConsultarReporteDeTecnicosView
  },
  {
    path: '/jefe/reporte/tipos-de-incidencia',
    name: 'ConsultarReporteDeTiposDeIncidenciaView',
    component: ConsultarReporteDeTiposDeIncidenciaView
  },
  {
    path: '/jefe/dashboard',
    name: 'DashboardView',
    component: DashboardView
  },
  {
    path: '/jefe/ordenes-de-servicio/canceladas',
    name: 'RevisarOrdenesDeServicioCanceladasView',
    component: RevisarOrdenesDeServicioCanceladasView
  },
  {
    path: '/jefe/ordenes-de-servicio/resueltas',
    name: 'RevisarOrdenesDeServicioResueltasView',
    component: RevisarOrdenesDeServicioResueltasView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
