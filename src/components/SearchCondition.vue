<template>
    <div class="text-center mt-2">
        <v-btn small
               depressed
               color="red lighten-1"
               class="float-left ml-4 white--text"
        >
            검색 조건 설정
        </v-btn>
        <v-chip v-for="category in ['아웃도어/여행', '운동/스포츠']"
                :key="category"
                class="ma-1"
                color="primary"
                small
                outlined
                @click="moveToCategorySearchResult(category)"
        >
            <v-icon left
                    x-small
            >
                mdi-server-plus
            </v-icon>
            {{ category }}
        </v-chip>
    </div>
</template>

<script>
export default {
    name: 'SearchCondition',
    methods: {
        moveToCategorySearchResult(title) {
            this.$router.push(`./categorySearchResult?title=${title}`);
        },
    },
};
</script>

<style scoped>

</style>
