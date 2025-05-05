<script setup lang="ts">
import { toRaw } from 'vue';
const router = useRouter()
const { setFilter } = useProducts()
const items = ['Для всіх',  'Малюки', 'Дівчата', 'Хлопчики']
const ages = ['0+','3міс+','6міс+','12міс+','18міс+','2+','3+','4+','5+','6+','7+','8+','9+','10+','11+','12+','13+','14+']
const tab = ref(-1)
const ages2 = ref([])
const counter = ref(0)
const _click = () => {
  console.log('AppBar/click')
  router.push({ path: "/products",  query: { id: 'filter'+(counter.value++) }, replace: true })}

watch(tab as any, (t) => {
  console.log('AppBar/tab', t)
  setFilter("who", t)
  router.push({ path: "/products",  query: { id: 'filter'+(counter.value++) }, replace: true })
})
watch(ages2 as any, (a) => { 
  setFilter("ages", toRaw(ages2.value))
  router.push({ path: "/products",  query: { id: 'filter'+(counter.value++) }, replace: true })
  console.log('AppBar/ages', toRaw(ages2.value))
})


</script>
<template>
  <v-app-bar>
    <template v-slot:image>
      <v-img gradient="to top right, #fbf3bf, #fbf3bf"></v-img>
    </template>

    <v-app-bar-title class="ml-15" style="color:black;letter-spacing: 8px;">Магазин іграшок</v-app-bar-title>

    <template v-slot:extension>
      <v-tabs  id="tabs_age"  v-model="tab" align-tabs="title" >
        <v-tab v-for="(item, i) in items" :key="i" :text="item" :value="i" @click="_click"></v-tab>
        <v-tab>
          <v-select label='Вибір за віком' v-model="ages2" multiple density="compact" width="300"
            :items="ages" hide-details tile color="black">
          </v-select>
        </v-tab>
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