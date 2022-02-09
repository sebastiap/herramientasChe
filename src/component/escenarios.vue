<template>
     <div>
    <h1>Generador de Escenarios de Prueba</h1> 
    <b-card bg-variant="light">
    <b-form-group
      label-cols-lg="3"
      label="Escenario de Pruebas"
      label-size="lg"
      label-class="font-weight-bold pt-0"
      class="mb-0"
    >
                        <!-- sistema: '',
                        aplicacion: '',
                        nombre_Escenario: '',
                        objetivo: '',
                        descripcion: '',
                        precondiciones: '',}, -->

      <b-form-group
        label-cols-sm="3"
        label="Sistema:"
        label-align-sm="right"
        label-for="sistema"
      >
        <!-- <b-form-input v-model="newscenario.sistema"  id="sistema"></b-form-input> -->
        <b-form-select v-model="newscenario.sistema">
          <option default value=""> Seleccione un Sistema</option>
          <option v-bind:value="sis" v-for="sis in sistemas" >{{sis}}</option>
        </b-form-select> 
      </b-form-group>

      <b-form-group
        label-cols-sm="3"
        label="Aplicacion:"
        label-align-sm="right"
        label-for="aplicacion"
      >
        <!-- <b-form-input v-model="newscenario.aplicacion"  id="aplicacion"></b-form-input> -->
        <b-form-select v-model="newscenario.aplicacion">
          <option default value=""> Seleccione una Aplicacion</option>
          <option v-bind:value="app" v-for="app in aplicaciones" >{{app}}</option>
        </b-form-select> 
      </b-form-group>
      <transition name="component-fade" mode="out-in">
      <div v-show="this.newscenario.aplicacion != ''">
      <b-form-group
        label-cols-sm="3"
        label="Nombre del Escenario:"
        label-align-sm="right"
        label-for="nombre_Escenario"
      >
        <b-form-input v-model="newscenario.nombreEscenario"  id="nombre_Escenario"></b-form-input>
      </b-form-group>

      <b-form-group
        label-cols-sm="3"
        label="Objetivo:"
        label-align-sm="right"
        label-for="objetivo"
      >
        <b-form-input v-model="newscenario.objetivo"  id="objetivo"></b-form-input>
      </b-form-group>

      <b-form-group
        label-cols-sm="3"
        label="Descripcion:"
        label-align-sm="right" class="mb-0" label-for="descripcion"
      >
      <b-form-input v-model="newscenario.descripcion" id="descripcion"></b-form-input>
      </b-form-group>
            <b-form-group
        label-cols-sm="3"
        label="Precondiciones:"
        label-align-sm="right" class="mb-0" label-for="Precondiciones"
      >
      <b-form-input v-model="newscenario.precondiciones" id="Precondiciones"></b-form-input>
      </b-form-group>
      </div></transition>
    </b-form-group>
  </b-card>
  <b-card>
    
  </b-card>
  <transition name="component-fade" mode="out-in">
  <b-card v-show="this.newscenario.descripcion != ''" title="Escenario" header-tag="header" bg-variant="default" footer-tag="footer">
      <h6 slot="header" class="mb-0">Nuevo Escenario</h6>
      <b-list-group>
        <b-list-group-item variant="dark"><b> Sistema:</b> {{newscenario.sistema}}</b-list-group-item>
        <b-list-group-item variant="dark"><b>Aplicacion:</b> {{newscenario.aplicacion}}</b-list-group-item>
        <b-list-group-item variant="primary"><b>Nombre del Escenario:</b> {{newscenario.nombreEscenario}}</b-list-group-item>
        <b-list-group-item variant="primary"><b>Objetivo:</b> {{newscenario.objetivo}}</b-list-group-item>
        <b-list-group-item variant="primary"><b>Descripcion:</b> {{newscenario.descripcion}}</b-list-group-item>
        <b-list-group-item variant="success"><b>Precondiciones:</b> {{newscenario.precondiciones}}</b-list-group-item>
      </b-list-group>
      <!-- <b-button @click="guardaEscenario()" variant="primary">Crear Escenario</b-button> -->
      <b-button @click="guardaEscenario()" variant="primary">Crear Escenario</b-button>

  <b-modal id="modal-1">
    <div class="d-block">El escenario se cargo exitosamente!</div>
  </b-modal>

      <em slot="footer">Fin del Escenario</em>
  </b-card>
  </transition>
</div>

</template>

<script>
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
    name:'escenarios',
    props: {
    tipo: String
  },
    data() {
      return {
                  newscenario: {
                        sistema: '',
                        aplicacion: '',
                        nombreEscenario: '',
                        objetivo: '',
                        descripcion: '',
                        poscondiciones: '',
                        precondiciones: 'Ninguna',
                        sistemaAplicacion:{id:1,"sistema":"Servicios","aplicacion":"Gaucho"}},
                        

                  fecha: '',
                  sistemas: ["Servicios","Web","Intranet"],
                  aplicaciones: ["Gaucho","Sistema Mate","Consulta Rosendo"],
    }    
          },
     mounted() {
        this.cargaSistemas();
    },
    updated() {
        if (this.newscenario.sistema != ''){
        this.cargaAplicaciones()}
    },
     methods:{
         showModal() {
         this.$root.$emit('bv::show::modal', 'modal-1', '#btnShow')
         },
         hideModal() {
         this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
         },
         toggleModal() {
          this.$root.$emit('bv::toggle::modal', 'modal-1', '#btnToggle')
         },
        cargaSistemas() {
        //     this.axios.get('/greta/api/sistema')
        //     .then((respuesta) => 
        // {this.sistemas = respuesta.data;
        // })
        },
       cargaAplicaciones() {
            var appsist = this.newscenario.sistema;
        //     this.axios.get('/greta/api/sistema/'+ appsist +'/aplicaciones')
        //     .then((respuesta) => 
        // {this.aplicaciones = respuesta.data;
        // })
        },
        guardaEscenario() {
          // Se deshabilita ya que es un backend externo
//             this.axios.post('/greta/api/escenario', this.newscenario
// // {"nombreEscenario":"Escenario","objetivo":"Recorrer todas las pantallas de la aplicacion sin detectar errores","descripcion":"Se ingresa en cada una de las pantallas de la aplicacion y se verifica que no se produzcan excepciones al ingresar en cada una de ellas(SMOKE TEST)","precondiciones":"La aplicacion y las bases deben estar levantadas","sistemaAplicacion":{"id":1,"sistema":"st","aplicacion":"bordo"}
// // }

//                   )
//                   .then(function (response) {
//                     console.log(response);
//                   })
//                   .catch(function (error) {
//                     console.log(error);
//                   })
            this.showModal();
                  }
                  },
  computed: {
 largo() {
    return this.newscenario.poscondiciones["length"];
    
},
}
  }
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .5s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


</style>
