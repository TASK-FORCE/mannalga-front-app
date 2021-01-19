<template>
    <div class="board-create-container">
        <v-form ref="clubBoardCreateForm"
                class="field-wrapper"
        >
            <v-text-field v-model="title"
                          :rules="RULES.CLUB_BOARD_TITLE"
                          class="pa-0 ma-0"
                          label="게시글 제목"
            />
            <v-select v-model="category"
                      :items="boardCategoryNames"
                      :rules="RULES.CLUB_BOARD_CATEGORY"
                      label="카테고리"
                      class="mt-2"
                      outlined
                      dense
            />
            <v-textarea v-model="content"
                        :height="resolveContentHeight"
                        :rules="RULES.CLUB_BOARD_CONTENT"
                        label="내용을 작성해주세요."
                        hide-details
                        outlined
            />
        </v-form>
        <div class="image-box-wrapper">
            <div v-for="(_, index) in enableImageSize"
                 :key="index"
                 class="mx-1"
            >
                <ImageSelectBox :height="resolveImageBoxHeight"
                                :width="resolveImageBoxWidth"
                                cropFreeSize
                                fixImage
                                @handleImageDto="dto => addImage(dto, index)"
                />
            </div>
        </div>
        <CommonCenterBtn :loading="loading"
                         class="mt-5 mb-2"
                         color="primary"
                         width="120"
                         outlined
                         text="작성 완료"
                         @click="createClubBoard"
        />
    </div>
</template>

<script>
import ImageSelectBox from '@/components/image/ImageSelectBox.vue';
import CommonCenterBtn from '@/components/button/CommonCenterBtn.vue';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import { generateParamPath, PATH } from '@/router/route_path_type.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import { RULES } from '@/utils/common/constant/rules.js';
import { BoardUtils } from '@/utils/board.js';
import gettersHelper from '@/store/helper/GettersHelper.js';

export default {
    name: 'ClubBoardCreateBox',
    components: { CommonCenterBtn, ImageSelectBox },
    data() {
        return {
            RULES,
            enableImageSize: 3,
            loading: false,

            title: null,
            content: null,
            category: null,
            imgList: [],
        };
    },
    computed: {
        currentUserInfo: () => gettersHelper.currentUserInfo(),
        resolveImageBoxHeight() {
            return window.innerHeight / 7;
        },
        resolveImageBoxWidth() {
            return `${(window.innerWidth - 32) / 3 - 8}`;
        },
        resolveContentHeight() {
            return window.innerHeight / 3;
        },
        boardCategoryNames() {
            return BoardUtils.findCategoryByCurrentUserInfo(this.currentUserInfo);
        },
    },
    methods: {
        addImage(imageDto, index) {
            this.imgList.splice(index, 0, imageDto);
        },
        createClubBoard() {
            if (this.$refs.clubBoardCreateForm.validate()) {
                const { clubSeq } = this.$route.params;
                const clubBoardDto = {};
                this.loading = true;
                actionsHelper.requestClubCreateBoard({ clubSeq, clubBoardDto })
                    .then(() => {
                        mutationsHelper.openSnackBar('게시글 생성 성공!');
                        this.$router.push(generateParamPath(PATH.CLUB.MAIN, [clubSeq]));
                    })
                    .finally(this.loading = false);
            }
        },
    },
};
</script>

<style lang="scss"
       scoped
>
.board-create-container {
    padding-top: 1.5rem;
    padding-left: 1rem;
    padding-right: 1rem;

    .image-box-wrapper {
        display: flex;
        margin-top: 24px;
    }
}
</style>
