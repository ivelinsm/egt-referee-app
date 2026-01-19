<template>
    <div class="addition-details">
        <h2>{{ match.data.referee }}</h2>
        <h2>{{ match.data.venue }}</h2>
    </div>
</template>

<script setup>
import { useMatchStore } from 'src/stores/match';

const match = useMatchStore();
</script>