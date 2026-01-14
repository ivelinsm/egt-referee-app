<template>
  <q-page class="flex flex-center column">
    <div class="flex flex-center wrapper boards-wrapper">
      <TeamBoard title="CSKA" :isHomeTeam="true"/>  
      <TeamBoard title="LEVSKI" :isHomeTeam="false"/>
    </div>
    <AdditionalInfo />
  </q-page>
</template>

<script setup>
import TeamBoard from 'src/components/TeamBoard.vue';
import AdditionalInfo from 'src/components/AdditionalInfo.vue';
</script>

<style>
</style>
