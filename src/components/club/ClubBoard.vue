<template>
    <v-tab-item>
        <v-card>
            <v-list three-line>
                <template v-for="board in boardList.boards">
                    <v-list-item
                        :key="board.title"
                        @click="$emit('')"
                    >
                        <v-list-item-avatar>
                            <v-img :src="board.writerImg"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{ board.title }}</v-list-item-title>
                            <v-list-item-subtitle><span class='text--primary'>{{ board.writerName }}</span> 좋아요{{ board.favoriteCnt }} 댓글{{ board.commentCnt }}</v-list-item-subtitle>
                            <v-list-item-subtitle>{{ board.writeDate }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-card>
        <v-btn
            absolute
            bottom
            color="blue"
            right
            fab
            dark
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-tab-item>
    <!-- @TODO 게시글 추가하기 버튼 -->
</template>

<script>
export default {
    name: 'ClubBoard',
    props: ['boardList'],
    data() {
        return {
            // ... 
        };
    },
    // @TODO 게시판 CRUD
};
</script>

<style scoped>
</style>
