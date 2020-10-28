<template>
    <v-app-bar
            class="elevation-0"
            app
    >
        <v-btn icon
               @click="$router.back()"
        >
            <v-icon>mdi-keyboard-backspace</v-icon>
        </v-btn>
        <h3>{{ clubName }}</h3>
        <v-spacer></v-spacer>

        <v-btn icon>
            <v-icon>mdi-heart</v-icon> <!-- @TODO 사용자 관심여부에 따른 아이콘 처리 -->
        </v-btn>
        <v-btn icon>
            <v-icon>mdi-share-variant</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>mdi-cogs</v-icon> <!-- @TODO 사용자 가입여부에 따른 아이콘 처리 -->
        </v-btn>
    </v-app-bar>
</template>

<script>
export default {
    name: 'ClubMainHeader',
    props: ['clubName'],
};
</script>

<style scoped>
</style>
