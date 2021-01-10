<template>
    <div class="board-create-container">
        <v-form ref="clubBoardCreateForm"
                class="field-wrapper"
        >
            <v-text-field v-model="clubBoardCreateInfo.title"
                          :rules="RULES.CLUB_BOARD_TITLE"
                          class="pa-0"
                          label="게시글 제목"
            />
            <v-textarea v-model="clubBoardCreateInfo.content"
                        class="mt-2"
                        height="300"
                        :rules="RULES.CLUB_BOARD_CONTENT"
                        label="내용을 작성해주세요."
                        outlined
            ></v-textarea>
        </v-form>
        <div class="image-box-wrapper">
            <div v-for="(_, index) in enableImageSize"
                 :key="index"
            >
                <ImageSelectBox class="image-box"
                                height="80"
                                @handleImageDto="dto => addImage(dto, index)"
                />
            </div>
        </div>
        <CommonCenterBtn :loading="loading"
                         class="mt-5"
                         color="primary"
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

export default {
    name: 'ClubBoardCreateBox',
    components: { CommonCenterBtn, ImageSelectBox },
    data() {
        return {
            RULES,
            enableImageSize: 3,
            loading: false,
            clubBoardCreateInfo: {
                title: null,
                content: null,
                isTopFixed: false, // 존재 이유 파악하기
                isNotifiable: false, // 존재 이유 파악하기
                imgList: [],
            },
            imgPath: 'https://super-invention-static.s3.ap-northeast-2.amazonaws.com/temp/img/20201127015224-0c427f9f-124b-468b-aab0-101b15324995-test.png',
        };
    },
    methods: {
        addImage(imageDto, index) {
            this.clubBoardCreateInfo.imgList.splice(index, 0, imageDto);
        },
        createClubBoard() {
            if (this.$refs.clubBoardCreateForm.validate()) {
                const { clubSeq } = this.$route.params;
                const clubBoardDto = { ...this.clubBoardCreateInfo };
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
        flex-wrap: wrap;

        .image-box {
            display: inline-block;
            margin-right: 10px;
            width: 80px;
        }
    }
}
</style>
