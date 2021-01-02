<template>
    <div>
        <div class="d-flex px-2 mt-3">
            <UserProfileAvatar :size="40"
                               :imgUrl="writer.imgUrl"
                               :name="writer.name"
                               :appendNumber="writer.writerUserSeq"
            />
            <div class="ml-2">
                <div class="album-title">{{ album.title }}</div>
                <div class="f-09">
                    {{ writer.name }}
                </div>
            </div>
        </div>
        <div class="pa-3">
            <ImageWithDialog class="elevation-2"
                             :imgUrl="album.imgUrl"
            />
        </div>
        <MiddleDivider :height="2" />
        <div class="d-flex pa-3">
            <v-btn outlined
                   small
            >
                <v-icon left
                        small
                >
                    mdi-heart
                </v-icon>
                <span class="f-09">좋아요</span>
            </v-btn>
            <v-spacer />
            <div class="d-lg-flex my-auto">
                <div>
                    <span class="like-count-text">1명</span>이 사진을 좋아합니다.
                </div>
            </div>
        </div>
        <MiddleDivider :height="2" />

        <div class="px-1 h-100">
            <InfiniteScrollTemplate name="album-comment"
                                    :firstPageCallback="fetchFirstPage"
                                    :nextPageCallback="fetchNextPage"
                                    :pageElements="albumCommentList"
                                    :pageInfo="albumCommentPage"
                                    :withListGroup="false"
            >
                <template v-slot:list-main>
                    <div v-for="(comment, index) in albumCommentList"
                         :key="index"
                    >
                        <Comment :comment="comment" />
                    </div>
                </template>
            </InfiniteScrollTemplate>
        </div>
        <CommentWriteFooter :postProcessor="callbackAfterCommentWrite" />
    </div>
</template>

<script>
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import MiddleDivider from '@/components/MiddleDivider.vue';
import ImageWithDialog from '@/components/image/ImageWithDialog.vue';
import gettersHelper from '@/store/helper/GettersHelper.js';
import Comment from '@/components/comment/Comment.vue';
import CommentWriteFooter from '@/components/comment/CommentWriteFooter.vue';
import InfiniteScrollTemplate from '@/components/InfiniteScrollTemplate.vue';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import routerHelper from '@/router/RouterHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import ScrollHelper from '@/utils/scroll/ScrollHelper.js';

export default {
    name: 'ClubAlbumPostBody',
    components: {
        InfiniteScrollTemplate,
        CommentWriteFooter,
        Comment,
        ImageWithDialog,
        MiddleDivider,
        UserProfileAvatar,
    },
    data() {
        return {
            comments: [false, true, false, true, false, false],
        };
    },
    computed: {
        album: () => gettersHelper.album(),
        albumCommentList: () => gettersHelper.albumCommentList(),
        albumCommentPage: () => gettersHelper.albumCommentPage(),
        writer() {
            console.log(this.album);
            return this.album.writer;
        },
        requestDto() {
            return {
                clubSeq: routerHelper.clubSeq(),
                albumSeq: routerHelper.albumSeq(),
            };
        },
    },
    mounted() {
        if (!this.album.imgUrl) {
            this.$router.back();
        }
    },
    beforeDestroy() {
        mutationsHelper.initAlbumCommentList();
    },
    methods: {
        fetchFirstPage() {
            return actionsHelper.requestFirstAlbumCommentList(this.requestDto);
        },
        fetchNextPage() {
            return actionsHelper.requestNextAlbumCommentList(this.requestDto);
        },
        callbackAfterCommentWrite() {
            actionsHelper.requestAllAlbumCommentListWithPaging(this.requestDto)
                .then(() => this.scrollToBottomWhenLastPage());
        },
        scrollToBottomWhenLastPage() {
            if (this.albumCommentPage.isLastPage) {
                ScrollHelper.scrollToBottom();
                return;
            }
            setTimeout(this.scrollToBottomWhenLastPage, 100);
        },
    },
};
</script>

<style scoped>
.album-title {
    font-weight: 700;
    font-size: 1.05rem;
}

.like-count-text {
    font-weight: bold;
}

</style>
