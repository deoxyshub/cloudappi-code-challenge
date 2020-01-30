<template>
  <div class="upgrade-dialog" v-if="prompt">
    <div class="message">
      A new version is found. Refresh to load it?
    </div>
    <div class="button accept" @click="onAccept">
      Refresh
    </div>
    <div class="button cancel" @click="prompt = false">
      Later
    </div>
  </div>
</template>

<script lang="ts" src="./sw.banner.ts"></script>
<style scoped src="./sw.banner.css"></style>
