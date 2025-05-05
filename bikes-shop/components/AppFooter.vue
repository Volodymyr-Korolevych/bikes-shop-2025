<template>
  <footer>
    <v-row>
      <v-col cols="4" style="text-align: center;">
        Дипломна робота
      </v-col>
      <v-col cols="4" style="text-align: center;">
        <p style="margin: 0;">Виконав студент</p>
        <p style="margin: 0;">XXXXXXXXXXXX</p>
      </v-col>
      <v-col cols="4" style="text-align: center;">
         <p style="margin: 0;">З пропозиціями звертайтесь</p>
         <p style="margin: 0;">student@gmail.com</p>
      </v-col>
    </v-row>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>
<style>
footer {
  flex-shrink: 0;
  color:#000;
  font-size: 14px;
  line-height: 14px;
  width: 100%;
  z-index: 1;
}
</style>
