<template>
    <div class="flex justify-center fauls-wrapper">
        <div> {{ cardsFormatted.yellow }}</div>
        <div> {{ cardsFormatted.red }}</div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useMatchStore } from 'src/stores/match.js';

const match = useMatchStore();

const props = defineProps({

    isHomeTeam: {
        type: Boolean,
        default: false
    },

})

const cardsFormatted = computed(() => {
    const team = props.isHomeTeam ? match.data.home : match.data.away;

    let yellowCardsCount = 0;
    let redCardsCount = 0;

    team?.startXI.map(player => {
        if (player.yellowCards) {
            yellowCardsCount += player.yellowCards;
        }
        
        if (player.redCard) {
            redCardsCount++
        }
    })

    return {
        yellow: yellowCardsCount === 1 ? `${yellowCardsCount} yellow card` : `${yellowCardsCount} yellow cards`,
        red: redCardsCount === 1 ? `${redCardsCount} red card` : `${redCardsCount} red cards`
    }
})
</script>