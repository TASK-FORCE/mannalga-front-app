<template>
    <v-tab-item>
        <v-card>
            <v-list three-line>
                <template v-for="board in boardList.boards">
                    <v-list-item
                        :key="board.seq"
                        :to="`/club/board/${board.seq}`"
                    >
                        <v-list-item-content>
                            <v-list-item-title>{{ board.title }}</v-list-item-title>
                            <v-list-item-subtitle>
                                <span class="float-left">
                                    {{ board.writeDate }} {{ board.writerName }}
                                </span>
                                <span class="float-right">
                                    <v-icon small>mdi-thumb-up-outline</v-icon> {{ board.favoriteCnt }}
                                    &nbsp;
                                    <v-icon small>mdi-comment-text-outline</v-icon> {{ board.commentCnt }}
                                </span>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <!-- <v-divider /> -->
                </template>
            </v-list>
        </v-card>
        <CommonCreateBtn color="blue"
            :path="clubBoardCreate"
        />
    </v-tab-item>
</template>

<script>
import CommonCreateBtn from '@/components/common/CommonCreateBtn.vue';
import { CLUB_BOARD_CREATE_PATH } from '@/router/route_path_type.js';

export default {
    name: 'ClubBoard',
    components: { CommonCreateBtn },
    props: ['boardList'],
    data() {
        return {
            clubBoardCreate: CLUB_BOARD_CREATE_PATH,
        };
    },
    computed: {
    },
    // @TODO 게시판 CRUD
};
</script>

<style scoped>
</style>
