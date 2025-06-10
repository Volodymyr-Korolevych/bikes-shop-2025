<template>
  <v-card class="product-card" elevation="1" rounded="xl">
    <div class="product-image-container">
      <v-img
        :src="`/small_images/${item.index}.png`"
        aspect-ratio="4/3"
        contain
        class="product-image"
        alt="Зображення товару"
      />
    </div>
    <v-card-item class="pa-4">
      <div class="text-section">
        <div class="product-title">{{ item.title }}</div>
        <div class="product-bottom">
          <div class="product-price">{{ item.price }} ₴</div>
          <v-btn icon @click.stop.prevent="add_to_cart(item.index)">
            <v-icon :color="itemsInCart.includes(item.index) ? 'deep-orange' : 'primary'">mdi-cart-plus</v-icon>
          </v-btn>
        </div>
      </div>
    </v-card-item>
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
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&display=swap');

.product-card {
  font-family: 'Manrope', sans-serif;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  min-height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}
.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
}
.product-image-container {
  padding: 12px;
  background-color: #f8f8f8;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}
.product-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #212121;
  line-height: 1.3;
}
.product-price {
  font-size: 1.1rem;
  font-weight: 500;
  color: #1976d2;
}
.text-section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.product-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>