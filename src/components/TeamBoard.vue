<template>
  <div>
    <h1>{{ props.title }}</h1>
    <div class="table-wrapper" :class="[isHomeTeam ? 'home-team-bg' : 'away-team-bg']">
      <q-table
        :rows="rowsFormatted"
        :columns="COLUMNS"
        :pagination="PAGINATION"
        class="transperent-table"
        hide-pagination
        dense
        flat
      >
        <template #body-cell-buttons="slotProps">
          <q-td
            :props="slotProps"
            :class="{
              bold: slotProps.row.bold,
              yellow: slotProps.row.yellow > 0,
              red: slotProps.row.red > 0,
            }"
          >
            <CardButtons :isHomeTeam="isHomeTeam" :playerNumber="slotProps.row.number" />
          </q-td>
        </template>
      </q-table>
    </div>
    <FaulsCounter :isHomeTeam="isHomeTeam" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import CardButtons from './CardButtons.vue'
import FaulsCounter from './FaulsCounter.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'TEAM NAME',
  },

  isHomeTeam: {
    type: Boolean,
    default: false,
  },

  rows: {
    type: Array,
    default: () => [],
  },
})

const PAGINATION = { rowsPerPage: 11 };

const rowsFormatted = computed(() =>
  (props.rows?.map((row) => ({
    number: row.number,
    name: row.name,
    position: row.position,
    bold: Boolean(row.yellowCards || row.redCard),
    yellow: Number(row.yellowCards),
    red: Number(row.redCard),
  }))),
)

const COLUMNS = [
  {
    name: 'number',
    label: 'No',
    align: 'left',
    field: 'number',
  },
  {
    name: 'name',
    label: 'Name',
    align: 'left',
    field: 'name',
  },
  {
    name: 'position',
    label: 'Position',
    align: 'left',
    field: 'position',
  },
  {
    name: 'buttons',
    label: '',
    align: 'left',
    field: 'buttons',
  },
]
</script>
