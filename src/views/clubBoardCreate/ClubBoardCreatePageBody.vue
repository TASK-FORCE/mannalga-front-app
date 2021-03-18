<template>
    <div class="board-create-container">
        <v-form
            ref="clubBoardCreateForm"
            class="field-wrapper"
        >
            <v-text-field
                v-model="title"
                :rules="RULES.CLUB_BOARD_TITLE"
                hide-details
                class="pa-0 ma-0"
                label="게시글 제목"
            />
            <v-select
                v-model="category"
                :items="boardCategoryNames"
                :rules="RULES.CLUB_BOARD_CATEGORY"
                hide-details
                label="카테고리"
                class="mt-3"
                outlined
                dense
            />
            <v-textarea
                v-model="content"
                :height="resolveContentHeight"
                :rules="RULES.CLUB_BOARD_CONTENT"
                label="내용을 작성해주세요."
                class="mt-3"
                hide-details
                outlined
            />
        </v-form>
        <div class="image-box-wrapper">
            <div
                v-for="(_, index) in enableImageSize"
                :key="index"
                class="mx-1"
            >
                <ImageSelectBox
                    :height="resolveImageBoxHeight"
                    :width="resolveImageBoxWidth"
                    cropFreeSize
                    fixImage
                    @handleUploadedImage="image => addImage(image, index)"
                />
            </div>
        </div>
        <CommonCenterBtn
            :loading="loading"
            class="mt-5 mb-2"
            color="primary"
            width="120"
            outlined
            text="작성"
            @click="createClubBoard"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ImageSelectBox from '@/components/image/ImageSelectBox.vue';
import CommonCenterBtn from '@/components/button/CommonCenterBtn.vue';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import { generateParamPath, PATH } from '@/router/route_path_type.js';
import { RULES } from '@/utils/common/constant/rules.js';
import { BoardUtils } from '@/utils/board.js';
import routerHelper from '@/router/RouterHelper.ts';
import { UploadImageResponse } from '@/interfaces/common';
import { CurrentUserInfo } from '@/interfaces/club';

export default Vue.extend({
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
            selectedImages: {},
        };
    },
    computed: {
        clubSeq: () => routerHelper.clubSeq(),
        currentUserInfo(): CurrentUserInfo {
            return this.$store.state.club.currentUserInfo;
        },
        resolveImageBoxHeight() {
            return `${window.innerHeight / 7}`;
        },
        resolveImageBoxWidth() {
            return `${(window.innerWidth - 32) / 3 - 8}`;
        },
        resolveContentHeight() {
            return `${window.innerHeight / 3}`;
        },
        boardCategoryNames() {
            return BoardUtils.findCategoryByCurrentUserInfo(this.currentUserInfo);
        },
    },
    methods: {
        addImage(uploadedImage: UploadImageResponse, index: number) {
            this.selectedImages[index] = uploadedImage;
        },
        createClubBoard() {
            if (this.$refs.clubBoardCreateForm.validate()) {
                const clubBoardDto = {
                    title: this.title,
                    content: this.content,
                    category: BoardUtils.findCategoryTypeByName(this.category),
                    imgList: Object.values(this.selectedImages),
                };
                this.loading = true;
                actionsHelper.requestClubBoardCreate({ clubSeq: this.clubSeq, clubBoardDto })
                    .then(() => {
                        actionsHelper.requestFirstBoardList(this.clubSeq);
                        this.$router.push(generateParamPath(PATH.CLUB.MAIN, [this.clubSeq]));
                    })
                    .finally(() => this.loading = false);
            }
        },
    },
});
</script>

<style
    lang="scss"
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
