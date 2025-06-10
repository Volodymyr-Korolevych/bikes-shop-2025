<template>
  <v-card class="product-card" elevation="1" rounded="xl">
    <v-img :src="`/small_images/${item.index}.png`" height="200" class="product-image" cover></v-img>
    <v-card-item class="pa-4">
      <div class="title-area">
        <h3 class="product-title">{{ item.title }}</h3>
        <div class="product-price">{{ item.price }} ₴</div>
      </div>
    </v-card-item>
    <v-divider></v-divider>
    <v-card-actions class="pa-4 justify-end">
      <v-btn icon variant="outlined" @click.stop.prevent="add_to_cart(item.index)">
        <v-icon :color="itemsInCart.includes(item.index) ? 'deep-orange' : 'primary'">mdi-cart-plus</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
const { cartStatus, getListItemsInCart, addItemToCart } = useCart()
const itemsInCart = computed(() => getListItemsInCart(0))
const props = defineProps({ product: Object })
const item = props.product as Product

const add_to_cart = (id: string) => addItemToCart(id)
</script>

<style scoped>
.product-card {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}
.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
}
.product-image {
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}
.title-area {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.product-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: #212121;
  line-height: 1.3;
}
.product-price {
  font-size: 1.1rem;
  font-weight: 500;
  color: #1976d2;
}
</style>    