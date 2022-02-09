<template>
     <div>
  <b-card bg-variant="light">
    <h1>Generador de Reportes de Prueba</h1> 
              <b-form-group
        label-cols-sm="3"
        label="Ticket Release:"
        label-align-sm="right" class="mb-10"
        label-for="ticket"
      > 
      <b-form-input v-model="formRep.ticket" label ="ticket"></b-form-input>
         </b-form-group>
     <transition name="fade">
    <b-form-group v-if="formRep.ticket != ''"
      label-cols-lg="1"
      label="Filtros Elegidos"
      label-size="lg"
      label-class="font-weight-bold pt-0"
      class="mb-0">
    <b-container class="bv-example-row">
    <b-row>
    <!-- Primera Fila -->
    <b-col>
      <b-form-group
        label-cols-sm="3"
        label="Sistema:"
        label-align-sm="right"
        label-for="nested-street"
      >
        <b-form-input v-model="formRep.sistema" id="nested-street"></b-form-input>
      </b-form-group>
    </b-col>
    <b-col>
      <b-form-group
        label-cols-sm="3"
        label="Aplicacion:"
        label-align-sm="right"
        label-for="nested-city"
      >
        <b-form-input  v-model="formRep.aplicacion" id="nested-city"></b-form-input>
 
      </b-form-group>
    </b-col>
    <b-col>
      <b-form-group
        label-cols-sm="3"
        label="Version:"
        label-align-sm="right"
        label-for="nested-country"
      >
        <b-form-input v-model="formRep.version"  id="nested-country"></b-form-input>
      </b-form-group>
    </b-col>
    </b-row>
    <!-- Segunda Fila -->
    <b-row>  
      <b-col>
      <b-form-group
        label-cols-sm="3"
        label="Artefacto:"
        label-align-sm="right"
        label-for="nested-state"
      >
        <b-form-input v-model="formRep.artefacto" id="nested-state"></b-form-input>
      </b-form-group>
     </b-col>
      <b-col>
      <b-form-group
        label-cols-sm="3"
        label="Homologador:"
        label-align-sm="right"
        label-for="homologador"
      >
        <b-form-input v-model="formRep.homologador"  id="homologador"></b-form-input>
      </b-form-group>
      </b-col>
      <b-col>
      <b-form-group
        label-cols-sm="3"
        label="Fecha:"
        label-align-sm="right" class="mb-10"
        label-for="fecha"
      > 
      <b-form-input v-model="formRep.fecha" id="fecha"></b-form-input>
      </b-form-group>  
      </b-col>      
      </b-row>
      </b-container> 
   </b-form-group>
   </transition>
  </b-card>
    <h3 style="margin-top: 10px;">Agregar Escenario</h3>
        <b-input-group  prepend="Escenario" style="margin-top: 10px;">
     <b-form-select v-model="caso" class="iluminado" >
          <option value="0"> Selecciona el escenario testeado</option>
          <option v-bind:value="item" v-for="(item, index)  in escenarios" >{{item.tipo}} - {{item.escenario}}</option>
    </b-form-select>
    <!-- {{escenarios}} -->
      <!-- {{this.formRep.aplicacion}} -->
  </b-input-group>
    <b-button  v-if="caso != 0" variant="info" @click="Agregar(caso)" style="margin: 10px;">Agregar Escenario al Reporte</b-button>
    <b-card v-if="largo > 0" bg-variant="ligth" border-variant="dark" text-variant="black" >
        <h2 >Escenarios Testeados</h2>
        <b-table striped hover :items="probados">
        </b-table> 
    </b-card>
  <!-- defecto   -->
  <!-- <transition name="component-fade" mode="out-in"> -->
  <div>
  <h3  style="margin-top: 10px;">Informar Defectos</h3>
  <b-input-group prepend="Nuevo Defecto" class="mt-3">
    <b-form-input v-model="tiknum" placeholder="Numero Ticket"></b-form-input>
    <b-form-input v-model="tikdesc" placeholder="Descripcion Defecto"></b-form-input> 
  <b-dropdown text="Severidad" variant="outline-primary">
    <b-dropdown-item @click="prioridad('Alta')" style="color:red">Alta</b-dropdown-item>
    <b-dropdown-item @click="prioridad('Media')" style="color:#fd7e14">Media</b-dropdown-item>
    <b-dropdown-item @click="prioridad('Baja')" style="color:green">Baja</b-dropdown-item>
    <b-dropdown-item @click="prioridad('Mejora')" style="color:teal">Mejora</b-dropdown-item>
  </b-dropdown>
  </b-input-group>

  <b-button variant="primary" style="margin: 10px;" @click="AddTicket(newticket)">Informar Defecto</b-button>
  </div>
  <!-- </transition>    -->
    <b-card v-if="largoRM > 0" bg-variant="ligth" border-variant="dark" text-variant="black" >
          <h2>Defectos Reportados</h2>
        <b-table striped hover :items="reportados">
        </b-table> 
    </b-card>
  <!-- <b-list-group>
  <b-list-group-item variant="primary">Mejora - Visualizacion </b-list-group-item>
  <b-list-group-item variant="success">Defecto Leve </b-list-group-item>
  <b-list-group-item variant="warning">Defecto Medio</b-list-group-item>
  <b-list-group-item variant="danger">Defecto Grave</b-list-group-item>
