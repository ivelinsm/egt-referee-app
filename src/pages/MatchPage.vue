<template>
  <q-page class="flex flex-center column">
    <template v-if="match.status === 'loading'">
      <q-spinner color="primary" size="3em" :thickness="10" />
    </template>
    <template v-if="match.status === 'success'">
      <div class="flex flex-center wrapper boards-wrapper">
        <TeamBoard :title="teams.home?.team?.name" :rows="teams.home?.startXI" :isHomeTeam="true" />
        <TeamBoard :title="teams.away?.team?.name" :rows="teams.away?.startXI" :isHomeTeam="false" />
      </div>
      <AdditionalInfo />
    </template>
    <q-banner v-if="match.status === 'error'" inline-actions class="text-white bg-red">
      {{ match.errorMessage }}
      <template v-slot:action>
        <q-btn @click="match.fetchMatchData()" flat color="white" label="Retry" />
      </template>
    </q-banner>

  </q-page>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import TeamBoard from 'src/components/TeamBoard.vue';
import AdditionalInfo from 'src/components/AdditionalInfo.vue';
import { useMatchStore } from 'src/stores/match.js';

const match = useMatchStore();

const teams = computed(() => ({
  home: match.data.home || 'Home team',
  away: match.data.away || 'Away name'
}
))

onMounted(() => {
  match.fetchMatchData();
})

</script>

<style></style>
