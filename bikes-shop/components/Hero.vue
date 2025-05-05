<script setup lang="ts">
const heroData = ref({
    "hero":
    {
        "heroImgSrc": "/images/d0_photo.jpg",
        "heroTitle": "ЗДОРОВА ЇЖА",
        "heroSubtitle": "See what I'm blogging about today!"
    }
});
</script>

<template>
    <v-parallax dark :src="heroData.hero.heroImgSrc">
        <v-row align="center" justify="center">
            <v-col>
                <h1 class="text-center"
                    style="font-family:'EB garamond';font-size: 60px !important;margin:100px auto auto auto;color:black;">
                    {{ heroData.hero.heroTitle }}
                </h1>
                <br />
                <h4 class="subheading text-center" style="font-family:'EB garamond';color:white;">
                    {{ heroData.hero.heroSubtitle }}
                </h4>
            </v-col>
        </v-row>
    </v-parallax>
</template>
