<template>
  <div>
    <SubmitHeader
      :title="headerTitle"
      :submitCallback="submit"
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
          v-for="(imageUrl, index) in imageUrlList"
          :key="index"
          class="mx-1"
        >
          <ImageSelectBox
            :height="resolveImageBoxHeight"
            :width="resolveImageBoxWidth"
            :initImage="imageUrl"
            cropFreeSize
            fixImage
            @handleUploadedImage="image => addImage(image, index)"
            @deleteImage="deleteImage(index)"
          />
        </div>
      </div>
    </v-form>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import ImageSelectBox from '@/components/image/ImageSelectBox.vue';
import { RULES } from '@/utils/common/constant/rules.ts';
import routerHelper from '@/router/RouterHelper.ts';
import { UploadImageResponse } from '@/interfaces/common';
import { CurrentUserInfo } from '@/interfaces/club';
import { BoardCategory } from '@/interfaces/board/BoardCategory';
import { BoardCategoryType, BoardWriteContext, BoardWriteRequest } from '@/interfaces/board/board';
import SubmitHeader from '@/components/header/SubmitHeader.vue';
import _ from '@/utils/common/lodashWrapper';

const EMPTY_IMAGE: UploadImageResponse = {
  absolutePath: '',
  fileName: '',
  filePath: '',
}

export default Vue.extend({
  name: 'ClubBoardCreateAndEdit',
  components: { SubmitHeader, ImageSelectBox },
  props: {
    headerTitle: String,
    context: {
      type: Object as PropType<BoardWriteContext>,
    },
    submitClickCallback: {
      type: Function as PropType<(boardWriteRequest: BoardWriteRequest) => Promise<void>>,
      required: true,
    },
  },
  data() {
    return {
      title: undefined as undefined | string,
      content: undefined as undefined | string,
      category: undefined as undefined | string,
      selectedImages: {
        0: EMPTY_IMAGE,
        1: EMPTY_IMAGE,
        2: EMPTY_IMAGE,
      } as {
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
      const width = Math.min(window.innerWidth, 600);
      return `${(width - 32) / 3 - 8}`;
    },
    resolveContentHeight(): string {
      return `${window.innerHeight / 3}`;
    },
    boardCategoryNames(): string[] {
      return BoardCategory.findCategoryNamesByCurrentUserInfo(this.currentUserInfo);
    },
    imageUrlList(): string[] {
      return Object.values(this.selectedImages).map((image) => image.absolutePath);
    }
  },
  mounted() {
    if (this.context) {
      this.title = this.context.title;
      this.content = this.context.content;
      this.category = BoardCategory.findCategoryByType(this.context.category).name;
      this.context.imgList.forEach((image: UploadImageResponse, index: number) => (this.selectedImages[index] = image));
    }
  },
  methods: {
    addImage(uploadedImage: UploadImageResponse, index: number) {
      this.selectedImages[index] = uploadedImage;
    },
    deleteImage(index: number) {
      this.selectedImages[index] = EMPTY_IMAGE;
    },
    submit() {
      const clubBoardCreateForm = this.$refs.clubBoardCreateForm as HTMLFormElement;
      if (clubBoardCreateForm.validate()) {
        const boardWriteRequest: BoardWriteRequest = {
          title: this.title as string,
          content: this.content as string,
          category: BoardCategory.findCategoryTypeByName(this.category as string) as BoardCategoryType,
          imgList: Object.values(this.selectedImages).filter(image => !_.isEmpty(image.absolutePath)),
        };
        return this.submitClickCallback(boardWriteRequest);
      }
      return Promise.resolve();
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
