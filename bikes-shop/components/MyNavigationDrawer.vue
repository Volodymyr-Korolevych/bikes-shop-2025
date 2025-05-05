<script setup lang="ts">
const { getCategoriesList } = useProducts()
const router = useRouter()
const categories = getCategoriesList()
const _prod = (i: any) => {
    router.push({ path: "/products", query: { id: i.toString() }, replace: true })
}
</script>
<template>
    <v-navigation-drawer permanent expand-on-hover rail width="350">
        <v-list>
            <v-list-item 
            title="Категорії">
            <template v-slot:prepend>
                     <v-avatar 
                       image="/favicon.png"
                       rounded="0"
                    >
                    </v-avatar>
                    </template>
        
        
        </v-list-item>
        </v-list>
        <v-list density="compact" nav>
            <v-list-item v-for="(cat, i) in categories" key="i" :title="cat" :value="i" @click="_prod(i + 1)"
                    style="white-space: initial !important;">
                <template v-slot:prepend>
                    <v-avatar :image="`/images/categories/${i}.svg`" style="max-width: 20px;max-height: 16px;"
                        rounded="0">
                    </v-avatar>
                </template>

            </v-list-item>
        </v-list>
    </v-navigation-drawer>

</template>