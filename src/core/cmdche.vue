<template>
        <!-- COMANDOS CHE -  -->  
<div id="comandoche">  
<b-card text-variant="black"
        header="Comandos CHE!"
        class="text-center"
        border-variant="primary"
        header-bg-variant="primary"
        header-text-variant="white"
        align="center">
    <b-row>
        <b-col>
        <!-- TIPO DE SCRIPT -  -->  
        <b-form-select v-model="tiposcript" class="commandresult">
              <option :value="null">Elija Una Opción</option>
              <option value="pedido_email">Envio de Mail Personalizado</option>  
               <option value="pedido_permisos">Pedido de Permisos</option> 
               <option value="pedido_permisos_DBL">Pedido de Permisos Dblink</option> 
              <option value="parseo_grant">Generar Permisos BD desde una linea</option>
        </b-form-select>

      </b-col>
            <b-col v-if="this.tiposcript != null ">
              <b-form-select v-model="saludo" class="saludo" >
                <option value="Buenas Tardes">Seleccionar el Saludo del pedido</option>
                <option value="Buenos Dias">Buenos Dias</option>
                <option value="Buenas Tardes">Buenas Tardes</option>
                <option value="Buenas Noches">Buenas Noches</option>
                <option value="Urgente">Urgente</option>
              </b-form-select>
     </b-col>


      <!-- PERMISOS SELECT -  -->
      <b-col v-if="this.tiposcript == 'pedido_permisos' || this.tiposcript == 'pedido_permisos_DBL' ">
         <b-form-group label="Seleccione los permisos a Grantear"> 
            <b-form-checkbox-group v-model="selected" buttons button-variant="outline-danger" name="botonespermisos" :options="options">
           </b-form-checkbox-group>
        </b-form-group>
     </b-col>
     </b-row>  
        <!-- DATOS DE LA BASE -->
        <h2  v-show=" this.tiposcript == 'pedido_permisos_DBL' || this.tiposcript == 'pedido_permisos' ">Datos de la Base </h2>
        <!-- Para poner Esquema Hacer dinamico si alguna vez hace falta -->
       
        <!-- ESQUEMA -  -->
       <div v-show=" this.tiposcript == 'pedido_permisos_DBL' || this.tiposcript == 'pedido_permisos'  " class="input-group mb-3 mt-2">
             <input v-model="esquema" class="form-control" placeholder="Ingrese el nombre del Esquema Destino(Dueño de las tablas, recordar que por CGU se debe hacer un pedido por Esquema)" />
       </div>
        <!-- CAMPO 1 -  -->
        <div v-show="this.tiposcript != null && this.tiposcript != 'parseo_grant' " class="input-group mb-3 mt-2">
             <input v-model="campo1" class="form-control" :placeholder=name_campo1 />
       </div>
        <!-- CAMPO 2 -  -->
        <div v-show=" this.tiposcript == 'pedido_permisos' || this.tiposcript == 'pedido_permisos_DBL'"  class="input-group mb-3 mt-2">
             <input v-model="campo2" class="form-control" :placeholder=name_campo2 />
       </div>
        <!-- CAMPO 3 -  -->
        <div v-show="this.tiposcript != null " class="input-group mb-3 mt-2">
             <input v-model="campo3" class="form-control" :placeholder=name_campo3 />
       </div>
        <!-- CAMPO 4 -  -->
        <div v-show="this.tiposcript == 'pedido_permisos_DBL' " class="input-group mb-3 mt-2">
             <input v-model="campo4" class="form-control" :placeholder=name_campo4 />
       </div>

       <!-- LINEA A PARSEAR -->
        <div v-show="this.tiposcript == 'parseo_grant'" class="input-group mb-3 mt-2">
             <input v-model="lineaparse" class="form-control" placeholder="Ingrese la linea a parsear. Ejemplo: GRANT SELECT,UPDATE ON TABLA TO USER1,USER2" 
              />
       </div>
