<template>
    <section>
<b-card no-body>
  <b-tabs pills card vertical>
    <b-tab title="Llaves Publicas y Privadas" active>
        <h3>Tutorial de Certificados</h3>

                Las llaves se guardan en <strong><i>/home/appserv/.ssh</i></strong> (carpeta oculta) en un archivo llamado <strong>authorized_keys</strong>. 

                Cuando desde un equipo en este caso el equipo Orquestador, quiero conectarme a otro, tengo que verificar que 
                el orquestador tenga su llave privada y le haya dado la llave publica correspondiente a esa llave privada, al otro equipo.

                En el equipo team, el archivo <strong>authorized_keys</strong> hay que agregar la publica, copiando el contenido de la misma.
<br>
         <button @click="show = !show">
         ¿Como genero mi Certificado?    
         </button>       
<!-- {{this.show}} -->
<!-- b64 convierte imagenes a texto -->
<transition name="aparecer"> 
         <div class="text-center" v-if="this.show">
             <p >Con la herramienta PuttyGen: </p>
             <img 
             src="data:image/png;base64,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
             " 
             alt="">
        <p>     Con esta simple herramienta se genera la llave Privada RSA y la llave Publica (que es la parte final de la llave privada). Esta ultima es la que debemos dejar en el archivo <strong>authorized_keys</strong> . Con la llave privada lo que debemos hacer es utilizarla en los programas con los que accedemos a los equipos remotos (Por ejemplo <strong>PUTTY</strong>)  </p>
        </div>
        </transition>

        <div  class="my-2">
        <h3>Conectarse a un equipo a traves de Certificados</h3>

                Esta alternativa permite que nos conectemos desde nuestra computadora a un equipo remoto sin ingresar Usuario y Contraseña.
                Consiste en generar una llave privada (y su correspondiente publica) en nuestro equipo local(nuestra pc) y luego copiar el contenido de la llave publica en el archivo authorized_keys del equipo destino.
                De esta forma, la proxima vez que ingresemos por medio de PUTTY o WinSCP, ingresaremos sin contraseña de por medio y de forma segura. 
        </div>
        <h3>Ejemplo de Clave Publica</h3>
        A Continuacion, un ejemplo del contenido de una llave publica, que se puede agregar a las claves autorizadas de un servidor:
        <p plaintext>
          ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC2aOhzDbptodHxGrO0c6tODUWQMmT9Dzi3ZZL </p> 
        <p plaintext>  /vpBDdF44gqZKyTjl1d00Bb51427Y5+2tjIQ62Qox7YFPhuzOY+6X8kUnCjIjjq4JAnLqYnz
          pX0YLtQXP5xdTtGQmlHbqteRKT5LpoPL9GTOObYzscZ </p> 
      <p>cZsLUiJ7x3apJhvvEzDvI+0CM6I5VxSwMHlhCoTUuNS8wqDJDkRcdT3tJG/Y7HVqWwlo</p>
       <p> jh63oCkU6WIJdYJeVYTCwmZxD5eARgtGYjjxQT5WPU92cBUYNvlEW684GvPt9cdji+VI0egU8ELm</p>
       <p> YwYPwn8T1zAdTRNIvgHw8XpPm0EzpkxQwKrU28cEHfuObL </p>
      <p>    juan@juanb</p>
    </b-tab>
    <b-tab title="Recetas Salt">
      <div class="salt" id="salt">
    <img src="data:image/png;base64,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" 
    alt="logoSalt">
<h3>Recetas Salt</h3>
<p>En el directorio /etc/salt del equipo Orquestador se encuentra un archivo llamado roster que contiene la configuracion de las aplicaciones y los equipos donde seran instaladas, asi como la manera de acceder a ellas:
Un ejemplo de conexion(Con llave privada):</p>

<pre>
test:
  host: test.cloudhomo.dummy.com.ar
  user: appserv
  sudo: true
  priv: /home/appserv/.ssh/id_rsa
</pre>

<p>El parametro <strong> priv</strong>, indica la LLAVE PRIVADA que utilizara el salt para acceder a ese equipo. Para que esta LLAVE funcione, la LLAVE PUBLICA correspondiente debe estar en 
las <strong>Llaves Autorizadas</strong> del equipo destino (host: test.cloudhomo.dummy.com.ar) </p>
<p>Otro ejemplo de conexion(Con password):</p>
<pre>
cuete:
    host: test-qa.cloudhomo.dummy.com.ar 
    user: appserv
    sudo: True
    passwd: appserv 
</pre>

Los archivos mas importantes a la hora de ejecutar una receta son :
/srv/salt/top.sls
y
/srv/pillar/top.sls

Cuando viene una nueva aplicacion se debe agregar una linea en estos archivos. 
Si la aplicacion ya fue instalada alguna vez, solo se modificara la parte en negrita en el salt

