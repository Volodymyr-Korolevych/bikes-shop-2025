<script setup lang="ts">
const { activeCart, activateCart, cartStatus, getCart } = useCart()
const router = useRouter()

const watch_cart = ref(0)
const cartItems = computed(() => getCart(watch_cart.value))

const drawer = ref(false)

watch(cartStatus, () => {
    watch_cart.value += 1
})
watch(() => activeCart.value, () => {
    console.log('Cart/activeCart watch', activeCart.value)
    drawer.value = activeCart.value
    watch_cart.value += 1
}, { immediate: true })

watch(drawer, () => {
    activateCart(drawer.value)
    if (!drawer.value) {
        watch_cart.value += 1
    }
}, { immediate: true })

</script>
<template>
    <v-navigation-drawer v-model="drawer" width="700" location="right" temporary style="margin-top: 0;">

        <v-sheet id="koschyk" style="width:100%;">
            <v-row justify="center" class="mx-0">
                <v-col cols="12" class="mx-6">
                    <v-card style="width:100%"> 
                        <v-card-title>Кошик</v-card-title>
                        <v-divider></v-divider>
                        <v-list id="cart-list" style="height: 40vh;overflow-y:auto;">
                            <cart-item v-for="item in cartItems" :key="item.index.toString() + watch_cart" :cartitem="item" :canEdit="true">

                            </cart-item>

                        </v-list>
                        <v-divider></v-divider>
                        <v-card-text>
                            <h3 class="text-right">Сума: {{ cartStatus.total }} ₴</h3>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn class="mt-2" stacked color="#2f2e2e" @click="$router.push('/orderform')">
                                Завершити замовлення
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-sheet>
    </v-navigation-drawer>
</template>
<style>

</style>

