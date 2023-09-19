<template>
  <div class="quotes glass">

  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue"
const quote = ref()
</script>

<style scoped>
.glass{
  color: white;
  overflow: hidden;
  background-color: rgba(0,0,0,0.2);
  backdrop-filter: blur(10px);
  border-radius: 5px;
}
.quotes{
  position: relative;
  width: 250px;
  padding: 20px;
}
</style>