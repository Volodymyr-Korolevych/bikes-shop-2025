<script setup lang="ts">
const router = useRouter() 

const watch_cart = ref(0)
const snackbar = ref(false)
const { emptyCart, cartStatus,  getCart } = useCart()

const cartItems = computed(() => getCart(watch_cart.value))


const valid = ref(false)
const phone = ref('')
const name = ref('')
const email = ref('')


type res = string | null


const nameRules = [
    (v: res) => !!v || "Поле є обов'язковим",
    (v: res) => (v && v.length <= 12) || 'Довжина не маж перевищувати 10 символів',
]
const emailRules = [
    (v: res) => !!v || "Надання електронної адреси є обов'язковим",
    (v: res) => v && ((/.+@.+\..+/.test(v))) || 'Помилка в електронній адресі',
]
const phoneRules = [
    (v: res) => !!v || "Надання телефонного номера є обов'язковим",
    (v: res) => v && ((/^(?:\+38)?(?:\([0-9]{3}\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|[0-9]{3}[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|[0-9]{3}[0-9]{7})$/.test(v))) || 'Помилка в телефонному номері',
]

watch(snackbar, async () => {
    console.log('snackbar closed', snackbar.value)
    if (!snackbar.value) {
        emptyCart()
        await router.push('/')  
    }
})

</script>

<template>
    <v-sheet>
        <v-row justify="space-around">
            <v-col cols="12">
                <h1 class="text-center"> Завершіть замовлення </h1>
                <v-form v-model="valid" fast-fail @submit.prevent ref="form">
                    <v-container>
                        <v-row>
                            <v-col cols="4" offset="1">
                                <h4 class="text-center mt-4">Ваші контактні дані</h4>
                                <v-text-field rounded="lg" v-model="name" :counter="20" :rules="nameRules"
                                    label="Ім'я та прізвище" required></v-text-field>

                                <v-text-field rounded="lg" v-model="email" :rules="emailRules" label="Електронна адреса"
                                    required placeholder="my.mail@gmail.com">
                                </v-text-field>

                                <v-text-field rounded="lg" v-model="phone" :rules="phoneRules" label="Номер телефону"
                                    required prefix="+38" placeholder="(067)1234567">
                                </v-text-field>

                                <button class="favorite styled" type="button" @click="snackbar = true">Завершити
                                </button>
                            </v-col>

                            <v-col cols="6" class="text-center">
                                <h4 class="text-center mt-4">У кошику</h4>
                                    <h4 class="py-3"  >

                                        {{ cartStatus.count }} товар(и)
                                        <br>
                                        на суму {{ cartStatus.total }} грн
                                    </h4>
                                        <v-list id="cart-list" style="height: 40vh;overflow-y:auto;width:90%">
                                            <cart-item v-for="item in cartItems" :key="item.index.toString() + watch_cart" :cartitem="item" :canEdit="false">

                                            </cart-item>

                                        </v-list>



 
                                    <v-dialog v-model="snackbar" width="auto">
                                        <v-row style="width:50vw;background-color:#228b22;color:white;">
                                            <v-col cols="12" class="d-flex flex-column justify-center align-center"
                                                style="height: 36vh;border:1px black solid;border-radius: 10px;">
                                                <div class="text-h4 my-8">Дякуємо за замовлення!</div>

                                                <p class="text-h8 mb-8">Наш менеджер Вам зателефонує</p>
                                                <v-btn class="btn" @click="snackbar = false">Закрити</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-dialog>
                            </v-col>
                        </v-row>

                    </v-container>
                </v-form>
            </v-col>
        </v-row>



    </v-sheet>
</template>
<style scoped lang="scss">

</style>
