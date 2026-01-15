<template>
    <div class="addition-details">
        <h2>Stadium name</h2>
        <h2>Referee name</h2>
    </div>
</template>

<script setup>
import { useMatchStore } from 'src/stores/match';

const match = useMatchStore();
</script>