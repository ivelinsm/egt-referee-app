<template>
  <div class="buttons">
    <q-btn
      dense
      flat
      padding="11px 16px"
      aria-label="Decrease"
      class="bg-yellow"
      @click="match.addYellowCard(isHomeTeam, playerNumber)"
    />
    <q-btn
      dense
      flat
      padding="11px 16px"
      aria-label="Increase"
      class="bg-red"
      @click="match.addRedCard(isHomeTeam, playerNumber)"
    />
  </div>
</template>

<script setup>
import { useMatchStore } from 'src/stores/match.js';

const match = useMatchStore();
const props = defineProps({
  isHomeTeam: {
    type: Boolean,
    default: false
  },
  
  playerNumber: {
    type: Number
  }
})

const setRedCard = () => {
  console.log(props.isHomeTeam, props.playerNumber)
  match.addRedCard(props.isHomeTeam, props.playerNumber)
}

defineEmits(['decrease', 'increase']);
</script>

<style scoped>
.buttons {
  display: flex;
  gap: 8px;
  justify-content: flex-start;
}
</style>