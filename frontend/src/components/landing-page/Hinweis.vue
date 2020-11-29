<template>
  <div class="content mt-2 border-b col-6">
    Info: Unter /login oder <router-link to="login" tag="a">Hier</router-link> gelangst du mit dem passwort "abcdefg" zur Verwaltung !!
  </div>
</template>

<script>
export default {
    name:"Hinwis",
}
</script>

<style scoped>
.border-b{
 border-bottom: white 3px solid;
}
</style>