</b-card>
<!-- Fin del Generador -->
<br>
<br>
<!-- LINEA A PARSEAR : {{this.lineaparse}} -->
    <div v-show="this.campo1.length > 0 || this.tiposcript == 'parseo_grant' || this.tiposcript == 'pedido_email' " class="commandresult btn-warning ">
    <b-card bg-variant="white"
                text-variant="black"
                header="<strong><p style='font-size:18px'>Resultado</p></strong>"
                class="text-center border-dark "
                v-show="this.tiposcript != 'Tickets_IG'">
      <b-row>  
      <b-col v-if="!parseado" class="border-dark"> 
     <strong>
          <p   class="text-left justified" style="font-size:20px">La descripcion del Redmine sera la siguiente :</p>
        </strong>
        <!-- <br> -->
        <pre class="text-left">{{this.lineacomando}}</pre>
        <!-- <br> -->
      </b-col>
        <!-- VER QUE HAGO CON ESTO -->
        <b-col>
      
        <b-button v-if="this.tiposcript == 'pedido_permisos' || this.tiposcript == 'pedido_permisos_DBL' || this.tiposcript == 'parseo_grant'"
         variant= "primary" @click="agregarpermisos()" style="margin-top: 10px;">Agregar lineas a Archivo</b-button>
       </b-col>
       </b-row>  
        <div v-show="this.archivo.length > 0">
            <strong><p class="text-left justified" style="font-size:20px">Contenido del Archivo :</p></strong>
            <pre  class="text-left">{{this.archivo}} </pre>
        </div>
        <div v-show="this.tiposcript == 'parseo_grant'">
            <strong><p class="text-left justified" style="font-size:20px">Contenido a agregar al archivo del Archivo :</p></strong>
            <pre  class="text-left">{{tablasArray}} </pre>
        </div>
         <b-button v-show="this.tiposcript == 'pedido_email'" variant= "outline-primary" @click="copiarYEnviarMail()"  
         v-b-tooltip.hover title="Copia el Archivo, recorda pegarlo en el mail" style="margin-top: 10px;">Mail Autorizante
         </b-button>
          <b-button v-if="this.tiposcript != 'parseo_grant' " variant= "primary" @click="copycmd()"  
         v-b-tooltip.hover title="Copia el contenido, para pegarlo en otro lugar" style="margin-top: 10px;">Copiar Comando
         </b-button> 
     <b-button v-show="this.tiposcript !='pedido_email' " variant= "info" @click="download(campo3,archivo)" 
     v-b-tooltip.hover title="Descarga el archivo con las lineas cargadas" style="margin-top: 10px;">Descargar Archivo
     </b-button>
     
     <b-button v-if="this.tiposcript != null" variant= "primary" @click="limpiararchivo()" style="margin-top: 10px;">Limpiar Archivo</b-button>  
    </b-card>
    </div>
</div>
</template>


<script>

