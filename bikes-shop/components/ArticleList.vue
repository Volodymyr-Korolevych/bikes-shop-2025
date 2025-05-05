<script lang="ts" setup>
const props = defineProps({
  tag: String
})
interface keyable {
    [key: string]: string | undefined | null 
  }
const { getContent} = useNavigation()

const list = ref<keyable[]>([])
list.value = await getContent(props.tag)
</script>

<template>
  <div>
    <v-row>
        <v-col style="display:flex; align-items:center;justify-content:baseline;flex-wrap:wrap;">
          <template v-for="photo in list" :key="photo._path">
              <NuxtLink 
                  :to="photo._path + '?key=' + tag" 
                  style="margin:10px;display:inline-flex;width:350px"
              >
                <v-img :src="photo.photo"></v-img>
              </NuxtLink>
          </template>
        </v-col>
    </v-row>
  </div>
</template>
