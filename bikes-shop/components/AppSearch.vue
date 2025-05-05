<script setup lang="ts">
    const router = useRouter()
    const { setFilter } = useProducts()
    const search = ref('')
    let counter = ref<number>(100)

    const go = () => {
        console.log("AppSearch",  search.value) 
        setFilter('search', search.value)
        router.push(`/products?id=filter${counter.value++}`)
    }


</script>
<template>
    <div id="my-search" style ="width:200px">
        <v-text-field v-model="search" label="Пошук" 
           prepend-inner-icon="mdi-magnify" 
           density="compact" 
           hide-details
           single-line 
           @update:modelValue="go"
           color="black"
           ></v-text-field>
    </div>
</template>
<style>
#my-search label.v-label.v-field-label {
    font-size: 12px;
}
</style>

