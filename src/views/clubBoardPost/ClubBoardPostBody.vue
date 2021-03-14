<template>
    <BoardTemplate
        :boardDto="boardDto"
        :commentContext="commentContext"
        :likeContext="likeContext"
    >
        <template #content>
            <div class="pa-3">
                <div class="content"
                     v-text="board.content"
                />
            </div>
        </template>
    </BoardTemplate>
</template>

<script>
import gettersHelper from '@/store/helper/GettersHelper.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import routerHelper from '@/router/RouterHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import BoardTemplate from '@/components/BoardTemplate.vue';

export default {
    name: 'ClubBoardPostBody',
    components: {
        BoardTemplate,
    },
    computed: {
        board: () => gettersHelper.board(),
        seqInfo() {
            return {
                clubSeq: routerHelper.clubSeq(),
                boardSeq: routerHelper.boardSeq(),
            };
        },
        boardDto() {
            return {
                writerName: this.board.writerName,
                writerSeq: this.board.writerSeq,
                writerImage: this.board.writerImage,
                title: this.board.title,
                isLiked: this.board.isLiked,
                likeCnt: this.board.likeCnt,
            };
        },
        commentContext() {
            return {
                commentList: gettersHelper.boardCommentList(),
                commentPage: gettersHelper.boardCommentPage(),
                fetchFirstPage: this.fetchFirstPage,
                fetchNextPage: this.fetchNextPage,
                requestWriteComment: this.requestWriteComment,
                requestWriteSubComment: this.requestWriteSubComment,
                requestSubCommentList: this.requestSubCommentList,
                commentWritePostProcess: this.commentWritePostProcess,
            };
        },
        likeContext() {
            return {
                requestApplyLike: this.requestApplyLike,
                requestDeleteLike: this.requestDeleteLike,
            };
        },
    },
    created() {
        actionsHelper.requestBoard(this.seqInfo)
            .catch(() => this.$router.back());
    },
    beforeDestroy() {
        mutationsHelper.initBoardCommentList();
    },
    methods: {
        fetchFirstPage() {
            return actionsHelper.requestFirstBoardCommentList(this.seqInfo);
        },
        fetchNextPage() {
            return actionsHelper.requestNextBoardCommentList(this.seqInfo);
        },
        requestWriteComment(content) {
            const boardCommentWriteInfo = {
                ...this.seqInfo,
                boardCommentWriteDto: { content },
            };
            return actionsHelper.requestBoardCommentWrite(boardCommentWriteInfo)
                .then(() => mutationsHelper.countBoardCommentCnt(this.board.seq));
        },
        requestWriteSubComment(content, parentSeq) {
            const boardCommentWriteInfo = {
                ...this.seqInfo,
                parentCommentSeq: parentSeq,
                boardCommentWriteDto: { content },
            };
            return actionsHelper.requestBoardCommentWrite(boardCommentWriteInfo)
                .then(() => {
                    mutationsHelper.countBoardCommentCnt(this.board.seq);
                    mutationsHelper.countChildBoardCommentCnt(parentSeq);
                });
        },
        requestSubCommentList(parentSeq) {
            const boardSubCommentRequestInfo = {
                ...this.seqInfo,
                parentCommentSeq: parentSeq,
            };
            return actionsHelper.requestAllBoardSubCommentList(boardSubCommentRequestInfo);
        },
        commentWritePostProcess() {
            return actionsHelper.requestAllBoardCommentListWithPaging(this.seqInfo);
        },
        requestApplyLike() {
            return actionsHelper.requestApplyLikeClubBoard(this.seqInfo);
        },
        requestDeleteLike() {
            return actionsHelper.requestDeleteLikeClubBoard(this.seqInfo);
        },
    },
};
</script>

<style scoped>
.content {
    white-space: pre-wrap;
    word-break: break-all;
    width: 100%;
}
</style>
