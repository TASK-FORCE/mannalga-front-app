<template>
    <BoardTemplate
        :boardDto="boardDto"
        :commentContext="commentContext"
        :likeContext="likeContext"
    >
        <template #content>
            <div class="pa-3">
                <ImageWithDialog class="elevation-2"
                                 :imgUrl="album.imgUrl"
                />
            </div>
        </template>
    </BoardTemplate>
</template>

<script lang="ts">
import ImageWithDialog from '@/components/image/ImageWithDialog.vue';
import gettersHelper from '@/store/helper/GettersHelper.js';
import actionsHelper from '@/store/helper/ActionsHelper.ts';
import routerHelper from '@/router/RouterHelper.ts';
import mutationsHelper from '@/store/helper/MutationsHelper.ts';
import BoardTemplate from '@/components/BoardTemplate.vue';
import Vue from 'vue';

export default Vue.extend({
    name: 'ClubAlbumPostBody',
    components: {
        BoardTemplate,
        ImageWithDialog,
    },
    computed: {
        album: () => gettersHelper.album(),
        seqInfo() {
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
                commentList: gettersHelper.albumCommentList(),
                commentPage: gettersHelper.albumCommentPage(),
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
        actionsHelper.requestAlbum(this.seqInfo)
            .catch(() => this.$router.back());
    },
    beforeDestroy() {
        mutationsHelper.initAlbumCommentList();
    },
    methods: {
        fetchFirstPage() {
            return actionsHelper.requestFirstAlbumCommentList(this.seqInfo);
        },
        fetchNextPage() {
            return actionsHelper.requestNextAlbumCommentList(this.seqInfo);
        },
        requestWriteComment(content) {
            const albumCommentWriteInfo = {
                ...this.seqInfo,
                albumCommentWriteDto: { content },
            };
            return actionsHelper.requestAlbumCommentWrite(albumCommentWriteInfo)
                .then(() => mutationsHelper.countAlbumCommentCnt(this.album.albumSeq));
        },
        requestWriteSubComment(content, parentSeq) {
            const albumCommentWriteInfo = {
                ...this.seqInfo,
                parentCommentSeq: parentSeq,
                albumCommentWriteDto: { content },
            };
            return actionsHelper.requestAlbumCommentWrite(albumCommentWriteInfo)
                .then(() => {
                    mutationsHelper.countChildAlbumCommentCnt(parentSeq);
                    mutationsHelper.countAlbumCommentCnt(this.album.albumSeq);
                });
        },
        requestSubCommentList(parentSeq) {
            const albumSubCommentRequestInfo = {
                ...this.seqInfo,
                parentCommentSeq: parentSeq,
            };
            return actionsHelper.requestAllAlbumSubCommentList(albumSubCommentRequestInfo);
        },
        commentWritePostProcess() {
            return actionsHelper.requestAllAlbumCommentListWithPaging(this.seqInfo);
        },
        requestApplyLike() {
            return actionsHelper.requestApplyLikeClubAlbum(this.seqInfo);
        },
        requestDeleteLike() {
            return actionsHelper.requestDeleteLikeClubAlbum(this.seqInfo);
        },
    },
});
</script>
