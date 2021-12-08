<template>
  <div id="app">
    <div id="header">
      <h2><router-link to="/" exact>{{ title }}</router-link></h2>
      <router-link to="comando" exact>Comandos</router-link>
      <router-link to="template" exact>Template</router-link>
      <!-- <router-link to="Tutoriales" exact>Tutoriales</router-link> -->
      <router-link to="reportes" exact>Reportes</router-link>
      <router-link to="escenarios" exact>Escenarios</router-link>
      <!-- <router-link to="aplicaciones" exact>Aplicaciones</router-link> -->
      <router-link to="contacto" exact>Acerca de</router-link>
    </div>
    <div id="container">
      <router-view></router-view>
    </div>
    <div class="prefooter">
    </div>
    <mifooter></mifooter>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      title: 'Herramientas Che!'
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  
}

#header {
  padding: 15px 10px;
  background: #0f5ba7cb;
  color: #FFF;
}

#header h2 {
  display: inline-block;
  margin-right: 20px;
}

#container {
  padding: 5px 25px;
}

h1, h2 {
  font-weight: normal;
}

a {
  text-decoration: none;
  padding: 5px;
  border-radius: 3px;
}

#header a {
  color: #FFF;
}

 .router-link-active {
  background: #42b983;
  color: #FFF;
}

 .prefooter {
margin-bottom: 5%;
}

/* Colors 
eabe7c
3c4f76
383f51 */
</style>

