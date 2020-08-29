<template>
    <v-app-bar
            color="white"
            class="elevation-0"
            app
    >
        <v-btn icon
               @click="$router.back()"
        >
            <v-icon color="black">mdi-keyboard-backspace</v-icon>
        </v-btn>
        <h3>{{ clubName }}</h3>
        <v-spacer></v-spacer>

        <!-- @TODO 필요 아이콘 정의 -->
        <v-btn icon>
            <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>mdi-share-variant</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>mdi-cogs</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
export default {
    name: 'ClubHeader',
    props: ['clubName'],
};
</script>

<style scoped>
</style>
