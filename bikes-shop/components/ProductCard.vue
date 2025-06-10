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
  <v-card class="product-card" elevation="1" rounded="xl">
    <div class="product-image-container">
      <v-img
        :src="`/big_images/${item.index}.png`"
        height="200"
        contain
        class="product-image"
        alt="Зображення товару"
      />
    </div>
    <v-card-item class="pa-3 d-flex flex-column justify-space-between flex-grow-1">
      <div class="product-title">{{ item.title }}</div>
      <div class="product-bottom mt-auto mx-4">
        <div class="product-price">{{ item.price }}</div>
        <v-btn icon @click.stop.prevent="add_to_cart(item.index)">
          <v-icon :color="itemsInCart.includes(item.index) ? 'deep-orange' : 'primary'">mdi-cart-plus</v-icon>
        </v-btn>
      </div>
    </v-card-item>
  </v-card>
  </nuxt-link>
</template>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&display=swap');

.product-card {
  font-family: 'Manrope', sans-serif;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  padding: 0;
}
.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
}
.product-image-container {
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  padding: 8px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}
.product-title {
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 12px;
  color: #212121;
  line-height: 1.3;
  min-height: 38px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.product-price {
  font-size: 1.05rem;
  font-weight: 600;
  color: black;
}
.product-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>