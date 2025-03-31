<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  components: {}
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px #1c1f2c inset !important;
  -webkit-text-fill-color: #e5e7eb !important;
  /* Tailwind's text-gray-200 */
  transition: background-color 9999s ease-in-out 0s;
}
</style>
