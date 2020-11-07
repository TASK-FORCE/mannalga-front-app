<template>
    <div class="wrapper">
        <v-form ref="clubBoardCreateForm"
                class="field-wrapper"
        >
            <v-text-field v-model="clubBoardCreateInfo.title"
                          :rules="RULES.CLUB_BOARD_TITLE"
                          class="pa-0"
                          label="게시글 제목"
            />
            <v-textarea v-model="clubBoardCreateInfo.content"
                        :rules="RULES.CLUB_BOARD_CONTENT"
                        label="내용을 작성해주세요."
                        outlined
            ></v-textarea>
        </v-form>
        <div class="image-box-wrapper d-flex">
            <div v-for="(_, index) in enableImageSize"
                 :key="index"
                 class="float-left"
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
import { RULES } from '@/utils/common/constant/constant.js';
import CommonCenterBtn from '@/components/ui/button/CommonCenterBtn.vue';
import { actionsHelper } from '@/store/helper/actionsHelper.js';
import { combineParamPath, PATH } from '@/router/route_path_type.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';

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
                    .then(() => this.$router.push(combineParamPath(PATH.CLUB.MAIN, [clubSeq]))
                        .then(mutationsHelper.openSnackBar('게시글 생성 성공!')))
                    .catch(() => mutationsHelper.openSnackBar('게시글 생성에 실패하였습니다.'))
                    .finally(this.loading = false);
            }
        },
    },
};
</script>

<style lang="scss"
       scoped
>
.wrapper {
    padding-left: 2rem;
    padding-right: 2rem;

    .field-wrapper {
        margin-top: 2rem;
    }

    .image-box-wrapper {
        width: 100%;

        .image-box {
            display: inline-block;
            margin-right: 10px;
            width: 80px;
        }
    }
}
</style>
