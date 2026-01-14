<template>
  <div>
    <h1>{{ props.title }}</h1>
    <div class="table-wrapper" :class="[ props.isHomeTeam ? 'home-team-bg' : 'away-team-bg' ]">
      <q-table :rows="rows" :columns="columns" :flat="true" row-key="name" hide-pagination :dense="true" class="transperent-table" >
      <template #body-cell-buttons="slotProps">
          <q-td :props="slotProps">
            <CardButtons />
          </q-td>
        </template>  
      </q-table>
    </div>
    <FaulsCounter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CardButtons from './CardButtons.vue';
import FaulsCounter from './FaulsCounter.vue';

const rows = ref([{
  number: 1,
  name: 'Player Name',
  position: 'Player Position',
  buttons: '[ ] [ ]'
},
{
  number: 2,
  name: 'Player Name',
  position: 'Player Position',
  buttons: '[ ] [ ]'
},
{
  number: 3,
  name: 'Player Name',
  position: 'Player Position',
  buttons: '[ ] [ ]'
}]);

const columns = ref([{
  name: 'number',
  label: 'No',
  align: 'left',
  field: 'number'
},
{
  name: 'name',
  label: 'Name',
  align: 'left',
  field: 'name'
},
{
  name: 'position',
  label: 'Position',
  align: 'left',
  field: 'position'
},
{
  name: 'buttons',
  label: '',
  align: 'left',
  field: 'buttons'
}
]);


const props = defineProps({
  title: {
    type: String,
    default: 'TEAM NAME'
  },

  isHomeTeam: {
    type: Boolean,
    default: false
  }
})
</script>