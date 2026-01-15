<template>
  <div>
    <h1>{{ props.title }}</h1>
    <div class="table-wrapper" :class="[props.isHomeTeam ? 'home-team-bg' : 'away-team-bg']">
      <q-table :rows="rowsFormatted" :columns="COLUMNS" :pagination="{ rowsPerPage: 11 }" class="transperent-table"
        row-key="name" hide-pagination dense flat>
        <template #body-cell-buttons="slotProps">
          <q-td :props="slotProps"
            :class="{ bold: slotProps.row.bold, yellow: slotProps.row.yellow > 0, red: slotProps.row.red > 0 }">
            <CardButtons :isHomeTeam="props.isHomeTeam" :playerNumber="slotProps.row.number" />
          </q-td>
        </template>
      </q-table>
    </div>
    <FaulsCounter :isHomeTeam="props.isHomeTeam"/>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import CardButtons from './CardButtons.vue';
import FaulsCounter from './FaulsCounter.vue';

const props = defineProps({
  title: {
    type: String,
    default: 'TEAM NAME'
  },

  isHomeTeam: {
    type: Boolean,
    default: false
  },

  rows: {
    type: Array,
    default: () => []
  },

})

const rowsFormatted = computed(() => props.rows?.map(row => ({
  number: row.number,
  name: row.name,
  position: row.position,
  buttons: '[] []',
  bold: row.yellowCards || row.redCard,
  yellow: row.yellowCards,
  red: row.redCard,
}
))
)

const COLUMNS = [{
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
];

</script>
