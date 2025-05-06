<script setup lang="ts">
definePageMeta({
  title: 'BikeProdukt'
})
const { ProdGetItem, ProdGetDetails } = useProducts()
const route = useRoute()

const bike = ref('')
//id.value = route.query.id as string
console.log("product/setup", bike.value)

const item   = computed(() => ProdGetItem(bike.value))
const details = computed(() => ProdGetDetails(bike.value))

watch(() => route.query.bike,
  async newY => { bike.value = newY as string }, { immediate: true })
</script>

<template>
  <v-container>
    <v-row style="align-items: center;">
       <v-col cols="4">
        <v-carousel show-arrows="hover" hide-delimiters height="300">
          <v-carousel-item v-for="(im, i) in details.images" :key="i" :src="`/images/products/${im}`" cover style="width:70%" />
        </v-carousel>

     </v-col> 
      <v-col cols="5" offset="2">
        <h3 class="text-h6 mb-6" style="font-weight:400;letter-spacing:1px !important;line-height: 1.5rem !important;
text-align:left;">
          {{ item.title }}
        </h3>
        <h5 v-if="item.sale > 0">
        Акційна ціна {{ item.sale }} грн <span style="color:red;"><strike>{{ item.price }}</strike></span>  </h5>
        <h5 v-else>
          {{ item.price }}
        </h5>
        <br>&nbsp;
        <br>&nbsp;
      </v-col>
    </v-row>
    <v-row  style="padding-bottom: 40px;margin-left: 3px;   margin-bottom: 40px; background-color: #f1f1f1;">
      <v-col cols="6" class="pa-6">
        <div id="descryption" v-dompurify-html="item.description"></div>
      </v-col>
      <v-col cols="6" class="pa-6">
        <!--characteristics items-->
        <div class="mt-8" id="detail_table">
          <table>
            <tr
              class="table_value"
              v-for="(it, index) in details.specs"
              :key="index"
            >
              <td><h5>{{ it[0] }}</h5></td>
              <td class="text-body-2 ml-8">{{ it[1] }}</td>
            </tr>
          </table>
        </div>
        </v-col>


    </v-row>
  </v-container>
</template>
<style>
#descryption h4 {
  font-size: 1rem;
    font-weight: 400;
    margin-bottom: 10px;
}
#descryption p, #descryption ul li {
  font-size: 0.8rem;

}
</style>
