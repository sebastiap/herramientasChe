import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router/router.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
// import FileSaver from 'file-saver';
// import { saveAs } from 'file-saver/FileSaver';
import * as fileSaver from 'file-saver';

import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueClipboard from 'vue-clipboard2' 
import VueQuillEditor from 'vue-quill-editor'

// require styles quill
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, /* { default global options } */)

// Cada vez que meto una importo una libreria tengo que mandar un import y un Vue.use
Vue.use(BootstrapVue)
Vue.use(VueClipboard)
Vue.use(VueAxios, axios)
// Vue.prototype.$http = axios;

// new Vue({
//   el: '#app',
//   render: h => h(App)
// })

// router.beforeEach((to, from, next) => {
//   if (!to.meta.private)
//     next()
//   else {
//     alert("Perdiste la sesiòn")
//     next("/")
//   }
// })


Vue.component('mifooter', {

	template:' <div style="position: fixed;padding-top:0%; margin-top:30%;bottom:0%;height: 60px;width:100%; background-color:#0f5ba7cb;color:white">' +
  '<p class="text-center">Copyright &copy 2016, Sebastian Picardi. All Rights Reserved.</p>' + 
  '</div>',


})


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
