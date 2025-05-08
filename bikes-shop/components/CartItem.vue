<script setup lang="ts">

const router = useRouter()
const { cartStatus, activateCart, updateQuantityInCart, getListItemsInCart, removeItemFromCart, addItemToCart } = useCart()
const watch_cart = ref(0)



const props = defineProps({
    cartitem: {
        type: Object,
        required: true,
    },
    canEdit: {
        type: Boolean,
        default: true,
    },
});
const item = props.cartitem as any as CartItem

watch(() => cartStatus.value, () => {
   watch_cart.value++
}, { immediate: true })

    
const updateQuantity = (id : string, delta : number) => {
    updateQuantityInCart(id, delta)
    watch_cart.value++
    }
const removeItem = (id: string) => {
    removeItemFromCart(id)
    watch_cart.value++
}
const jump = async (bike: string) => {
    console.log('jump to bike', bike)
    if (!props.canEdit) return
    activateCart(false)
    await router.push({ path: "/BikeProduct", query: { bike }, replace: true })
}

</script>



<template>
    <v-list-item style="width:90%;" class="ml-5 d-grid justify-space-between"
    :class="props.canEdit ? 'long-line' : 'short-line'"
    >
        <template v-slot:prepend>
            <v-img :src="`/small_images/${item.index}.png`" height="8vh" width="50px"
                style="flex-shrink: 1;" :class="{pointer : props.canEdit}" @click="jump(item.index)" />
        </template>

        <v-list-item-title
            style="flex-grow:1;word-wrap: break-word;font-size: 14px;text-wrap: balance;min-width:300px;margin-left:15px;"
            :class="{pointer : props.canEdit}"
            @click="jump(item.index)">{{ item.name }}</v-list-item-title>
        <template v-slot:append>
            <v-btn v-if="props.canEdit"  icon height=30 width=30 @click="updateQuantity(item.index, -1)" variant="tonal"
                class="p-0">-</v-btn>
            <span class="m  x-3">{{ item.quantity }}</span>
            <v-btn v-if="props.canEdit" icon height=30 width=30 @click="updateQuantity(item.index, 1)"
                variant="tonal">+</v-btn>
            <v-btn v-if="props.canEdit" icon variant="tonal" height=30 width=30 class="ml-3" color="grey"
                @click="removeItem(item.index)">
                <v-icon size="x-small">mdi-delete</v-icon>
            </v-btn>
            <span class="mx-3" style="font-size: 14px;width:70px;">{{ item.price * item.quantity }} ₴
            </span>
        </template>
    </v-list-item>
</template>

<style scoped>
#cart-list .long-line {
    grid-template-columns: 45px 1fr 230px !important;
}
#cart-list .short-line {
    grid-template-columns: 45px 1fr 100px !important;
}
.v-list-item__append {
    justify-content: space-evenly;
    width: 220px;
}
.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;
}

.quantity button {
    margin: 0 5px;
}

.remove {
    color: red;
    cursor: pointer;
}
.pointer {
    cursor: pointer;
}
</style>