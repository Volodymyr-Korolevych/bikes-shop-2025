<script setup lang="ts">

const { cartStatus, getListItemsInCart, addItemToCart } = useCart()

const watch_cart = ref(0)
const itemsInCart = computed(() => getListItemsInCart(watch_cart.value))



const add_to_cart = (prod_id: string) => {
   console.log('add to cart', prod_id)
   
   addItemToCart(prod_id)
  
   watch_cart.value++
}

watch(() => cartStatus.value, () => {
   watch_cart.value++
}, { immediate: true })

const props = defineProps({
    product: {
        type: Object,
        required: true,
    }
});
const item = props.product as any as Product
</script>
<template>
            <nuxt-link :to="`/BikeProduct?bike=${item.index}`" style="text-decoration: none !important;">
               <v-card class="product-card ma-2 pt-4 d-flex flex-column justify-center align-center"
                  style="height: 46vh;background-color: aliceblue;">
                  <template v-slot:prepend>
                     <v-img :src="`/small_images/${item.index}.png`" height="auto" width="15vw" />
                  </template> 
                  <v-card-subtitle
                     style="font-size:.8rem; color:black; font-weight: 600;text-align: center;  white-space: initial !important;">
                     {{ item.title }}
                  </v-card-subtitle>
                  <v-card-actions>
                     <v-list-item class="d-flex">
                        <v-list-item-subtitle>
                           <span style="padding:5px;font-weight: 700;font-size: 20px;">
                              {{ item.price }}
                           </span>
                        </v-list-item-subtitle>

                        <template v-slot:append>
                           <div class="justify-self-end">
                              <v-icon class="me-1" icon="mdi-cart-outline" style="font-size: 40px;color:black;"
                                 :class="(itemsInCart.includes(item.index)) ? 'color-red' : ''"
                                 @click.stop.prevent="add_to_cart(item.index)">
                              </v-icon>
                           </div>
                        </template>
                     </v-list-item>
                  </v-card-actions>
               </v-card>
            </nuxt-link>
</template>
<style>

.product-card .v-card-item__prepend {
   padding-inline-end: 0 !important;
}
.product-card .v-list-item__append {
   width: 50px !important;
}

.product-card .v-card-subtitle {
   opacity: 1 !important;
}

.product-card .v-card-actions {
   width: 100%;
   padding: 0 !important;
}
.product-card .v-list-item__content {
   width: 200px;
   flex-shrink: 1;
}

.product-card .v-list-item-subtitle {
   height: 24px;
   margin: 7px;
   opacity: 1 !important;
}

.color-red {
   color: red !important;
}
</style>