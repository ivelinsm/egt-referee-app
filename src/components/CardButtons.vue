<template>
  <div class="buttons">
    <q-btn
      dense
      flat
      padding="11px 16px"
      aria-label="Decrease"
      class="bg-yellow"
      @click="$emit('decrease')"
    />
    <q-btn
      dense
      flat
      padding="11px 16px"
      aria-label="Increase"
      class="bg-red"
      @click="$emit('increase')"
    />
  </div>
</template>

<script setup>
defineEmits(['decrease', 'increase']);
</script>

<style scoped>
.buttons {
  display: flex;
  gap: 8px;
  justify-content: flex-start;
}
</style>