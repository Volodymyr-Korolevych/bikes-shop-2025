<script setup lang="ts">
const route = useRoute()
const { getCategory, getCategoryProducts, getSelectedTitle } = useProducts()

const id = ref('')
id.value = route.query.id as string
const subId = ref('')
subId.value = route.query.subcat as string

watch(() => route.query.id,
   async newId => { id.value = newId as string }, { immediate: true })
watch(() => route.query.subcat,
   async newId => { subId.value = newId as string }, { immediate: true })

const category = computed(() => getCategory(id.value))
const products = computed(() => getCategoryProducts(id.value, subId.value))
const subTitle = computed(() => getSelectedTitle(id.value, subId.value))

</script>
<template>
   <v-sheet id="s_page">
      <v-row>
         <v-col cols="12" class="mt-6">
            <h1 style="text-align: center; color:black;font-size: 28px;font-weight: 400;letter-spacing:1px;">
               {{ subTitle }}
            </h1>
         </v-col>
      </v-row>
      <v-row v-if="subId == undefined" class="mx-16">
         <v-col cols="3" v-for="(s, i) in category.subcats" :key="i">
            <nuxt-link :to="`/products?id=${category.category}&subcat=${i+1}`" style="text-decoration: none !important;">
               <v-card class="ma-6">
                  <template v-slot:prepend>
                     <v-avatar 
                       :image="`/images/categories/img_${category.category}_${i+1}.webp`"
                       style="width: 13vw;height: auto;"
                       rounded="1"
                    >
                    </v-avatar>
                  </template>
                  <v-card-subtitle style="font-weight: 400;text-align: center;  white-space: initial !important;">
                     {{ s }}
                  </v-card-subtitle>
               </v-card>
            </nuxt-link>
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
            <nuxt-link :to="`/itemProd?toy=${item.code}`" style="text-decoration: none !important;">
               <v-card class="ma-6">
                  <template v-slot:prepend>
                     <v-avatar 
                       :image="`/images/products/${item.code}_0.webp`"
                       style="width: 13vw; height: auto;"
                       rounded="1"
                    >
                    </v-avatar>
                  </template>
                  <v-card-subtitle style="font-weight: 400;text-align: center;  white-space: initial !important;">
                     {{ item.title }}
                  </v-card-subtitle>
               </v-card>
            </nuxt-link>
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
