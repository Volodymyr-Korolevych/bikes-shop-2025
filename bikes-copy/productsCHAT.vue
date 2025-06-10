<template>
  <v-container class="py-6">
    <h2 class="text-h5 text-center mb-8">{{ category.ua }}</h2>
    <v-row>
      <v-col cols="12" md="4" lg="3" v-for="(item, i) in products" :key="i">
        <ProductCard :product="item" />
      </v-col>
    </v-row>
    <div v-if="products.length === 0" class="text-center text-grey mt-10">Товари не знайдено</div>
  </v-container>
</template>

<script setup lang="ts">
const { category, getCategoryProducts } = useProducts()
const watchdog = ref(0)
watch(category, () => { watchdog.value++ }, { immediate: true })
const products = computed(() => getCategoryProducts(watchdog.value))
</script>