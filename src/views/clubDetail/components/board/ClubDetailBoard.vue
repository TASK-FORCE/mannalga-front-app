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
        <div v-for="board in boardList.boards"
             :key="board.seq"
        >
            <div v-ripple
                 @click="clickBoard"
            >
                <div class="d-flex align-center pa-2">
                    <UserProfileAvatar :size="30"
                                       :imgUrl="board.writerImg"
                                       :name="board.writerName"
                                       :appendNumber="board.writerSeq"
                    />
                    <div class="d-flex align-center">
                        <div class="board-writer-name d-flex">
                            <span class="my-auto">{{ board.writerName }}</span>
                        </div>
                        <RoleChip v-if="board.writerRole === 'MASTER' || board.writerRole === 'MANAGER'"
                                  :role="board.writerRole"
                                  class="ml-1"
                                  outlined
                                  style="margin-bottom: 1px; font-size: 0.5rem;"
                        />
                        <VerticalBarDivider class="my-auto" />
                        <div class="board-write-datetime">
                            {{ board.writeDate }}
                        </div>
                    </div>
                    <v-spacer />
                    <Chip :info="getCategoryInfo(board.category)"
                          color="green"
                          :radius="7"
                          class="px-2 py-1"
                    />
                </div>
                <v-divider />
                <div class="py-2 pl-3 pr-2 d-flex">
                    <div>
                        <div class="font-weight-bold">
                            {{ board.title }}
                        </div>
                        <div class="board-content-wrapper">
                            <div class="mt-1 board-content">
                                {{ board.content }}
                            </div>
                        </div>
                        <v-spacer />
                        <div class="d-flex">
                            <div>
                                <v-icon color="#f50e22"
                                        small
                                        v-text="'$heart'"
                                />
                                <span class="f-09">
                                        1
                                    </span>
                            </div>
                            <div class="ml-3">
                                <v-icon color="#2196f3"
                                        small
                                        v-text="'$commentMultiple'"
                                />
                                <span class="f-09">
                                        1
                            </span>
                            </div>
                        </div>
                    </div>
                    <v-spacer />
                    <div v-if="board.mainImg"
                         class="py-2 d-flex"
                    >
                        <v-img :src="board.mainImg"
                               height="90"
                               width="110"
                               class="my-auto"
                               style="border-radius: 10px"
                        />
                    </div>
                </div>
            </div>
            <MiddleDivider :height="7" />
        </div>
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
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import VerticalBarDivider from '@/components/VerticalBarDivider.vue';
import MiddleDivider from '@/components/MiddleDivider.vue';
import RoleChip from '@/components/chip/RoleChip.vue';
import Chip from '@/components/chip/Chip.vue';

const BOARD_CATEGORY = {
    NOTICE: {
        name: '공지사항',
        color: '#ba6f01',
    },
    JOIN_GREETING: {
        name: '가입인사',
        color: '#2196f3',
    },
    FREE: {
        name: '자유글',
        color: '#009688',
    },
    MEETING_REVIEW: {
        name: '모임후기',
        color: '#795548',
    },
};

export default {
    name: 'ClubDetailBoard',
    components: { Chip, RoleChip, MiddleDivider, VerticalBarDivider, UserProfileAvatar, FixedCreateBtn },
    props: ['boardList'],
    data() {
        return {
            clubBoardCreate: null,
            boardCategoryNames: ['전체보기', ...Object.values(BOARD_CATEGORY).map(({ name }) => name)],
            selectedCategory: '전체보기',
        };
    },
    computed: {
        clubSeq: () => routerHelper.clubSeq(),
    },
    watch: {
        selectedCategory(value) {
            console.log('selectedCategory changed -> ', value);
        },
    },
    mounted() {
        this.clubBoardCreate = generateParamPath(PATH.CLUB.BOARD_CREATE, [this.clubSeq]);
    },
    methods: {
        clubBoardPath(boardSeq) {
            return generateParamPath(PATH.CLUB.BOARD_POST, [this.clubSeq, boardSeq]);
        },
        getCategoryInfo(categoryName) {
            const { name, color } = BOARD_CATEGORY[categoryName];
            return { name, color };
        },
        clickBoard() {
            console.log('clickBoard');
        },
    },
};
</script>

<style scoped
       lang="scss"
>

.board-writer-name {
    font-size: 0.9rem;
    font-weight: bold;
    margin-left: 6px;
}

.board-write-datetime {
    font-size: 0.9rem;
    color: #959595;
}

.board-content-wrapper {
    height: 60px;
    display: flex;

    .board-content {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 20px;
        height: 40px;
    }
}
</style>
