<template>
  <div class="about">
    <section>
      <h2>About Gian</h2>
      <p>
        {{ $t("about.as.developer") }}
      </p>
      <p>
        {{ $t("about.as.gian") }}
      </p>
    </section>
  </div>
</template>

<style scoped>
section {
  padding: 1rem 0 1.5rem 1rem;
}
section > h2 {
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.625rem;
  letter-spacing: 0;
  color: #161616;
}

section > p {
  margin: 1rem 0rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.125rem;
  letter-spacing: 0.16px;
  color: #393939;
}
</style>
