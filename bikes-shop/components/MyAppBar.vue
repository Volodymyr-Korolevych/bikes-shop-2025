<script setup lang="ts">
import { toRaw } from 'vue';
const router = useRouter()
const { setFilter } = useProducts()
const items = ['Всі',  'Гірські', 'Міські', 'Складані', 'Туристичні', 'Підліткові', 'Жіночі']
const accessories = ['Велосипедні фляги', 'Крила', "Велокомп'ютери", 'Інструменти', 'Велокріплення на авто', 'Комплекти світла']; // Dropdown items

const tab = ref(-1)
const counter = ref(0)
const dropdownOpen = ref(false); // Track dropdown state

const _click = () => {
  console.log('AppBar/click')
  router.push({ path: "/products",  query: { id: 'filter'+(counter.value++) }, replace: true })}

watch(tab as any, (t) => {
  console.log('AppBar/tab', t)
  setFilter("who", t)
  router.push({ path: "/products",  query: { id: 'filter'+(counter.value++) }, replace: true })
})


</script>
<template>
  <v-app-bar>
    <template v-slot:image>
      <v-img gradient="to top right, #fbf3bf, #fbf3bf"></v-img>
    </template>

    <v-app-bar-title class="ml-15" style="color:black;letter-spacing: 8px;">Магазин велосипедів</v-app-bar-title>

    <template v-slot:extension>
      <v-tabs  id="tabs_age"  v-model="tab" align-tabs="title" >
        <v-tab v-for="(item, i) in items" :key="i" :text="item" :value="i" @click="_click"></v-tab>

        <!-- Accessories Dropdown -->
        <v-menu v-model="dropdownOpen" close-on-content-click>
          <template v-slot:activator="{ props }">
            <v-tab text="АКСЕСУАРИ" v-bind="props"></v-tab>
          </template>
          <v-list>
            <v-list-item 
            title="Асортимент аксесуарів">
            <template v-slot:prepend>
                     <v-avatar 
                       image="/favicon.ico"
                       rounded="0"
                    >
                    </v-avatar>
                    </template>
        
        
        </v-list-item>
        </v-list>
          <v-list density="compact" nav>
            <v-list-item v-for="(accessory, index) in accessories" :key="index" @click="handleDropdownClick(accessory)">
              <v-list-item-title>{{ accessory }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-tab text="АКЦІЇ" @click="_click"></v-tab>
      </v-tabs>
      <app-search />
    </template>
  </v-app-bar>
</template>


<style>
.v-toolbar__extension {
  justify-content: space-between;
}

#tabs_age label.v-label.v-field-label {
   font-size: 12px;
   letter-spacing: 1px;
  }
#tabs_age  .v-select__selection {
  font-size: 10px;
}
.v-btn__content {
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: 500;
}

</style>