<template>
  <a :href="to" @click.prevent="navigate">
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  to: string;
}>();

const navigate = (event: Event) => {
  event.preventDefault();
  window.location.href = props.to;
};
</script>

<style scoped>
a {
  color: blue;
  text-decoration: none;
}
</style>
