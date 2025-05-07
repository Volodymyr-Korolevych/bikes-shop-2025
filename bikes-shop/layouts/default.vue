<template>
  <v-app>

    <app-header />
    <v-main>
<!--       <v-row>
        <v-col cols="1"> -->
          <navigation-drawer />
          <cart />
<!--         </v-col>
        <v-col cols="10"> -->
          <NuxtPage />
<!--         </v-col>
      </v-row> -->
    </v-main>

  </v-app>
</template>
<style lang="scss">
html, body {
  font-family: 'Gotham Pro';
  font-size: 18px;
  background: #fbfafa;
}
.theme--light.v-application {
  min-height: 100vh;
}
.v-application--wrap {
  background: #f3eeea;
}
.v-main__wrap {
  padding: 100px 0 2.5rem;
}
.container {
  max-width: 88% !important;
}
</style>