</b-list-group> -->
  <transition name="component-fade" mode="out-in">
    <b-card v-if="largo > 0" bg-variant="default" border-variant="dark" text-variant="black" style="margin: 10px;">
    <h2 style="text-align: center;">Elija una Opcion</h2>
    <b-button block variant="success" @click="implementar('Si')">Implementar </b-button>
    <b-button block variant="danger" @click="implementar('No')">Vuelta de Error</b-button>
   </b-card>
  </transition>
  <b-card v-if="formRep.resultado != 'OK'" bg-variant="light" border-variant="warning" text-variant="black" style="margin: 10px;">
  <h2>Resultado de la prueba</h2>
  <b-alert show variant="warning"> {{this.formRep.resultado}} </b-alert>
  <br>
  <h2>Observaciones</h2>
  <h4>{{this.formRep.observaciones}}</h4>
  </b-card>
 <!-- {{this.probados}}  -->
<b-button block v-if="this.largo != 0" @click="pdfgen" variant="dark">Generar PDF</b-button>
</div>
</template>

<script>
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
    name:'reportes',

    props: {
    tipo: String
  },
    data() {
      return {
                tiknum: "",
                        tikpri: "Alta",
                        tikdesc: "",
                formRep: {
                        sistema: '',
                        aplicacion: '',
                        artefacto: '',
                        version: '',
                        homologador: '',
                        ticket: '',
                fecha: '',
                resultado: 'OK',
                observaciones:'Paso las pruebas de Regresion sin problemas. ' 
                },
              items: [
                { escenario:'001- CUIT VALIDO', tipo: 'Manual', resultado: 'exito' },
                { escenario:'002- CUIT ERRONEO', tipo: 'Manual', resultado: 'exito' },
                { escenario:'005- CUIT INVALIDO', tipo: 'Manual', resultado: 'exito' },
                { escenario:'011- CUIT VACIO', tipo: 'Automatico', resultado: 'exito' },
                { escenario:'Caso no Contemplado', tipo: 'Manual', resultado: 'exito' }
                      ],
              escenarios: [],
              caso: 0,
                      probados: [],
                      reportados: [],
              nombrearch: 'Reporte_de_Pruebas.pdf',    
              arr : [
                { id:0, val1: 'a', val2: '1' },
                { id:1, val1: 'b', val2: '2' },
                { id:2, val1: 'c', val2: '3' } 
              ]
      }    
},
    mounted() {
        this.cargaEscenarios()
    },
   /*  EN CASO DE USAR API
      updated() {
        if (this.formRep.aplicacion != '')
        {this.cargaEscenarios()}
    },*/
  methods:{
    cargaEscenarios() {
        var llamada = '/greta/api/escenario'
        /*
        try {
          if (this.formRep.aplicacion != '')
          // {llamada = 'greta/api/aplicacion/'+ this.formRep.aplicacion  +'/escenarios'}
          {llamada = 'greta/api/aplicacion/'+ this.formRep.aplicacion  +'/escenarios'}

          this.axios.get(llamada)
          .then((respuesta) => 
          {this.escenarios = respuesta.data;
          })
        }
        catch (error) {
            console.error(error);
          */
          
          this.escenarios =   [    { escenario:'001- DATOS VALIDOS', tipo: 'manual',objetivo:'Caso con Datos Validos',descripcion:'Caso en el cual todos los datos ingresados son validos',precondiciones:'N/A' },
          { escenario:'005- DATOS INVALIDOS', tipo: 'manual',objetivo:'Caso con Datos Invalidos',descripcion:'Caso en el cual alguno de los datos ingresados es invalidos',precondiciones:'N/A'},
          { escenario:'002- NRO IDENTIFICACION ERRONEO', tipo: 'manual',objetivo:'Identificacion Invalida para ingresar',descripcion:'Caso en el que el dato Nro identificacion es incorrecto',precondiciones:'Precondiciones'},
          { escenario:'011- NRO IDENTIFICACION VACIO', tipo: 'automatico',objetivo:'Verificar que no se ha completado el ID',descripcion:'Caso en el que el dato Nro identificacion no es completado',precondiciones:'Precondiciones' },
          { escenario:'Caso no Contemplado', tipo: 'manual',objetivo:'Nuevo Caso',descripcion:'Se homologo un caso nuevo, derivado de observaciones del Tester.',precondiciones:'N/A'}] ; 
       // }

    },
    Agregar(agregado) {
            // return this.probados.push(filename)}
            // this.$set(this.probados, this.largo, { escena:'010- CUIT NUEVO', tip: 'manual', resultad: 'exito' });

            // if (Agregado != null) {
            this.$set(this.probados, this.largo, agregado);
            // }
            // else
            // {
            //  this.$set(this.probados, this.largo, { escenario:'007- CUIT NUEVO', tipo: 'manual', resultado: 'exito' });
            // }
                        },
                AddTicket(ticket) {
                        console.log(ticket)
                        // newticket Pasar a Array?
                        var reportado = this.reportados
                        var posicion = this.largoRM;
      var tik =  ticket;
      if (tik.prioridad == 'Alta') {tik._rowVariant= 'danger'} else
      if (tik.prioridad == 'Media') {tik._rowVariant= 'warning'} else
      if (tik.prioridad == 'Baja') {tik._rowVariant= 'success'}
      else {tik._rowVariant= 'info'}; //(tik.prioridad == 'Mejora')
                        this.$set(reportado, posicion, tik);
                        },
                prioridad(pri) {
                 this.tikpri = pri;
    },
    implementar(respuesta)
      {if (respuesta == 'Si') {this.formRep.resultado = 'Puede implementarse - Se detectaron defectos de baja Gravedad'}
       else {this.formRep.resultado = 'Quedamos a la espera de resolucion por parte de desarrollo.'}},
        Delete(id) {
        this.$delete(this.arr, id);
                },
    download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
},
    pdfgen: function () {
      var pdfMake = require('pdfmake/build/pdfmake.js')
      if (pdfMake.vfs == undefined){
        var pdfFonts = require('pdfmake/build/vfs_fonts.js')
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
      }
      var docDefinition = { content: this.contenido, styles: this.estilospdf}
      pdfMake.createPdf(docDefinition).download(this.nombrearch)
    },
},
  computed: {
 largo() {
    return this.probados["length"];
},
 largoRM() {
    return this.reportados["length"];
    
},
 newticket() {
    return { numero:this.tiknum, prioridad:this.tikpri ,        descripcion:this.tikdesc} ;
    
},
estilospdf() {
        return {
                header: {
                        fontSize: 18,
                        bold: true,
                        margin: [0, 0, 0, 10]
                },
                subheader: {
                        fontSize: 16,
                        bold: true,
                        margin: [0, 10, 0, 5]
                },
                tableExample: {
                        margin: [0, 5, 0, 15]
                },
                tableHeader: {
                        bold: true,
                        fontSize: 13,
                        color: 'black'
                }
        }
        },
 contenido() { 
  var pruebas = 'BLABLABLA'
  var agregado = ''
  var ticket = 1234
  var tabla = { 
                              widths: ['auto', 'auto', '*', 'auto'],
                                body: [
                                        ['Nombre Escenario',	'Objetivo','Descripcion','Precondiciones'],
                                        ['Nombre Escenario',	'Objetivo','Descripcion','Precondiciones']
                                ]
                        }
  var tablaA = {
                                    widths: ['auto', 'auto', '*'],
                                body: [
                                        ['Ticket', 'Severidad', 'Descripcion'],
                                        ['No se reportaron tickets de defecto de esta prioridad', 'N/A', 'N/A']
                                ]
      }
  var tablaB = {widths: ['auto', 'auto', '*'],        body: [['Ticket ', 'Severidad', 'Descripcion'],['No se Reportaron tickets de defecto', 'N/A', 'N/A']],margin: [0, 20, 0, 8]}
  var tablaC = {widths: ['auto', 'auto', '*'],        body: [['Ticket ', 'Severidad', 'Descripcion'],['No se Reportaron tickets de defecto', 'N/A', 'N/A']],margin: [10, 20, 10, 8]}
  var tablaD = {widths: ['auto', 'auto', '*'],        body: [['Ticket ', 'Severidad', 'Descripcion'],['No se Reportaron tickets de defecto', 'N/A', 'N/A']]}
   for (var i = 0; i < this.probados.length; i++) {
    tabla.body[i+1] = [this.probados[i].escenario,this.probados[i].objetivo,
    this.probados[i].descripcion,this.probados[i].precondiciones]
   } 
  var a = 1;
  var b = 1;
  var c = 1;
  var d = 1;
  for (var j = 0; j < this.reportados.length; j++) {
   var prioridad = this.reportados[j].prioridad;
   
   if (prioridad == "Alta") {console.log('tablaA'+ a);tablaA.body[a] = [this.reportados[j].numero,this.reportados[j].prioridad,this.reportados[j].descripcion];    a++;}
   else if (prioridad == 'Media') {console.log('tablaB' + b);tablaB.body[b] = [this.reportados[j].numero,this.reportados[j].prioridad,this.reportados[j].descripcion];    b++;}
   else if (prioridad == 'Baja') {console.log('tablaC' + c);tablaC.body[c] = [this.reportados[j].numero,this.reportados[j].prioridad,this.reportados[j].descripcion];    c++;}
   else {tablaD.body[d] = [this.reportados[j].numero,this.reportados[j].prioridad,this.reportados[j].descripcion];    d++;}
//    switch (this.reportados[j].prioridad) {
//   case 'Alta':
//     tablaA.body[a] = [this.reportados[j].numero,this.reportados[j].prioridad,this.reportados[j].descripcion];
//     a++;
//   case 'Media':
//     tablaB.body[b] = [this.reportados[j].numero,this.reportados[j].prioridad,this.reportados[j].descripcion];
//     b++;
//   case 'Baja':
//     tablaC.body[c] = [this.reportados[j].numero,this.reportados[j].prioridad,this.reportados[j].descripcion];
//     c++;
//   default:
//     tablaD.body[d] = [this.reportados[j].numero,this.reportados[j].prioridad,this.reportados[j].descripcion];
//     d++;
// }
  } 
  return [
                {
                        columns: [
        {
                image: 'data:image/png;base64,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'
,                width: 130,
          heigth: 100
                    },
                                {
          width: '*',
          text: [
            {text: 'Reporte de Pruebas \n', fontSize: 30,bold: true,margin: [0, 0, 0, 0],alignment: 'right', },
            {text: 'Departamento Homologacion de SGD DIT \n', fontSize: 15,margin: [0, 0, 0, 0],alignment: 'right',decoration: 'underline'},
            {text: 'Fecha - '+  this.formRep.fecha,fontSize: 13,alignment: 'right',bold: true},,
            // {text: 'Sistema Registral  ', fontSize: 10,alignment: 'right'},
            // {text: 'independently ', italics: true, fontSize: 40},
            // 'then.\n\n'
              ]                
        },
                        ]
                },
    {table:  {body: [[{text:'El siguiente reporte de pruebas corresponde a la Homologacion del Ticket',alignment: 'center'}],],        widths: ['*'],},         fillColor: '#dddddd'},
    {columns: [
                {text: 'Sistema - '+ this.formRep.sistema,fontSize: 13},
    {text: 'Aplicacion - '+  this.formRep.aplicacion,fontSize: 13,alignment: 'center'},
    {text: 'Version - '+ this.formRep.version,fontSize: 13,alignment: 'right'},
    ]},
    {columns: [
    {text: 'Ticket Release - '+ this.formRep.ticket,fontSize: 13},
    {text: 'Artefacto - '+  this.formRep.artefacto,fontSize: 13,alignment: 'center'},    
                {text: 'Homologador - '+  this.formRep.homologador,fontSize: 13,alignment: 'right'},
    ]},
                {text: 'Casos Testeados', style: 'header'},
                {table: tabla,         fillColor: '#dddddd'},
    {text: 'Defectos reportados', style: 'header'},
          {                        style: 'tableExample',table: tablaA, fillColor: '#dc3545'},
          {                        style: 'tableExample',table: tablaB, fillColor: '#ffc107'},
          {                        style: 'tableExample',table: tablaC, fillColor: '#28a745'},
          {                        style: 'tableExample',table: tablaD, fillColor: '#17a2b8'},
                     
                {text: 'Resultado \n',fontSize: 20},
    {text: ' -' + this.formRep.resultado},
    {text: 'Observaciones \n',fontSize: 20},
                {text: ' -' + this.formRep.observaciones},
        ]


 },
}, 

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
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.iluminado{
    background-color: #eaec69;
}


</style>