Error Conocido :
Si da error de que no

sudo emacs /root/.ssh/known_hosts
sudo rm /root/.ssh/known_hosts
<pre>
'test':
    - dit.sr.<b>test.2017_1_6</b>
 </pre>


La receta propiamente dicha se encuentra en el archivo init.sls ubicado en la ubicacion declarada en el <p>top.sls</p> para esa aplicacion. Tanto el Salt como el pillar tienen un top.sls que apunta a su correspondiente <strong>init.sls</strong>.
En el init.sls del salt estan las instrucciones para instalar en el equipo destino y de donde sacar los datos( generalmente apuntando al init.sls del pillar)
En el init.sls del pillar,estan las variables y valores utilizados en el salt.
-----------------------
Para correr la receta utilizamos el siguiente comando:
sudo salt-ssh "nombreapp" state.apply 
o
sudo salt-ssh "nombreapp" state.sls /dummy/application/#aplicacion/#version




---------------------------
salt-call state.sls truststore

Instala en /dummy/truststore/ los certificados de soporte

salt-call state.sls adecuacion 

Instala /tmp/standaloneadecuacion.sh (verificar adecuacion de la receta)

ejecutar /tmp/standaloneadecuacion.sh "nombredelaaplicacion"


</div>
    </b-tab>
    <b-tab title="GREP">
<p>
<p>Busqueda dentro de archivos (Comando GREP)</p>

<p>Sintaxis:</p>

<p><b>grep [options] [regexp] [filename]</b></p>
<p><i>Flags Opcionales</i></p>


<p>A continuacion una recopilacion de las opciones que me han resultado mas ultiles a lo largo de los años :</p>
<table class="table table-striped table-info">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Flag</th>
      <th scope="col">Ejemplo</th>
      <th scope="col">Descripcion</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>-r o-R	</td>
      <td>grep -r text filepattern</td>
      <td>Busqueda Recursiva , busca en el directorio indicado y en subdirectorios</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>-n</td>
      <td>grep -n text filepattern</td>
      <td>Imprime la linea donde se encontro ademas del resultado</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td >-H</td>
      <td >grep -H text filepattern</td>
      <td>Imprime el archivo donde se encontro el resultado. Si la busqueda trae mas de un resultado, hace esto por default</td>
    </tr>
    <tr>
      <th scope="row">4</th>
      <td >-l</td>
      <td >–l text filepattern</td>
      <td>	Lista los archivos que incluyen el termino buscado</td>
    </tr>
    <tr>
      <th scope="row">5</th>
      <td >-c</td>
      <td >grep –c text filepattern</td>
      <td>Imprime la cantidad de resultados que traeria.</td>
    </tr>
    <tr>
      <th scope="row">6</th>
      <td >-i</td>
      <td >grep -i text filepattern</td>
      <td>La busqueda es insensible (case insensitive)</td>
    </tr>
    <tr>
      <th scope="row">7</th>
      <td >-v</td>
      <td >grep -v text filepattern</td>
      <td>Me trae las lineas que NO contengan ese texto</td>
    </tr>
    <tr>
      <th scope="row">8</th>
      <td >-A y -B</td>
      <td >grep -A NUM "word" file o grep -B NUM "word"</td>
      <td> file	A trae las NUM cantidad de filas despues de la linea que tiene la palabra buscada, B trae las anteriores NUM filas a la busqueda.</td>
    </tr>
    <tr>
      <th scope="row">9</th>
      <td >-w</td>
      <td >grep –w text filepattern</td>
      <td>La busqueda solo trae cuando encuentra exactamente el texto ( si busco “tres”, no va a traer cuando encuentre “estres”)</td>
    </tr>
    <tr>
      <th scope="row">10</th>
      <td >--color</td>
      <td >grep -–color  text filepattern	</td>
      <td>Imprime la linea entera donde encuentra el resultado y  el resultado en color.</td>
    </tr>
    <tr>
      <th scope="row">11</th>
      <td >-E</td>
      <td >grep -e  text filepattern o egrep text filepattern	</td>
      <td>Utilización de Expresiones regulares extendidas.</td>
    </tr>
  </tbody>
</table>

    </b-tab>

  </b-tabs>
</b-card>




    </section>
</template>
<script>
export default {
   
  name: 'Tutoriales',
  data () {
    return {
      show: true,

    } 
        }
}
</script>


<style>
 #salt {
font-size: 12;
font-family: 'Courier New', Courier, monospace;
/* background: cadetblue; */
border: chocolate 2px;
} 
/* Clases de transition , se nombran transition-*/
.aparecer-enter-active, .aparecer-leave-active {
  transition: opacity .5s;
}
.aparecer-enter, .aparecer-leave-to /* .aparecer-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
