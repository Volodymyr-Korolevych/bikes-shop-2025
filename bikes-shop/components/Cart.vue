<script setup lang="ts">
const { activeCart, activateCart, cartStatus, getCart, removeItemFromCart, updateQuantityInCart } = useCart()
const router = useRouter()

const watch_cart = ref(0)
const cartItems = computed(() => getCart(watch_cart.value))
const total = computed(() =>
    cartItems.value.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0))     
const updateQuantity = (id : string, delta : number) => {
    updateQuantityInCart(id, delta)
    watch_cart.value++
    }
const removeItem = (id: string) => {
    removeItemFromCart(id)
    watch_cart.value++
}
const jump = async (id: string) => {
    await router.push({ path: "/product", query: { id }, replace: true })
}

const drawer = ref(false)

watch(() => activeCart.value, () => {
    drawer.value = activeCart.value
    watch_cart.value += 1
})
watch(drawer, () => {
    activateCart(drawer.value)
    if (!drawer.value) {
        watch_cart.value += 1
    }
}, { immediate: true })

</script>
<template>
    <v-navigation-drawer v-model="drawer" width="700" location="right" temporary style="margin-top: 150px;">

        <v-sheet id="koschyk" style="width:100%;">
            <v-row justify="center" class="mx-0">
                <v-col cols="12" class="mx-6">
                    <v-card style="width:100%">
                        <v-card-title>Ваш кошик</v-card-title>
                        <v-divider></v-divider>
                        <v-list id="cart-list" style="height: 40vh;overflow-y:auto;">
                            <v-list-item v-for="item in cartItems" :key="item.id" style="width:100%;" class="ml-5 d-grid justify-space-between">
                                <template v-slot:prepend>
                                    <v-img :src="`/small_images/${item.id}.png`" height="8vh" width="50px"
                                        style="flex-shrink: 1;" @click="jump(item.id)" />
                                </template>

                                <v-list-item-title
                                    style="flex-grow:1;word-wrap: break-word;font-size: 14px;text-wrap: balance;min-width:300px;"
                                    @click="jump(item.id)">{{ item.name }}</v-list-item-title>
                                <v-list-item-subtitle>{{ item.price }} ₴</v-list-item-subtitle>
                                <template v-slot:append>
                                    <v-btn icon height=30 width=30 @click="updateQuantity(item.id, -1)" variant="tonal"
                                        class="p-0">-</v-btn>
                                    <span class="m  x-3">{{ item.quantity }}</span>
                                    <v-btn icon height=30 width=30 @click="updateQuantity(item.id, 1)"
                                        variant="tonal">+</v-btn>
                                    <v-btn icon variant="tonal" height=30 width=30 class="ml-3" color="grey"
                                        @click="removeItem(item.id)">
                                        <v-icon size="x-small">mdi-delete</v-icon>
                                    </v-btn>
                                    <span class="mx-3" style="font-size: 14px;width:70px;">{{ item.price * item.quantity }} ₴
                                    </span>
                                </template>
                            </v-list-item>
                        </v-list>
                        <v-divider></v-divider>
                        <v-card-text>
                            <h3 class="text-right">Сума: {{ total }} ₴</h3>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn class="mt-2" stacked color="#2f2e2e" @click="$router.push('/')">
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
#cart-list .v-list-item {
    grid-template-columns: 60px 1fr 230px !important;
}
.v-list-item__append {
    justify-content: space-evenly;
    width: 220px;
}
</style>

