<template>
    <div class="cart-item">
        <h3>{{ item.name }}</h3>
        <p>{{ item.price }} ₴</p>
        <div class="quantity">
            <button @click="updateQuantity(-1)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="updateQuantity(1)">+</button>
        </div>
        <button class="remove" @click="$emit('remove-item', item.id)">Видалити</button>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    methods: {
        updateQuantity(delta) {
            if (this.item.quantity + delta > 0) {
                this.$emit('update-quantity', { id: this.item.id, delta });
            }
        }
    }
};
</script>

<style scoped>
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
</style>