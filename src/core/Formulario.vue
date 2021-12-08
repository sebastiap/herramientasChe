<template>
  <div class="novedades">
    <b-row align-v="center" class="mb-2">
      <b-col>
        <h3 class="mb-0 mt-2">Template de Novedades</h3>
        <h5 class="text-muted">Genere sus novedades con el siguiente template</h5>
      </b-col>
      <b-col cols="auto">
              <b-button id="correo" variant="primary" @click="copiarYEnviarMail()">
        <i class="fa fa-fw fa-envelope" aria-hidden="true"></i>
         Copiar y Abrir correo
        </b-button>
        <b-button type="button" variant="primary" @click="doCopy()">
          <i class="fa fa-fw fa-clipboard"  aria-hidden="true"></i>
          Copiar
        </b-button>
     </b-col>
     </b-row>
     <hr class="hrtemplate">
     <b-row align-v="center" align-h="end" class="mb-2">
        <b-dropdown
          split
          split-variant="outline-primary"
          variant="outline-info"
          text="Ejemplo"
        >
        <div slot="button-content" @click="ejemplo(1)">
        <i class="fa fa-flag fa-lg" aria-hidden="true"></i> Ejemplos
        </div>
          <b-dropdown-item @click="ejemplo(1)">Ejemplo TESTER</b-dropdown-item>
          <b-dropdown-item @click="ejemplo(2)">Ejemplo ANEXO</b-dropdown-item>
          <b-dropdown-item @click="ejemplo(3)">Ejemplo QA</b-dropdown-item>
        </b-dropdown>
        <b-dropdown
          split
          split-variant="outline-primary"
          variant="outline-success"
          class="ml-1"
        >
        <div slot="button-content" @click="loadear(1)">
        <i class="fa fa-file-text fa-lg" aria-hidden="true"></i> 
        Cargar Sesion
        </div>
        
          <b-dropdown-item @click="loadear(1)">1 - {{sesiones.s1}}</b-dropdown-item>
          <b-dropdown-item @click="loadear(2)">2 - {{sesiones.s2}}</b-dropdown-item>
          <b-dropdown-item @click="loadear(3)">3 - {{sesiones.s3}}</b-dropdown-item>
        </b-dropdown>
        <b-dropdown
          split
          split-variant="outline-primary"
          variant="outline-primary"
          class="ml-1"
        >
        <div slot="button-content" @click="cachear(1)">
        <i class="fa fa-floppy-o fa-lg" aria-hidden="true" ></i> 
        Guardar Sesion
        </div>

          <b-dropdown-item @click="cachear(1)">1 - {{sesiones.s1}}</b-dropdown-item>
          <b-dropdown-item @click="cachear(2)">2 - {{sesiones.s2}}</b-dropdown-item>
          <b-dropdown-item @click="cachear(3)">3 - {{sesiones.s3}}</b-dropdown-item>
        </b-dropdown>

        <!-- BOTON PARA CERRAR SESIONES POR SI HACE FALTA -->
        <!-- <b-button id="correo" variant="outline-danger" v-b-modal.myModal >
        <i class="fa fa-fw fa-bomb fa-lg" aria-hidden="true"></i>
         Borrar Sesion
        </b-button>
        <b-modal ok-variant="danger" id="myModal">¿Esta seguro de que desea borrar sus sesiones guardadas? 
            <div slot="modal-ok" @click="borrarcache()"> 
            Borrar Sesiones
            </div>
            <div variant="outline-danger" slot="modal-cancel"> 
            Cancelar
            </div>
        </b-modal>  -->
    </b-row>
    <b-row>
     <b-col cols="3">
      <h5 class="label text-primary">Campos</h5>
          <b-form-group>
            <b-form-select v-model="camposfmlr.area">
              <option :value="null">Seleccionar área</option>
              <option value="novedades_test@dummyorg.com">TEST IP</option>
              <option value="anexo-qa@dummyorg.com">Anexo QA</option>
              <option value="novedades-qa@dummyorg.com">Grupo QA</option>
             </b-form-select>
          </b-form-group>
        <hr/>
        <!-- <div class="input-group mb-3">
          <input ref="Rsistema" class="form-control" v-model="camposfmlr.sistema" @focus="editandoCampo = 'camposfmlr.sistema'" placeholder="Sistema"/>
        </div> -->
        <b-form-group>
            <b-form-select v-model="camposfmlr.sistema">
              <option :value="null">Seleccionar Sistema</option>
              <option value="TEST">TEST</option>
              <option value="SCT">SCT</option>
              <option value="QA">QA</option>
              <option value="ANEXO">ANEXO</option>
              <option value="MISC">MISC</option>
            </b-form-select>
        </b-form-group>

        <div class="input-group mb-3">
          <input ref="Rsistema" class="form-control" v-model="camposfmlr.aplicacion" @focus="editandoCampo = 'camposfmlr.aplicacion'" placeholder="Aplicacion"/>
        </div>
      <div class="input-group mb-3">
          <input class="form-control" v-model="camposfmlr.Vaplicacion" @focus="editandoCampo = 'camposfmlr.Vaplicacion'" placeholder="Version de la Aplicacion"/>
      </div>
      <div class="input-group mb-3">
      <date-picker hoy v-model="camposfmlr.fecha" @focus="editandoCampo = 'camposfmlr.fecha'" ></date-picker>
      </div>
      <div class="input-group mb-3">
      <input v-model="camposfmlr.ticket" class="form-control" @focus="editandoCampo = 'camposfmlr.ticket'" placeholder="Ticket"/>
      </div>
      <div class="input-group mb-3">
      <input v-model="camposfmlr.novedades" class="form-control" @focus="editandoCampo = 'camposfmlr.novedades'" placeholder="Novedades"/>
      </div>
      <hr/>
      <div class="input-group mb-3">
      <textarea class="form-control" v-model="camposfmlr.introduccion" placeholder="Introduccion"/>
      </div>
      <div id="DescripcionconTooltip" class="input-group">
            <quill-editor v-model="camposfmlr.descripcion" placeholder="Descripcion"
                  ref="quillEditorA"
                  :options="editorOption">
		        </quill-editor>
      </div>
    <b-tooltip target="DescripcionconTooltip" placement="top" title="Recorda ingresar el detalle lo mas claro posible, con un lenguaje sencillo y orientado a un usuario funcional. No es aconsejable incluir detalles tecnicos en este campo."></b-tooltip>
    </b-col>
     <b-col>
       <h5 class="label text-primary">Vista Previa</h5>
                  <span id="body_style" style="display:block" ref="template">
                     <table summary="" class="table table-inverse bg-primary" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tbody style="background: #1881BA;"><tr>
                           <td>
                              <table summary="" width="640" cellspacing="0" cellpadding="0" border="0" align="center" >
                                 <tbody><tr>
                                    <td class="logoContainer">
                                       <!-- <a href="/home" title="DUMMY logo">
                                       <img class="logo" src="data:image/png;base64,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" alt="DUMMY logo" width="102" height="28">
                                       </a> -->
                                       <p class="logo">♦♥♠♣</p>
                                   <td class="webversion"> <a class="novedades-sus"
                           :href="this.mailnovedades"
                            title="¿Querés suscribirte a las novedades?">
                            <p style="color:#FFFFFF; font-size:12px;
                              text-align:right;">¿Querés suscribirte a las novedades?</p>
                                   </a> </td>
                                    
                                    <td class="webversion">
                                    </td>
                                 </tr>
                              </tbody></table>
                           </td>
                        </tr>
                     </tbody></table>
                      <div>     
                     <table width="100%" >
  <tbody align="right" ><tr>
    <td width="40%">
      <div style="  text-align:center; height:140px; width:140px;background-image: url(data:image/png;base64,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)">
          <div style=" color: #008080; padding-top:15px; font-weight: bold; font-size: 2.2rem; height:50px">INF</div>
          <div style=" color: #008080; padding-top:0px; font-weight: bold; font-size: 2.4rem;">NOV</div>

      </div>
    </td>
    <td>
      <div style=" text-align:left;  font-size: 1.5rem;  color: #0075A8;  line-height: 25px;  margin-bottom: 5px;" >DEPTO. DESARROLLO DE SISTEMAS </div>
      
      <hr>
      <div  style=" text-align:left;  font-size: 1.1rem;  color: #5E5E5E;  margin-top: 7px;" >Informa la siguiente implementación</div>
    </td>
  </tr>
