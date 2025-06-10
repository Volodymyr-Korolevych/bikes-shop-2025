<script setup lang="ts">


import { toRaw } from 'vue';
const router = useRouter()
const { setFilter } = useProducts()
const items = ['Всі', 'Гірські', 'Міські', 'Складані', 'Туристичні', 'Підліткові', 'Жіночі']
const accessories = ['Велосипедні фляги', 'Крила', "Велокомп'ютери", 'Інструменти', 'Велокріплення на авто', 'Комплекти світла']; // Dropdown items

//
const { cartStatus, activateCart } = useCart() // reactive cart status

// 
const tab = ref(-1)
const counter = ref(0)
const dropdownOpen = ref(false); // Track dropdown state

const _click = () => {
  console.log('AppHeader tab click')
  setFilter("tab", tab.value)
  router.push({ path: "/products", replace: true })
}
const acc_click = (index: number) => {
  console.log('AppHeader accessories tab click')
  setFilter("acc", index)
  router.push({ path: "/products", replace: true })
}

</script>
<template>
  <v-app-bar>
    <v-app-bar-title class="ml-15" style="color:black;letter-spacing: 8px;">Магазин велосипедів</v-app-bar-title>


    <div class="minicart" @click.stop="activateCart(true)" style="width:130px;">
      <div class="cart-block" style="cursor: pointer;caret-color: transparent !important;">
        <v-icon class="cart-icon" size="24" color="black">mdi-cart-plus</v-icon>
        <span v-if="cartStatus.count > 0" class="label_count ">{{ cartStatus.count }}</span>
        <span class="total-price">
          <span class="cart-text">Кошик </span>
          <span class="cart-text">{{ cartStatus.total }} грн</span>
        </span>
      </div>

    </div>


    <template v-slot:extension>
      <v-tabs id="tabs_age" v-model="tab" align-tabs="title">
        <v-tab v-for="(item, i) in items" :key="i" :text="item" :value="i" @click="_click"></v-tab>

        <!-- Accessories Dropdown -->
        <v-menu v-model="dropdownOpen" close-on-content-click>
          <template v-slot:activator="{ props }">
            <v-tab text="АКСЕСУАРИ" v-bind="props"></v-tab>
          </template>
          <v-list>
            <v-list-item title="Асортимент аксесуарів">
              <template v-slot:prepend>
                <v-avatar image="/favicon.ico" rounded="0">
                </v-avatar>
              </template>


            </v-list-item>
          </v-list>
          <v-list density="compact" nav>
            <v-list-item v-for="(accessory, index) in accessories" :key="index">
              <v-list-item-title style="cursor:pointer;" @click="acc_click(index)">{{ accessory }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

      </v-tabs>
      <app-search class="mr-2" />
    </template>
  </v-app-bar>
</template>


<style>
.v-toolbar__extension {
  justify-content: flex-end;
}
#tabs_age {
flex-grow: 1;
}
.v-slide-group__content {
  justify-content: space-around;
}

#tabs_age label.v-label.v-field-label {
  font-size: 12px;
  letter-spacing: 1px;
}

#tabs_age .v-select__selection {
  font-size: 10px;
}

.v-btn__content {
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: 500;
}

.cart-text {
  text-decoration: none;
  font-size: 10px;
  margin-left: 20px;
}

.cart-block {
  display: flex;
  position: relative;
}

.total-price {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  gap: 5px;
  font-size: 13px;
  line-height: 1;
}

.label_count {
  position: absolute;
  left: 22px;
  top: -8px;
  background: #228b22;
  color: white;
  border-radius: 17px;
  line-height: 18px;
  width: 18px;
  font-size: 11px;
  text-align: center;
  display: block;
}
</style>