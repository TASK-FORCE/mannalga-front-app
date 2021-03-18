<template>
    <div v-if="!$store.state.common.loading">
        <div class="d-flex px-2 mt-3">
            <UserProfileAvatar :size="40"
                               :imgUrl="boardDto.writerImage"
                               :name="boardDto.writerName"
                               :appendNumber="boardDto.writerSeq"
            />
            <div class="ml-2">
                <div class="title">{{ boardDto.title }}</div>
                <div class="f-09">
                    {{ boardDto.writerName }}
                </div>
            </div>
        </div>
        <slot name="content" />
        <MiddleDivider :height="2" />
        <div class="d-flex pa-3">
            <v-btn v-if="!boardDto.isLiked"
                   outlined
                   small
                   color="#2196f3"
                   @click="likeContext.requestApplyLike"
            >
                <v-icon left
                        small
                        v-text="'$heart'"
                />
                <span class="f-09">좋아요</span>
            </v-btn>
            <v-btn v-else
                   outlined
                   small
                   @click="likeContext.requestDeleteLike"
            >
                <v-icon left
                        small
                        v-text="'$heart'"
                />
                <span class="f-09">좋아요 취소</span>
            </v-btn>
            <v-spacer />
            <div class="d-lg-flex my-auto">
                <div>
                    <span class="like-count-text">{{ boardDto.likeCnt }}명</span>이 사진을 좋아합니다.
                </div>
            </div>
        </div>
        <MiddleDivider :height="2" />

        <div class="px-1 h-100">
            <InfiniteScrollTemplate name="comment"
                                    :firstPageCallback="commentContext.fetchFirstPage"
                                    :nextPageCallback="commentContext.fetchNextPage"
                                    :pageElements="commentContext.commentList"
                                    :pageInfo="commentContext.commentPage"
                                    :withListGroup="false"
            >
                <template v-slot:list-main>
                    <div v-for="(comment, index) in commentContext.commentList"
                         :key="index"
                    >
                        <Comment :comment="comment"
                                 :requestWriteSubComment="commentContext.requestWriteSubComment"
                                 :requestSubCommentList="commentContext.requestSubCommentList"
                        />
                    </div>
                </template>
            </InfiniteScrollTemplate>
        </div>
        <CommentWriteFooter v-if="!$store.state.common.focusingChildCommentInput"
                            :requestWriteComment="commentContext.requestWriteComment"
                            :postProcessor="callbackAfterCommentWrite"
        />
    </div>
</template>

<script lang="ts">
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import MiddleDivider from '@/components/MiddleDivider.vue';
import Comment from '@/components/comment/Comment.vue';
import CommentWriteFooter from '@/components/comment/CommentWriteFooter.vue';
import InfiniteScrollTemplate from '@/components/InfiniteScrollTemplate.vue';
import { ScrollHelper } from '@/utils/scroll.ts';
import Vue from 'vue';

export default Vue.extend({
    name: 'BoardTemplate',
    components: {
        InfiniteScrollTemplate,
        CommentWriteFooter,
        Comment,
        MiddleDivider,
        UserProfileAvatar,
    },
    props: {
        /**
         * {
         *      writerName: '',
         *      writerSeq: 0,
         *      writerImage: '',
         *      title: '',
         *      isLiked: false,,
         *      likeCnt: 0,
         * };
         */
        boardDto: {
            type: Object,
            required: true,
        },
        /**
         * {
         *     commentList: [],
         *     commentPage: {},
         *     fetchFirstPage: Function,
         *     fetchNextPage: Function,
         *     requestWriteComment: Function(content),
         *     requestWriteSubComment: Function(content, parentSeq),
         *     requestSubCommentList: Function(parentSeq),
         *     commentWritePostProcess: Function,
         * }
         */
        commentContext: {
            type: Object,
            required: true,
        },
        /**
         * {
         *     requestApplyLike: Function,
         *     requestDeleteLike: Function,
         * }
         */
        likeContext: {
            type: Object,
            required: true,
        },
    },
    methods: {
        callbackAfterCommentWrite() {
            this.commentContext.commentWritePostProcess()
                .then(() => this.scrollToBottomWhenLastPage());
        },
        scrollToBottomWhenLastPage() {
            if (this.commentContext.commentPage.isLastPage) {
                ScrollHelper.scrollToBottom();
                return;
            }
            setTimeout(this.scrollToBottomWhenLastPage, 100);
        },
    },
});
</script>

<style scoped>
.title {
    font-weight: 700;
    font-size: 1.05rem;
}

.like-count-text {
    font-weight: bold;
}
</style>