</tbody></table>
</div>
                     
                     <table class="table table-inverse table-info" summary="" width="640" cellspacing="0" cellpadding="0"
                     border="0" align="center" style="table-layout: fixed; background: #daf1f8;">
                        <tbody>
                        <tr>
                           <td class="label" align="right">Sistema</td>
                           <td width="10"></td>
                           <td class="txt-destacado" id="sistema-label" style="font-weight: bold;">
                             <span class="editable" :class="{'resaltado': editandoCampo == 'camposfmlr.sistema'}">{{camposfmlr.sistema}}</span>
                            </td>
                        </tr>
                        <tr>
                           <td class="label" align="right">Aplicación</td>
                           <td width="10"></td>
                           <td class="txt-destacado" id="aplicacion-label" style="font-weight: bold;">
                             <span class="editable" :class="{'resaltado': editandoCampo == 'camposfmlr.aplicacion'}">{{camposfmlr.aplicacion}}</span>
                            </td>
                        </tr>
                        <tr>
                           <td class="label" align="right">Versión de la Aplicación</td>
                           <td width="10"></td>
                           <td class="txt-destacado" id="aplicacion-label" style="font-weight: bold;">
                             <span class="editable" :class="{'resaltado': editandoCampo == 'camposfmlr.Vaplicacion'}">{{camposfmlr.Vaplicacion}}</span>
                            </td>
                        </tr>
                        <tr>
                           <td class="label" align="right">Fecha de Implementación</td>
                           <td width="10"></td>
                           <td class="txt-destacado" id="imp-label" style="font-weight: bold;">
                             <span class="editable" :class="{'resaltado': editandoCampo == 'camposfmlr.fecha'}">{{camposfmlr.fecha}}</span>
                           </td>
                        </tr>
                        <tr>
                           <td class="label" align="right">Ticket de implementación</td>
                           <td width="10"></td>
                           <td class="txt-destacado" id="ticket-label" style="font-weight: bold;">
                               <span class="editable" :class="{'resaltado': editandoCampo == 'camposfmlr.ticket'}">
                                <span v-for="(ticket, key) in ticketsArray" :key="key">
                                  <a :href="'https://redmine.cloud.dummy.com/issues/' + ticket.trim()">#{{ticket.trim()}}</a>&nbsp;
                                </span>
                               </span>
                          </td>
                        </tr>
                        <tr>
                           <td class="label" align="right">Novedades</td>
                           <td width="10"></td>
                           <td class="txt-destacado" id="novedades-label" style="font-weight: bold;">
                             <span class="editable" :class="{'resaltado': editandoCampo == 'camposfmlr.novedades'}">{{camposfmlr.novedades}}</span>
                           </td>
                        </tr>
                     </tbody></table>
                     <table summary="" width="640" cellspacing="0" cellpadding="0" border="0" align="center">
                        <tbody><tr>
                           <td>
                              <h1 id="title-label" class="editable asunto">{{this.Titulo_Asunto}}</h1>
                           </td>
                        </tr>
                        <tr v-show="this.camposfmlr.introduccion.length > 0">
                           <td>
                              <span  class="editable" :class="{'resaltado': editandoCampo == 'camposfmlr.introduccion'}">{{camposfmlr.introduccion}}</span>
                           </td>
                        </tr>
                     </tbody></table>
                     <table summary="" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tbody><tr>
                              <table summary="" width="640" cellspacing="0" border="0" align="center">
                                 <tbody><tr>
                                    <td class="sectionPadding editable" id="detalle-label">
                                    <div class="content ql-editor" v-html="camposfmlr.descripcion"></div>
                                    </td>
                                 </tr>
                              </tbody></table>
                        </tr>
                        <tr>
                           <td>
				<table summary="" width="640" cellspacing="0" border="0" align="center">
                                 <tbody><tr>
                                    <td class="sectionPadding">
                                       <div id="firma">
					<div>Atte.</div>
					<div class="cursiva">DEPTO. DESARROLLO DE SISTEMAS</div>
					</div>
                                    </td>
                                 </tr>
                              </tbody></table>
			   </td>
                        </tr>
                     </tbody></table>
                     <table summary="" class="topHeader bg-primary" width="100%" cellspacing="0" cellpadding="0" border="0.5">
                        <tbody style="background: #1881BA;"><tr>
                           <td>
                              <table summary="" width="640" cellspacing="0" cellpadding="0" border="0" align="center">
                                 <tbody><tr>
                                    <td class="logoContainer">
                                      <p class="logo">DUMMY♣</p>

                                    </td>
                                    <td class="webversion">
                                    </td>
                                 </tr>
                              </tbody></table>
                           </td>
                        </tr>
                     </tbody></table>
                                           <a style=" font-size:12px;
                              text-align:center;" class="novedades-sus"
                    :href="this.cancelarsusc"
                            title="¿Desea Desuscribirse?">
                            <p class="text-center"> ¿Desea desuscribirse?</p>
                                   </a>
                  </span>
      
    </b-col>
