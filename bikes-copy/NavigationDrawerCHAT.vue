<template>
  <v-navigation-drawer permanent expand-on-hover rail width="260">
    <v-list>
      <v-list-item title="Категорії товарів" class="text-uppercase text-grey"></v-list-item>
      <v-list-item v-for="(cat, i) in categories" :key="i" @click="selectCategory(i + 1)" :title="cat.ua">
        <template #prepend>
          <v-icon size="small" color="primary">mdi-chevron-right</v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const { setFilter, getCategoriesList } = useProducts()
const categories = getCategoriesList()
const router = useRouter()
const selectCategory = async (i: number) => {
  setFilter("tab", i)
  await router.push({ path: "/products", replace: true })
}
</script>