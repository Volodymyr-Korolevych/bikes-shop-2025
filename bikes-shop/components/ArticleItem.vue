<script setup lang="ts">
defineProps({
  item: {
    type: Object,
    required: true
  },
  tag: {
    type: String,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
});
const colors = ref(['#cac9ce', '#848690', '#e4cfb3', '#edebe9', '#b4b4a7', '#ab9685']);
</script>

<template>
  <v-card class="mt-3 rounded-xl" rounded :to=item._path style="" :style="{ background: colors[index % 6] }">
    <v-img :src="item.photo"></v-img>
  </v-card>
</template>

<style lang="scss">
a {
  text-decoration: none;

  .v-card-text,
  .v-card-title {
    color: #000;
    line-height: 20px;
    word-break: keep-all;
    white-space: wrap !important;
    margin: 10px;
    min-height: 75px;
  }

  .v-card-subtitle {
    margin-left: 10px;
  }

  .v-card-actions {
    margin-left: 10px;
  }
}

.v-image__image {
  height: 80%;
}
</style>