</b-row>
  </div>
</template>

<script>
 import datePicker from '../component/DatePicker.vue'

export default {
   components: { datePicker },
  name: 'TemplateNov',
  data () {
    return {
      // Variables de Sesion
      camposfmlr: {
        area: null,
        sistema:null,
        aplicacion:"",
        Vaplicacion:"",
        fecha:"",
        ticket:"",
        novedades:"",
        titulo:"",
        introduccion: "",
        descripcion: ""
        },
      fieldsDefault:
      {
        area: null,
        sistema:null,
        aplicacion:"",
        Vaplicacion:"",
        fecha:"",
        ticket:"",
        novedades:"",
        titulo:"",
        introduccion: "",
        descripcion: ""
        },
      sesiones: {
        s1:"",
        s2:"",
        s3:""
      },
      hoy:null,  
      // Variables de Formulario (viejas)
      area: null,
      editandoCampo: null,
      htmltemplate : null,
      editorOption: {
        theme: 'snow',
        placeholder: 'Ingrese la descripcion aqui...'
      }
    }
  },
  methods:{
    doCopy() {
     this.$copyText(this.$refs.template.innerHTML)
    },
    copiarYEnviarMail() {
      this.doCopy()
      window.open(this.mail, '_self')
    },
    copiarYEnviarSusc() {
      this.doCopy()
      window.open(this.mailnovedades, '_self')
    },
    cachear(s) {
    var sesion = s;
    var asunto;
    asunto = this.camposfmlr.novedades
    localStorage.setItem('fields', JSON.stringify(this.camposfmlr));
    if (s > 0) {
      localStorage.setItem('fields'+ s, JSON.stringify(this.camposfmlr));
      if (sesion == 1) {this.sesiones.s1 = asunto}
      else if (sesion == 2) {this.sesiones.s2 = asunto}
      else this.sesiones.s3 = asunto;
    }
    },
    loadear(s) {
    if (s > 0) {
    this.camposfmlr = JSON.parse(localStorage.getItem('fields'+ s))
    this.camposfmlr.fecha = this.hoy;
    }
    else  
    this.camposfmlr = JSON.parse(localStorage.getItem('fields'))
    },
    ejemplo(e) {
    //ARREGLAR ESTO Se pasan por valor, esto hay que arreglarlo para que no rompa
    this.camposfmlr = this.fieldsDefault;
    this.camposfmlr.introduccion = "Registro de Pruebas de Aplicaciones";
    if (e == 1) {this.camposfmlr.area = "novedades_test@dummyorg.com"; 
    this.camposfmlr.sistema = "TEST";
    this.camposfmlr.aplicacion = "TESTER";
    this.camposfmlr.titulo = "TESTER";
    this.camposfmlr.Vaplicacion =  '2019.1.1';}
    else if (e == 2) { this.camposfmlr.area = "anexo-qa@dummyorg.com"; 
    this.camposfmlr.sistema = "ANEXO";
    this.camposfmlr.aplicacion = "APLICACION A";
    this.camposfmlr.titulo=  "APLICACION A";
    this.camposfmlr.Vaplicacion =  '2019.1.1';}
    else {this.camposfmlr.area = "novedades-qa@dummyorg.com"; 
    this.camposfmlr.sistema = "QA";
    this.camposfmlr.aplicacion =  "qaonline";
    this.camposfmlr.titulo ="qaonline";
    this.camposfmlr.Vaplicacion = '2019.1.1';}
    this.camposfmlr.fecha = this.hoy;
    this.$refs.Rsistema.focus();
    },
    borrarcache() {
    //  localStorage.removeItem('fields')
     localStorage.clear();
     this.sesiones.s1 = "";     this.sesiones.s2 = "";     this.sesiones.s3 = "";
    },


  }
  ,
  created() {
    if (localStorage.getItem('fields')) {
      this.camposfmlr = JSON.parse(localStorage.getItem('fields'))
      this.sesiones.s1 = JSON.parse(localStorage.getItem('fields1')).aplicacion
      this.sesiones.s2 = JSON.parse(localStorage.getItem('fields2')).aplicacion
      this.sesiones.s3 = JSON.parse(localStorage.getItem('fields3')).aplicacion
      // this.fields.fecha = formatDate(new Date())
    } else
      this.camposfmlr = JSON.parse(JSON.stringify(this.fieldsDefault))
      //  this.camposfmlr = this.fieldsDefault
  },
mounted() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) { dd = '0' + dd;}
    if (mm < 10) { mm = '0' + mm;}
    today = dd + '/' + mm + '/' + yyyy;
    this.camposfmlr.fecha = today;
    this.hoy = today;
},
  computed: {
    dirsuscripcion(){
      // 
    if (this.camposfmlr.area == 'novedades_control@dummyorg.com') {return 'novedades_control@dummyorg.com' }
    else if (this.camposfmlr.area == 'novedades_test@dummyorg.com') {return "novedades_test@dummyorg.com"}
    else if (this.camposfmlr.area == 'aplicaciones-novedades@dummyorg.com') {return "aplicaciones-novedades@dummyorg.com"}
    else if (this.camposfmlr.area == 'novedades-qa@dummyorg.com') {return "novedades-qa@dummyorg.com" }
    else if (this.camposfmlr.area == 'anexo-qa@dummyorg.com') {return "novedades-qa@dummyorg.com"}
    else {return "misc@dummyorg.com"}
    },
    areasuscripcion(){
      // 
    if (this.camposfmlr.area == 'novedades_control@dummyorg.com') {return ' HOMOLOGACION CONTROL' }
    else if (this.camposfmlr.area == 'novedades_test@dummyorg.com') {return "TEST"}
    else if (this.camposfmlr.area == 'aplicaciones-novedades@dummyorg.com') {return "APLICACIONES"}
    else if (this.camposfmlr.area == 'novedades-qa@dummyorg.com') {return "GRUPO QA" }
    else if (this.camposfmlr.area == 'anexo-qa@dummyorg.com') {return "ANEXO QA"}
    else {return "misc@dummyorg.com"}
    },
    CCmail(){
      // 
    if (this.camposfmlr.area == 'novedades_control@dummyorg.com') {return ' HOMOLOGACION CONTROL' }
    else if (this.camposfmlr.area == 'novedades_test@dummyorg.com') {return "novedades_test@dummyorg.com"}
    else if (this.camposfmlr.area == 'novedades-qa@dummyorg.com') {return "novedades-qa@dummyorg.com" }
    else if (this.camposfmlr.area == 'anexo-qa@dummyorg.com') {return "anexo-qa@dummyorg.com"}
    else {return "misc@dummyorg.com.ar"}
    },
      mail() {
      return "mailto:" + this.camposfmlr.area + "?cc=" + this.CCmail + "&subject=[Novedades DI DECS] - " + this.camposfmlr.sistema + " - " + this.camposfmlr.novedades
    },
    mailnovedades() {
      return "mailto:" + this.dirsuscripcion + "?subject=[SUSCRIBIR] Novedades de " + this.areasuscripcion + "&body=Se%20solicita%20la%20SUSCRIPCI%C3%93N%20a%20las%20novedades%20de%20"+ this.areasuscripcion
    },
    cancelarsusc() {
    return "mailto:"  + this.dirsuscripcion + "?subject=[CANCELAR+SUSCRIPCI%C3%93N]%20Novedades%20" + this.areasuscripcion + "&body=Se%20solicita%20CANCELAR%20la%20SUSCRIPCI%C3%93N%20a%20las%20novedades%20de%20" + this.areasuscripcion
    },
    ticketsArray() {
      if (!this.camposfmlr.ticket.length) return []
      return this.camposfmlr.ticket.split(",")
    },
    ticketsArrayRC() {
      if (!this.camposfmlr.ticket.length) return []
      return this.camposfmlr.ticket.split(",")
    },
    Titulo_Asunto() { 
      return this.novedades
    },

  }
}
</script>

<style lang="scss" scoped>

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  padding: 0
}

.editable {
	transition: background-color ease .25s;
	padding: 2px 6px;
	border-radius: 3px;
}

.resaltado {
  background-color: #FFBF09;
}
.asunto {
	border-radius: 0px;
}

.logo {
	font-size: 26px;
  color: #eabe7c;
}

.novedades {
margin-bottom: 10%;
}

</style>