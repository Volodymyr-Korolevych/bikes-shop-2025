<template>
    <v-container class="text-center pa-0" fluid>
        <!-- Банер на весь екран -->
        <div class="hero-banner d-flex flex-column justify-center align-center">
            <div class="hero-overlay">
                <h1 class="text-white text-4xl font-bold mb-2">Веломагазин</h1>
                <p class="text-white mb-6">Все для подорожей, спорту й щоденних поїздок</p>
                <v-btn color="white" variant="outlined" @click="$router.push('/products')">
                    Перейти до каталогу
                </v-btn>
            </div>
        </div>

        <!-- Рекомендовані товари -->
        <div class="py-12">
            <h2 class="text-xl font-medium mb-6">Рекомендовані товари</h2>
            <v-row justify="center">
                <v-col cols="12" sm="6" md="4" lg="3" v-for="(item, i) in recommended" :key="i">
                    <product-card :product="item" />
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script setup lang="ts">
const { getCategoryProducts } = useProducts()
const recommended = getCategoryProducts(1).slice(0, 4) // перші 4 товари
</script>

<style scoped>
.hero-banner {
    background-image: url('/banner.jpg');
    background-size: cover;
    background-position: center;
    height: 90vh;
    position: relative;
}

.hero-overlay {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
  
