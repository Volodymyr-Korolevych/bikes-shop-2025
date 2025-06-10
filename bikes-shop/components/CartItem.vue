<template>
  <v-list-item>
    <v-img :src="`/small_images/${item.index}.png`" height="60" width="60" class="rounded mr-3" @click="jump(item.index)" />
    <v-list-item-content>
      <v-list-item-title class="text-subtitle-2">{{ item.name }}</v-list-item-title>
      <v-list-item-subtitle class="text-caption">Ціна: {{ item.price }} ₴</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action v-if="canEdit">
      <v-btn icon @click="updateQuantity(item.index, -1)"><v-icon>mdi-minus</v-icon></v-btn>
      <span class="mx-2">{{ item.quantity }}</span>
      <v-btn icon @click="updateQuantity(item.index, 1)"><v-icon>mdi-plus</v-icon></v-btn>
      <v-btn icon @click="removeItem(item.index)"><v-icon color="red">mdi-delete</v-icon></v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script setup lang="ts">
const props = defineProps({ cartitem: Object, canEdit: Boolean })
const item = props.cartitem as CartItem
const { cartStatus, activateCart, updateQuantityInCart, removeItemFromCart } = useCart()
const router = useRouter()

const updateQuantity = (id: string, delta: number) => updateQuantityInCart(id, delta)
const removeItem = (id: string) => removeItemFromCart(id)
const jump = (bike: string) => {
  if (!props.canEdit) return
  activateCart(false)
  router.push({ path: "/BikeProduct", query: { bike }, replace: true })
}
</script>