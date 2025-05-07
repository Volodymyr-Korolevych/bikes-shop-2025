<script setup lang="ts">

const { category, getCategoryProducts } = useProducts()


const watchdog = ref(0)
watch(category, () => { watchdog.value++ }, { immediate: true })

const products = computed(() => getCategoryProducts(watchdog.value))

</script>
<template>
   <v-sheet id="s_page">
      <v-row>

         <v-col cols="12" class="mt-6">
            <h1 style="text-align: center; color:black;font-size: 28px;font-weight: 400;letter-spacing:1px;">
               {{ category.ua }}
            </h1>
         </v-col>
      </v-row>
      <v-row v-if="products.length == 0"  class="mx-16">
         <v-col cols="12">
            <h1 style="text-align: center; color: #e1ac00;font-weight:400;letter-spacing:3px;">
               Результатів немає
            </h1>
         </v-col>
      </v-row>
      <v-row v-else  class="mx-16">   
         <v-col cols="3" v-for="(item, i) in products" :key="i">
            <product-card :product="item" :key="watchdog" />
         </v-col>
      </v-row>
   </v-sheet>
</template>
<style>

#s_page li a {
   font-size: 14px;
   text-decoration: none;
   font-weight: 600;
}

#s_page a,
#s_page a:visited {
   color: inherit;
}

#s_page a:hover,
#s_page a:active {
   color: #e1ac00;
}

#s_page ul {
   list-style-type: none;
}

#s_page li {
   line-height: 14px;
   padding: 8px;
}
</style>
