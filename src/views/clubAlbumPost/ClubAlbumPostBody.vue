<template>
    <BoardTemplate
        :boardDto="boardDto"
        :commentContext="commentContext"
        :likeContext="likeContext"
    >
        <template #content>
            <div class="pa-3">
                <ImageWithDialog
                    class="elevation-2"
                    :imgUrl="album.imgUrl"
                />
            </div>
        </template>
    </BoardTemplate>
</template>

<script lang="ts">
import ImageWithDialog from '@/components/image/ImageWithDialog.vue';
import routerHelper from '@/router/RouterHelper.ts';
import BoardTemplate from '@/components/BoardTemplate.vue';
import Vue from 'vue';
import { AlbumMutationTypes } from '@/store/type/mutationTypes';
import { AlbumActionTypes } from '@/store/type/actionTypes';
import { Album, AlbumCommentWriteRequest, AlbumSeqContext, AlbumSubCommentRequest } from '@/interfaces/album';

export default Vue.extend({
    name: 'ClubAlbumPostBody',
    components: {
        BoardTemplate,
        ImageWithDialog,
    },
    computed: {
        album(): Album {
            return this.$store.state.album.album;
        },
        seqContext(): AlbumSeqContext {
            return {
                clubSeq: routerHelper.clubSeq(),
                albumSeq: routerHelper.albumSeq(),
            };
        },
        boardDto() {
            return {
                writerName: this.album.writer.name,
                writerSeq: this.album.writer.writerUserSeq,
                writerImage: this.album.writer.imgUrl,
                title: this.album.title,
                isLiked: this.album.isLiked,
                likeCnt: this.album.likeCnt,
            };
        },
        commentContext() {
            return {
                commentList: this.$store.state.album.albumCommentList,
                commentPage: this.$store.state.album.albumCommentPage,
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
        this.$store.dispatch(AlbumActionTypes.REQUEST_ALBUM, this.seqContext)
            .catch(() => this.$router.back());
    },
    beforeDestroy() {
        this.$store.commit(AlbumMutationTypes.INIT_ALBUM_COMMENT_LIST);
    },
    methods: {
        fetchFirstPage() {
            return this.$store.dispatch(AlbumActionTypes.REQUEST_FIRST_ALBUM_COMMENT_LIST, this.seqContext);
        },
        fetchNextPage() {
            return this.$store.dispatch(AlbumActionTypes.REQUEST_NEXT_ALBUM_COMMENT_LIST, this.seqContext);
        },
        requestWriteComment(content) {
            const albumCommentWriteRequest: AlbumCommentWriteRequest = {
                albumSeqContext: this.seqContext,
                content,
            };
            return this.$store.dispatch(AlbumActionTypes.REQUEST_ALBUM_COMMENT_WRITE, albumCommentWriteRequest)
                .then(() => this.$store.commit(AlbumMutationTypes.COUNT_ALBUM_COMMENT_CNT, this.album.albumSeq));
        },
        requestWriteSubComment(content, parentSeq) {
            const albumCommentWriteRequest: AlbumCommentWriteRequest = {
                albumSeqContext: this.seqContext,
                parentCommentSeq: parentSeq,
                content
            };
            return this.$store.dispatch(AlbumActionTypes.REQUEST_ALBUM_COMMENT_WRITE, albumCommentWriteRequest)
                .then(() => {
                    this.$store.commit(AlbumMutationTypes.COUNT_CHILD_COMMENT_CNT, parentSeq);
                    this.$store.commit(AlbumMutationTypes.COUNT_ALBUM_COMMENT_CNT, this.album.albumSeq)
                });
        },
        requestSubCommentList(parentSeq) {
            const albumSubCommentRequest: AlbumSubCommentRequest = {
                ...this.seqContext,
                parentCommentSeq: parentSeq,
            };
            return this.$store.dispatch(AlbumActionTypes.REQUEST_ALL_ALBUM_SUB_COMMENT_LIST, albumSubCommentRequest);
        },
        commentWritePostProcess() {
            return this.$store.dispatch(AlbumActionTypes.REQUEST_ALL_ALBUM_COMMENT_LIST_WITH_PAGING, this.seqContext);
        },
        requestApplyLike() {
            return this.$store.dispatch(AlbumActionTypes.REQUEST_APPLY_LIKE_CLUB_ALBUM, this.seqContext);
        },
        requestDeleteLike() {
            return this.$store.dispatch(AlbumActionTypes.REQUEST_DELETE_LIKE_CLUB_ALBUM, this.seqContext);
        },
    },
});
</script>
