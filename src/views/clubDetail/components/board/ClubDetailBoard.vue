<template>
    <div>
        <v-card>
            <v-list three-line>
                <template v-for="board in boardList.boards">
                    <v-list-item :key="board.seq"
                                 @click="$router.push(clubBoardPath(board.seq))"
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
                </template>
            </v-list>
        </v-card>
        <FixedCreateBtn color="blue"
                        :path="clubBoardCreate"
                        left
        />
    </div>
</template>

<script>
import FixedCreateBtn from '@/components/button/FixedCreateBtn.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.js';
import routerHelper from '@/router/RouterHelper.js';

export default {
    name: 'ClubDetailBoard',
    components: { FixedCreateBtn },
    props: ['boardList'],
    data() {
        return {
            clubBoardCreate: null,
        };
    },
    computed: {
        clubSeq: () => routerHelper.clubSeq(),
    },
    mounted() {
        this.clubBoardCreate = generateParamPath(PATH.CLUB.BOARD_CREATE, [this.clubSeq]);
    },
    methods: {
        clubBoardPath(boardSeq) {
            return generateParamPath(PATH.CLUB.BOARD_POST, [this.clubSeq, boardSeq]);
        },
    },
};
</script>

<style scoped>
</style>
