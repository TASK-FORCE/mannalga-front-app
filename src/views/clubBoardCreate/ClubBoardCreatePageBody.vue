<template>
  <div>
    <CommonHeader
      :title="headerTitle"
      showSubmitBtn
      @submit="createClubBoard"
      @back="$emit('back')"
    />
    <v-form
      ref="clubBoardCreateForm"
      class="board-create-and-edit-form"
    >
      <v-text-field
        v-model="title"
        :rules="RULES.CLUB_BOARD_TITLE"
        hide-details
        outlined
        label="게시글 제목"
      />
      <v-select
        v-model="category"
        :items="boardCategoryNames"
        :rules="RULES.CLUB_BOARD_CATEGORY"
        hide-details
        label="카테고리"
        class="mt-4"
        outlined
        dense
      />
      <v-textarea
        v-model="content"
        :height="resolveContentHeight"
        :rules="RULES.CLUB_BOARD_CONTENT"
        label="내용을 작성해주세요."
        class="mt-4"
        hide-details
        outlined
      />
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
    </v-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ImageSelectBox from '@/components/image/ImageSelectBox.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.ts';
import { RULES } from '@/utils/common/constant/rules.ts';
import routerHelper from '@/router/RouterHelper.ts';
import { UploadImageResponse } from '@/interfaces/common';
import { CurrentUserInfo } from '@/interfaces/club';
import { BoardActionTypes } from '@/store/type/actionTypes';
import { BoardCategory } from '@/interfaces/board/BoardCategory';
import { BoardCategoryType, BoardCreateRequestWishSeq } from '@/interfaces/board/board';
import CommonHeader from '@/components/header/CommonHeader.vue';

export default Vue.extend({
  name: 'ClubBoardCreateBox',
  components: { CommonHeader, ImageSelectBox },
  props: {
    headerTitle: String,
  },
  data() {
    return {
      enableImageSize: 3,
      loading: false,
      title: undefined as undefined | string,
      content: undefined as undefined | string,
      category: undefined as undefined | string,
      selectedImages: {} as {
        [index: number]: UploadImageResponse;
      },
      RULES,
    };
  },
  computed: {
    clubSeq(): number {
      return routerHelper.clubSeq();
    },
    currentUserInfo(): CurrentUserInfo {
      return this.$store.state.club.currentUserInfo;
    },
    resolveImageBoxHeight(): string {
      return `${window.innerHeight / 7}`;
    },
    resolveImageBoxWidth(): string {
      return `${(window.innerWidth - 32) / 3 - 8}`;
    },
    resolveContentHeight(): string {
      return `${window.innerHeight / 3}`;
    },
    boardCategoryNames(): string[] {
      return BoardCategory.findCategoryNamesByCurrentUserInfo(this.currentUserInfo);
    },
  },
  methods: {
    addImage(uploadedImage: UploadImageResponse, index: number) {
      this.selectedImages[index] = uploadedImage;
    },
    createClubBoard() {
      const clubBoardCreateForm = this.$refs.clubBoardCreateForm as HTMLFormElement;
      if (clubBoardCreateForm.validate()) {
        this.loading = true;
        const boardCreateRequestWishSeq: BoardCreateRequestWishSeq = {
          clubSeq: this.clubSeq,
          boardCreateRequest: {
            title: this.title as string,
            content: this.content as string,
            category: BoardCategory.findCategoryTypeByName(this.category as string) as BoardCategoryType,
            imgList: Object.values(this.selectedImages),
          }
        };
        this.$store.dispatch(BoardActionTypes.REQUEST_CLUB_BOARD_CREATE, boardCreateRequestWishSeq)
          .then(() => {
            this.$store.dispatch(BoardActionTypes.REQUEST_FIRST_BOARD_LIST, { clubSeq: this.clubSeq });
            this.$router.push(generateParamPath(PATH.CLUB.MAIN, [this.clubSeq]));
          })
          .finally(() => (this.loading = false));
      }
    },
  },
});
</script>

<style
  lang="scss"
  scoped
>
.board-create-and-edit-form {
  padding-top: 1.5rem;
  padding-left: 1rem;
  padding-right: 1rem;

  .image-box-wrapper {
    display: flex;
    margin-top: 24px;
  }
}
</style>
