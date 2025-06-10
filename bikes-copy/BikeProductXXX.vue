<script setup lang="ts">
definePageMeta({
  title: 'BikeProduct'
})

const { addItemToCart } = useCart()
const emitter = useEmitter()

const add_to_cart = (prod_id: string) => {
   console.log('add to cart', prod_id)
   addItemToCart(prod_id)
   emitter.emit("CART" as any);
}

const { ProdGetItem } = useProducts()
const route = useRoute()

const bike = ref('')  
bike.value = route.query.bike as string
console.log("product/setup", bike.value)

const item   = computed(() => ProdGetItem(Number(bike.value)))  

watch(() => route.query.bike,
  async newY => { bike.value = newY as string }, { immediate: true })
</script>

<template>
  <v-container>
    <v-row v-if="item"  style="align-items: center;">
       <v-col cols="6" class="my-15">
        <v-img :src="`/big_images/${bike}.png`" cover style="width:100%" />
     </v-col> 
      <v-col cols="5" offset="1">
        <h3 class="text-h6 mb-6" style="font-weight:400;letter-spacing:1px !important;line-height: 1.5rem !important;
text-align:left;">
          {{ item.title }}
        </h3>
        <h5 v-if="item.sale && item.sale > 0">
        Акційна ціна {{ item.sale }} грн <span style="color:red;"><span style="text-decoration: line-through;">{{ item.price }}</span></span>  </h5>
        <h5 v-else>
          {{ item.price }}
        </h5>
        <br>&nbsp;
        <button class="favorite styled" type="button" @click="add_to_cart(item.index)">В кошик</button>

        <br>&nbsp;
      </v-col>
    </v-row>
    <v-row v-if="item" style="padding-bottom: 40px;margin-left: 3px;   margin-bottom: 40px; background-color: #f1f1f1;">
      <v-col cols="6" class="pa-6">
        <div id="descryption" v-dompurify-html="item.description"></div>
      </v-col>
      <v-col cols="5" class="pa-6">
        <!--characteristics items-->
        <div class="mt-8" id="detail_table">
          <table>
            <tr
              class="table_value"
              v-for="(it, index) in item.features"
              :key="index"
            >
              <td><h5>{{ it.th }}</h5></td>
              <td class="text-body-2 ml-8">{{ it.td }}</td>
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
.favorite.styled {
  border: 0;
  line-height: 2.5;
  padding: 0 20px;
  font-size: 1rem;
  text-align: center;
  color: #fff;
  text-shadow: 1px 1px 1px #000;
  border-radius: 10px;
  background-color: #228b22;
  background-image: linear-gradient(to top left,
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.2) 30%,
      rgba(0, 0, 0, 0));
  box-shadow:
    inset 2px 2px 3px rgba(255, 255, 255, 0.6),
    inset -2px -2px 3px rgba(0, 0, 0, 0.6);
}

.favorite.styled:hover {
  background-color: black;
}

.favorite.styled:active {
  box-shadow:
    inset -2px -2px 3px rgba(255, 255, 255, 0.6),
    inset 2px 2px 3px rgba(0, 0, 0, 0.6);
}
</style>