export default {
  name: 'Comandosche',
  data () {
    return {
      base: null,
      // tiposcript:null,
      tiposcript:"pedido_permisos",
      saludo:"Buenas Tardes",
      esquema:"",
      tituloRM:"",
      ABM :"Alta",
      urgente :"Normal",
      nroRM:"",
      motivo:"",
      link:"",
      campo1:"",
      campo2: "",
      campo3: "",
      campo4: "",
      selected: [], // Must be an array reference!
      options: [
        {text: 'SELECT', value: 'SELECT'},
        {text: 'INSERT', value: 'INSERT'},
        {text: 'UPDATE', value: 'UPDATE'},
        {text: 'DELETE', value: 'DELETE'},
        {text: 'EXECUTE', value: 'EXECUTE'}
        ],   
      scriptQA: false,
      lineaparse: "",
      archivo: "",
      NOPARTICIPAN: "Requiere Liberacion",
      mensajemail: "Se solicita autorizacion para implementar el siguiente release:"
      
    }
  },
  methods:{
 download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
},
doCopyfile() {
     this.$copyText(this.archivo)
    },
copiarYEnviarMail() {
      let autorizante = "";
      let concopia = "";
      let cuerpomail = this.saludo +"%0D%0A"  + this.mensajemail +"%0D%0A"  +"RM" + this.campo1 + "%0D%0A" + "Corresponde al requerimiento del asunto." + "%0D%0A "
      this.doCopyfile();
      autorizante = "AUTO RIZANTE <autorizante@dummy.gob.ar>";
      cuerpomail = cuerpomail + this.campo3
      window.open("mailto:"+autorizante+"?subject=Autorizacion para Implementar " + this.tituloRM + "&cc="+concopia+"&body="+ cuerpomail, '_self');
    },
activar() {
    if (this.scriptQA) {
     this.scriptQA = false
    }
    else this.scriptQA = true
    },
copycmd() {
     this.$copyText(this.lineacomando)
    },
agregarpermisos() {
      if (this.tiposcript == 'parseo_grant') {
        this.archivo= this.archivo + this.tablasArray
      }
      else {
        this.archivo= this.archivo + this.lineacomando
        }
    },  
limpiararchivo() {
      this.archivo= "" }
  },

  computed: {
    parseado(){ 
        var Archivoparseado
        if (this.tiposcript == 'parseo_grant') {Archivoparseado = true }
        else {Archivoparseado = false}
        return Archivoparseado
    },
    name_campo1(){ //nombresarchivo + Instancia
    var campito1 = "";
    if (this.tiposcript == 'pedido_email') {
      campito1 = "Ingrese nro de release"
    }
    else
    {
      campito1 = "Ingrese el nombre de la Tabla a la que quiere dar permiso"
    }
    ;
return campito1

    },
        name_campo2(){ //usuariopermisos
    var campito2 = "";
    campito2 = "Ingrese el nombre del usuario a darle permisos";

return campito2

    },
        name_campo3(){ // Archivos y Saludo de Mails
        var campito3 = "";
    if (this.tiposcript == 'pedido_email') {
      campito3 = "Ingrese el Saludo de despedida"
    }
    else
    {
    campito3 = "Ingrese el nombre del Archivo (para envio de mails y exportacion)";
    }
return campito3

    },
                name_campo4(){ 
    var campito4 = "Ingrese el nombre del DBlink/Instancia Destino";
return campito4

    },
    lineacomando() {
    if (this.tiposcript == 'pedido_permisos')
    { 
          var grantear = ""
           for (var i = 0; i < this.selected.length; i++) {
             grantear = grantear +  'GRANT '+ this.selected[i] + ' ON ' +  this.esquema + '.' + this.campo1 + ' TO ' + this.campo2 + ';\n'  
      }
      return grantear
      }
          else if (this.tiposcript == 'pedido_permisos_DBL')
    { 
          var grantdb = ""
           for (var i = 0; i < this.selected.length; i++) {
             grantdb = grantdb +  'GRANT '+ this.selected[i] + ' ON ' + this.esquema + '.' +  this.campo1 + "@" + this.campo4 + ' TO ' + this.campo2 + ';\n'  
      }
      return grantdb

grantdb = grantdb  +"sobre las siguientes entidades: " + '\n'  
+ this.esquema + "." + this.campo1 + '\n \n'

// + "Por ejemplo deberia quedar asi: \n"
// + "GRANT SELECT ON " + this.esquema + "." + this.campo1 + " TO DBL" + this.campo3 +"_" + this.campo2 + "; \n"
 + "El Motivo de este pedido es el siguiente: " + '\n \n'
+ this.motivo
+ 'se debe adjuntar el artefacto ' + this.link

      return grantdb
      }
    else
       return this.saludo + ": \n" +  this.mensajemail + "RM"+ this.campo1 
       + "\n" +   "Corresponde al requerimiento del asunto." 
       + "\n" +   this.campo3
      

      
    },
    tablasArray() {
    var permi = "";
    var Acmd = [];
    var Apermi = [];
    var Atab = [];
    var Ausu = [];
       if (!this.lineaparse.length) return []
       permi = this.lineaparse.slice(6) //Saca el GRANT
    //    GRANT SELECT,UPDATE ON TABLA TO USER
       Acmd = permi.split("ON") 
       Apermi = Acmd[0].split(",") //antes del ON
       Atab = Acmd[1].split("TO") //despues del ON y antes del TO 
       Ausu = Atab[1].split(",") //despues del TO
       permi = ""
    //    'GRANT ' + Apermi[0] + ',' + Apermi[1] + 'ON' + Atab[0] + 'TO' + Ausu[0] + ',' + Ausu[1]
       
        for (var k = 0; k < Ausu.length; k++)  {
           for (var j = 0; j < Atab.length-1; j++) {
             for (var i = 0; i < Apermi.length; i++) {
             permi = permi +  'GRANT '+ Apermi[i].trim() + ' ON ' + Atab[j].trim() 
            //  "@" + this.campo4 
             + ' TO ' + Ausu[k].trim()  + ';\n'  
      }}
      //Aca puedo capturar las lineas de un usuario en un Array de Archivos Aarch y despues
      }
       return permi
     },     
  }
  
}




</script>

<style>
.commandresult{
  background-color:skyblue;
  /* background-color: #83ec69; */
}
.normal {
  background-color: rgb(50, 79, 109);
  color:blue;
}
.prioridad {
  background-color: rgb(185, 4, 13);
  color:green;
}
.brillante {
  background-color:darkcyan;
  color: red;
}

#comandoche {
  background-color:darkcyan;
  margin: 1%;
  }
</style>