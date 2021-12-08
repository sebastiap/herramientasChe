import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../core/Home.vue'
import page404 from '../component/page404.vue'
import Contacto from '../core/Contacto.vue'
import Aplicaciones from '../core/Aplicaciones.vue'
import Formulario from '../core/Formulario.vue'
import Tutoriales from '../core/Tutoriales.vue'
import reportes from '../component/reportes.vue'
import escenarios from '../component/escenarios.vue'
import cmdche from '../core/cmdche.vue'


Vue.use(VueRouter)

const routes = [
    { path: '/reportes', component: reportes },
    { path: '/escenarios', component: escenarios },
    { path: '/template', component: Formulario },
    { path: '/templateQA', component: Formulario },
    { path: '/Aplicaciones', component: Aplicaciones },
    { path: '/Tutoriales', component: Tutoriales },
    { path: '/contacto', component: Contacto },
    { path: '/comando', component: cmdche },
    { path: '/comandoChe', component: cmdche },
    { path: '/home', component: Home },
    { path: '/', component: Home },
    { path: '*', component: page404 }
  ]
  
export default new VueRouter({
  mode: 'hash',
  routes, // short for `routes: routes`
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})