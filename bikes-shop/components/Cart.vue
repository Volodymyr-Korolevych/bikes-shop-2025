<template>
  <v-navigation-drawer v-model="drawer" width="420" location="right" temporary>
    <v-container>
      <v-card flat>
        <v-card-title class="text-h6 font-weight-medium">Кошик</v-card-title>
        <v-divider></v-divider>
        <v-list lines="two" class="py-2" style="max-height: 60vh; overflow-y: auto;">
          <CartItem v-for="item in cartItems" :key="item.index + watch_cart" :cartitem="item" :canEdit="true" />
        </v-list>
        <v-divider></v-divider>
        <v-card-text class="text-right">Сума: {{ cartStatus.total }} ₴</v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="primary" @click="$router.push('/orderform')">Завершити замовлення</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const { activeCart, activateCart, cartStatus, getCart } = useCart()
const router = useRouter()
const drawer = ref(false)
const watch_cart = ref(0)
const cartItems = computed(() => getCart(watch_cart.value))

watch(cartStatus, () => watch_cart.value++)
watch(() => activeCart.value, (val) => { drawer.value = val; watch_cart.value++ }, { immediate: true })
watch(drawer, (val) => { activateCart(val); if (!val) watch_cart.value++ }, { immediate: true })
</script>