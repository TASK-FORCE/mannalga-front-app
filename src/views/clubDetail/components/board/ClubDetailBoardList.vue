<template>
    <div>
        <div class="ml-3 mt-1 mb-3">
            <v-select v-model="selectedCategory"
                      :items="boardCategoryNames"
                      outlined
                      dense
                      hide-details
                      style="width: 120px"
            />
        </div>
        <InfiniteScrollTemplate name="board"
                                :firstPageCallback="this.fetchFirstPage"
                                :nextPageCallback="this.fetchNextPage"
                                :pageElements="boardList"
                                :pageInfo="boardPage"
                                withListGroup
        >
            <template v-slot:list-main>
                <div v-for="board in boardList"
                     :key="board.seq"
                >
                    <ClubDetailBoardPost :board="board" />
                </div>
            </template>
        </InfiniteScrollTemplate>
        <FixedCreateBtn v-if="canCreateBoard"
                        color="blue"
                        :path="clubBoardCreate"
                        left
        />
    </div>
</template>

<script>
import FixedCreateBtn from '@/components/button/FixedCreateBtn.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.js';
import routerHelper from '@/router/RouterHelper.js';
import { BoardUtils } from '@/utils/board.js';
import gettersHelper from '@/store/helper/GettersHelper.js';
import ClubDetailBoardPost from '@/views/clubDetail/components/board/ClubDetailBoardPost.vue';
import InfiniteScrollTemplate from '@/components/InfiniteScrollTemplate.vue';
import actionsHelper from '@/store/helper/ActionsHelper.js';

export default {
    name: 'ClubDetailBoardList',
    components: {
        InfiniteScrollTemplate,
        ClubDetailBoardPost,
        FixedCreateBtn,
    },
    props: {
        currentUserInfo: Object,
    },
    data() {
        return {
            clubBoardCreate: null,
            boardCategoryNames: ['전체보기', ...BoardUtils.getCategoryNames()],
            selectedCategory: '전체보기',
        };
    },
    computed: {
        clubSeq: () => routerHelper.clubSeq(),
        boardList: () => gettersHelper.boardList(),
        boardPage: () => gettersHelper.boardPage(),
        canCreateBoard() {
            const { isMaster, isManager, isMember } = this.currentUserInfo;
            return isMaster || isManager || isMember;
        },
        categoryType() {
            return BoardUtils.findCategoryTypeByName(this.selectedCategory);
        },
        requestDto() {
            return {
                clubSeq: this.clubSeq,
                category: this.categoryType,
            };
        },
    },
    watch: {
        selectedCategory(value) {
            actionsHelper.requestFirstBoardList(this.requestDto);
        },
    },
    mounted() {
        this.clubBoardCreate = generateParamPath(PATH.CLUB.BOARD_CREATE, [this.clubSeq]);
    },
    methods: {
        clubBoardPath(boardSeq) {
            return generateParamPath(PATH.CLUB.BOARD_POST, [this.clubSeq, boardSeq]);
        },
        fetchFirstPage() {
            return actionsHelper.requestFirstBoardList(this.requestDto);
        },
        fetchNextPage() {
            return actionsHelper.requestNextBoardList(this.requestDto);
        },
    },
};
</script>

<style scoped
       lang="scss"
>
</style>
