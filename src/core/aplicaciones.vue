<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Filtro" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Escriba para Buscar" />
            <b-input-group-button>
              <b-btn :disabled="!filter" @click="filter = ''">Limpiar</b-btn>
            </b-input-group-button>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Ordenar" class="mb-0">
          <b-input-group>
            <b-form-select v-model="sortBy" :options="sortOptions">
              <option slot="first" :value="null">-- Ninguno --</option>
            </b-form-select>
            <b-input-group-button>
              <b-form-select :disabled="!sortBy" v-model="sortDesc">
                <option :value="false">Asc</option>
                <option :value="true">Desc</option>
              </b-form-select>
            </b-input-group-button>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-1">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Paginas" class="mb-0">
          <b-form-select :options="pageOptions" v-model="perPage" />
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table show-empty
             stacked="md"
             :items="items"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             @filtered="onFiltered"
    >
      <template slot="App" slot-scope="row">{{row.value.first}} {{row.value.last}}</template>
      <template slot="isActive" slot-scope="row">{{row.value?'Si :)':'No :('}}</template>
      <template slot="opciones" slot-scope="row">
        <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1">
          Modal
        </b-button>
        <b-button size="sm" @click.stop="row.toggleDetails">
          {{ row.detailsShowing ? 'Ocultar' : 'Mostrar' }} Detalles
        </b-button>
      </template>
      <template slot="row-details" slot-scope="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value}}</li>
          </ul>
        </b-card>
      </template>
    </b-table>

    <b-modal id="modalInfo" @hide="resetModal" :title="modalInfo.title" ok-only>
      <pre>{{ modalInfo.content }}</pre>
    </b-modal>

  </b-container>
</template>

<script>
const items = [


  { isActive: true, Port: 80, Serv:'che-app-qa.cloudhomo.dummy.com.ar', App: { first: 'CHE QA', last: 'Internet' }, Ip:"10.4.33.201" },
  { isActive: true, Port: 80, Serv:'che-app-qa.cloudhomo.dummy.com.ar', App: { first: 'CHE TEST', last: 'Internet' }, Ip:"10.4.33.138" },
  { isActive: true, Port: 443, Serv:'zorzal.cloudhomo.dummy.com.ar', App: { first: 'Gardel', last: ''  }, Ip:"127.0.0.1", _rowVariant: 'info' },
     {    isActive: true,    Serv:'choripan.cloudhomo.dummy.com.ar',    Port: 91,    App: { first: 'Consulta', last: 'Resumida' },    _cellVariants: { Ip: 'danger'}
  },
 { isActive: true, Port: 80, Serv:'gualicho-qa.cloudhomo.dummy.com.ar', App: { first: 'Gualicho', last: 'Internet' }, Ip:"10.4.33.156" },
 { isActive: true, Port: 80, Serv:'rosendo.cloudhomo.dummy.com.ar', App: { first: 'Rosendo', last: 'Intranet' }, Ip:"10.4.33.148" },
  { isActive: true, Port: 80, Serv:'guacho.cloudhomo.dummy.com.ar', App: { first: 'Guacho', last: 'Internet' }, Ip:"10.4.33.169" },
 { isActive: true, Port: 80, Serv:'gaucho.cloudhomo.dummy.com.ar', App: { first: 'Gaucho', last: 'Internet' }, Ip:"10.4.32.226" },
 { isActive: true, Port: 80, Serv:'amargo.cloudhomo.dummy.com.ar', App: { first: 'Dulce', last: 'de Leche' }, Ip:"10.4.50.54" }, 
  { isActive: true, Port: 80, Serv:'mate.cloudhomo.dummy.com.ar', App: { first: 'Mate', last: 'Internet/Intranet' }, Ip:"10.4.50.54" },
  { isActive: true, Port: 80, Serv:'che-qa.cloudhomo.dummy.com.ar', App: { first: 'Alta', last: 'CHE' }, Ip:"10.4.33.153" },
 { isActive: true, Port: 80, Serv:'puerto-qa.cloudhomo.dummy.com.ar', App: { first: 'Puerto', last: 'Internet' }, Ip:"10.4.33.156" },
 { isActive: true, Port: 80, Serv:'puerto-qa.cloudhomo.dummy.com.ar', App: { first: 'Puerto', last: 'Intranet' }, Ip:"10.4.33.156" },
  { isActive: true, Port: 80, Serv:'che.cloudhomo.dummy.com.ar', App: { first: 'Consulta', last: 'CHE' }, Ip:"10.4.33.169" },
 { isActive: true, Port: 443, Serv:'truco.dummy.com.ar', App: { first: 'Truco', last: ' ' }, Ip:"127.0.0.1", _rowVariant: 'info' },
   { isActive: true, Port: 443, Serv:'sur.cloudhomo.dummy.com.ar', App: { first: 'Borges', last: 'Online'  }, Ip:"127.0.0.1", _rowVariant: 'info' },
{ isActive: true, Port: 80, Serv:'amargo.cloudhomo.dummy.com.ar', App: { first: 'Bondi', last: 'APP' }, Ip:"10.4.50.54" }, 
{ isActive: true, Port: 80, Serv:'generico.cloudhomo.dummy.com.ar', App: { first: 'MENU', last: 'APP' }, Ip:"10.4.50.54" },  
  { isActive: false, Port: 8080, App: { first: 'Gauchito', last: 'Gil' }  ,  _rowVariant: 'danger' ,    Serv:'palagilada.cloudhomo.dummy.com.ar', Ip:"120.168.32.226"},
  {
    isActive: true,
    Serv:'bariloche.cloudhomo.dummy.com.ar',
    Port: 443,
    App: { first: 'Nahuelito', last: 'del Lago' },
    Ip:"10.4.32.226",
    _rowVariant: 'success'
  },
  {
    isActive: true,
    Serv:'palagilada.cloudhomo.dummy.com.ar',
    Port: 87,
    App: { first: 'Difunta', last: 'Correa' },
    _cellVariants: { Ip: 'danger', isActive: 'warning' }
  },
 { isActive: false, Port: 8080, App: { first: 'Mis', last: 'Cosas' }  ,  _rowVariant: 'danger' ,    Serv:'palagilada.cloudhomo.dummy.com.ar', Ip:"120.168.32.226"},
 { isActive: true, Port: 8080, App: { first: 'Nuestra', last: 'App' }  ,  Serv:'che.cloudhomo.dummy.com.ar', Ip:"120.168.32.226"},
  {
    isActive: true,
    Serv:'bariloche.cloudhomo.dummy.com.ar',
    Port: 443,
    App: { first: 'Taxi', last: ' Libre' },
    Ip:"10.4.32.226",
    _rowVariant: 'success'
  },
]

export default {
  data () {
    return {
      items: items,
      fields: [
        { key: 'App', label: 'Aplicacion', sortable: true },
        { key: 'Serv', label: 'Servidor', sortable: true },
        { key: 'Ip', label: 'Ip', sortable: true },
        { key: 'Port', label: 'Puerto', sortable: true, 'class': 'text-center' },
        { key: 'isActive', label: 'is Active' },
        { key: 'opciones', label: 'Opciones' }
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: items.length,
      pageOptions: [ 5, 10, 15, 20 ],
      sortBy: null,
      sortDesc: false,
      filter: null,
      modalInfo: { title: '', content: '' }
    }
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    }
  },
  methods: {
    info (item, index, button) {
      // this.modalInfo.title = `Row index: ${index}`
      this.modalInfo.title = `Aplicacion: ${item.App.first + ' ' + item.App.last}`
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    },
    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>
