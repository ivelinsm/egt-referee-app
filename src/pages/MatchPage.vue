<template>
  <q-page class="flex flex-center column">
    <template v-if="status === STATUS.LOADING">
      <q-spinner color="primary" size="3em" :thickness="10" />
    </template>
    <template v-else-if="status === STATUS.SUCCESS">
      <div class="flex flex-center wrapper boards-wrapper">
        <TeamBoard 
          :title="teams.home?.team?.name" 
          :rows="teams.home?.startXI" 
          :isHomeTeam="true" 
        />
        <TeamBoard 
          :title="teams.away?.team?.name" 
          :rows="teams.away?.startXI" 
          :isHomeTeam="false" 
        />
      </div>
      <AdditionalInfo />
    </template>
    <q-banner v-else inline-actions class="text-white bg-red">
      {{ match.errorMessage }}
      <template v-slot:action>
        <q-btn @click="retryFetch" flat color="white" label="Retry" />
      </template>
    </q-banner>

  </q-page>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import TeamBoard from 'src/components/TeamBoard.vue';
import AdditionalInfo from 'src/components/AdditionalInfo.vue';
import { useMatchStore } from 'src/stores/match.js';
import { STATUS } from 'src/utilities/helpers';

const match = useMatchStore();

const teams = computed(() => ({
  home: match.data?.home,
  away: match.data?.away
}
))

const status = computed(() => match.status)

const retryFetch = () => {
  match.fetchMatchData();
}

onMounted(() => {
  match.fetchMatchData();
})

</script>
