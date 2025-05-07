<script setup lang="ts">
const { setFilter,  getCategoriesList } = useProducts()
const router = useRouter()
const categories = getCategoriesList()

const _click = async (i: any) => {
    console.log('NavigationDrawer click', i)
    setFilter("tab", i) // Uncommenting the setFilter line
    await router.push({ path: "/products", replace: true })
}

</script>
<template>
    <v-navigation-drawer permanent expand-on-hover rail width="350">
        <v-list>
            <v-list-item 
            title="Асортимент велосипедів">
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
            <v-list-item v-for="(cat, i) in categories" key="i" :title="cat.ua" :value="i" @click="_click(i + 1)"
                    style="white-space: initial !important;">
                <template v-slot:prepend>
                    <div style="width: 40px;min-height: 16px;"
                        rounded="0">&nbsp;
                </div>
                </template> 

            </v-list-item>
        </v-list>
    </v-navigation-drawer>

</template>