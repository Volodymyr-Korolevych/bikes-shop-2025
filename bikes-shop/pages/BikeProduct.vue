<template>
  <v-container class="py-10">
    <v-row>
      <v-col cols="12" md="6">
        <v-img :src="`/big_images/${bike}.png`" height="400" cover class="rounded" />
      </v-col>
      <v-col cols="12" md="6">
        <h2 class="text-h5 font-weight-medium mb-4">{{ item.title }}</h2>
        <h3 class="text-h6 mb-3" v-if="item.sale">
          {{ item.sale }} грн
          <span class="text-grey text-decoration-line-through">{{ item.price }}</span>
        </h3>
        <h3 class="text-h6 mb-3" v-else>{{ item.price }} грн</h3>
        <v-btn color="primary" size="large" @click="add_to_cart(item.index)">Додати в кошик</v-btn>
      </v-col>
    </v-row>
    <v-row class="mt-8">
      <v-col cols="12" md="6">
        <div v-dompurify-html="item.description"></div>
      </v-col>
      <v-col cols="12" md="6">
        <v-table>
          <tbody>
            <tr v-for="(feature, index) in item.features" :key="index">
              <td class="font-weight-medium">{{ feature.th }}</td>
              <td>{{ feature.td }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const { addItemToCart } = useCart()
const { ProdGetItem } = useProducts()
const route = useRoute()
const bike = ref(route.query.bike as string)
const item = computed(() => ProdGetItem(Number(bike.value)))

const add_to_cart = (id: string) => addItemToCart(id)
</script>