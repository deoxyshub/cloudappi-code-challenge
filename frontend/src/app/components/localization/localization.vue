<template>
  <div class="wrapper">
    <a :selected="activeLocale === 'es'" @click.prevent="setLocale('es')">
      <img
        src="../../../assets/peru.svg"
        :alt="$t('location.country.peru')"
        :title="$t('location.flat.spanish')"
      />
    </a>
    <a :selected="activeLocale === 'en'" @click.prevent="setLocale('en')">
      <img
        src="../../../assets/usa.svg"
        :alt="$t('location.country.unitedstates')"
        :title="$t('location.flat.english')"
      />
    </a>
  </div>
</template>

<script lang="ts" src="./localization.ts"></script>
<style scoped src="./localization.css"></style>
