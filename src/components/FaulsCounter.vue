<template>
  <div class="flex justify-center fauls-wrapper">
    <div>{{ cardsFormatted.yellow }}</div>
    <div>{{ cardsFormatted.red }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useMatchStore } from 'src/stores/match.js'

const match = useMatchStore()

const props = defineProps({
  isHomeTeam: {
    type: Boolean,
    default: false,
  },
})

const countCards = (team) => {
  const startXI = team?.startXI

  return startXI.reduce(
    (acc, player) => {

      acc.yellow += player?.yellowCards
      acc.red += player?.redCard

      return acc
    },
    { yellow: 0, red: 0 },
  )
}

const cardsFormatted = computed(() => {
  const team = props.isHomeTeam ? match.data.home : match.data.away

  const { yellow, red } = countCards(team)

  return {
    yellow:
      yellow === 1
        ? `${yellow} yellow card`
        : `${yellow} yellow cards`,
    red: red === 1 ? `${red} red card` : `${red} red cards`,
  }
})
</script>
