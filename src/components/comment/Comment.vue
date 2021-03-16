<template>
    <div>
        <div class="d-flex my-2 px-2">
            <div class="py-1 mr-2">
                <UserProfileAvatar
                    :size="40"
                    :name="comment.writer"
                    :appendNumber="comment.writerSeq"
                    :imgUrl="comment.imgUrl"
                />
            </div>
            <div class="w-100">
                <div>
                    <div class="comment-content-wrapper">
                        <div>
                            <div class="d-flex align-center">
                                <div class="comment-writer">{{ comment.writer }}</div>
                                <VerticalBarDivider :margin="1" />
                                <div class="comment-datetime">{{ registerTime }}</div>
                                <div
                                    v-if="isWriter"
                                    class="d-flex align-center"
                                >
                                    <VerticalBarDivider :margin="1" />
                                    <Chip
                                        v-if="isWriter"
                                        :info="{name: '내댓글', color: 'green'}"
                                        small
                                    />
                                </div>
                            </div>
                            <div class="content-divider" />
                            <div class="f-09">

                                {{ comment.content }}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    v-if="isRootComment && isFolded"
                    class="d-flex mx-2"
                >
                    <v-btn
                        v-if="hasChildComment"
                        class="f-08 mr-3 pa-0 font-weight-bold"
                        text
                        small
                        color="blue"
                        @click="unFold(false)"
                    >
                        답글 {{ comment.childCommentCnt }}개
                    </v-btn>
                    <v-btn
                        class="f-08 pa-0"
                        text
                        small
                        @click="unFold(true)"
                    >
                        답글 달기
                    </v-btn>
                </div>
                <div v-if="!isFolded">
                    <div v-if="hasChildComment">
                        <div v-if="showChildComments && hasChildComment">
                            <div
                                v-if="subCommentLandingLoading"
                                class="text-center py-2"
                            >
                                <v-progress-circular
                                    indeterminate
                                    color="red"
                                    :size="20"
                                />
                            </div>
                            <div v-else>
                                <div :class="`sub-comments-${commentSeq}`">
                                    <div
                                        v-for="(comment, index) in childComments"
                                        :key="index"
                                    >
                                        <Comment :comment="comment" />
                                    </div>
                                </div>
                                <div class="d-flex ml-2">
                                    <v-btn
                                        x-small
                                        class="mb-2"
                                        @click="showChildComments = false"
                                    >
                                        <v-icon v-text="'$chevronUp'" />
                                    </v-btn>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <v-btn
                                class="f-08 ml-2 pa-0 font-weight-bold"
                                text
                                small
                                color="blue"
                                @click="clickShowChildComments"
                            >
                                {{ childComments.length }}개 댓글 보기
                            </v-btn>
                        </div>
                    </div>
                    <div
                        class="d-flex w-100 px-2 child-comment-info-wrapper"
                        :class="!hasChildComment ? 'mt-2' : null"
                    >
                        <v-text-field
                            ref="childInput"
                            v-model="subCommentContent"
                            filled
                            rounded
                            dense
                            hide-details
                            class="pa-0"
                            :placeholder="EMPTY_COMMENT_TEXT"
                            @focus="focusChildCommentInput"
                            @focusout="focusOutChildCommentInput"
                        />
                        <div class="my-auto ml-1">
                            <v-btn
                                outlined
                                small
                                style="border-radius: 8px"
                                height="25"
                                :loading="subCommentSubmitLoading"
                                @click="submitSubComment"
                            >
                                등록
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import VerticalBarDivider from '@/components/VerticalBarDivider.vue';
import Chip from '@/components/chip/Chip.vue';
import mutationsHelper from '@/store/helper/MutationsHelper.ts';
import { MESSAGE } from '@/utils/common/constant/messages.js';
import routerHelper from '@/router/RouterHelper.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import _ from '@/utils/common/lodashWrapper.js';
import { ScrollHelper } from '@/utils/scroll.js';
import { MutationTypes } from '@/store/type/methodTypes.ts';

function getHeightAppender(offsetHeight, hideFooter) {
    const footerSize = hideFooter ? 0 : 56;
    const foldBtnSize = 28;
    const subCommentWriterSize = 27;
    const spaceSize = 6;
    return (offsetHeight * 2) + footerSize + foldBtnSize + subCommentWriterSize + spaceSize;
}

export default {
    name: 'Comment',
    components: { Chip, VerticalBarDivider, UserProfileAvatar },
    props: {
        comment: {
            type: Object,
            required: true,
        },
        requestWriteSubComment: {
            type: Function,
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            default: (content, parentSeq) => {},
        },
        requestSubCommentList: {
            type: Function,
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            default: (parentSeq) => {},
        },
    },
    data() {
        return {
            EMPTY_COMMENT_TEXT: MESSAGE.EMPTY_COMMENT_TEXT,
            childComments: [],
            subCommentSubmitLoading: false,
            subCommentLandingLoading: false,
            isFolded: true,
            showChildComments: true,
            subCommentContent: null,
        };
    },
    computed: {
        clubSeq: () => routerHelper.clubSeq(),
        albumSeq: () => routerHelper.albumSeq(),
        isWriter() {
            return !!this.comment.isWrittenByMe;
        },
        hasChildComment() {
            return this.comment.childCommentCnt > 0;
        },
        isRootComment() {
            return this.comment.depth === 1;
        },
        registerTime() {
            const time = this.comment.registerTime;
            return time ? time.substring(0, 16) : '';
        },
        commentSeq() {
            return this.comment.commentSeq;
        },
    },
    methods: {
        focusChildCommentInput() {
            this.$store.commit(MutationTypes.FOCUS_CHILD_COMMENT_INPUT);
        },
        focusOutChildCommentInput() {
            this.$store.commit(MutationTypes.FOCUS_OUT_CHILD_COMMENT_INPUT);
        },
        unFold(focusChildInput) {
            this.isFolded = false;
            this.settingChildComment(focusChildInput);
            if (focusChildInput) {
                this.focusChildInput();
            }
        },
        focusChildInput() {
            this.$nextTick(() => this.$refs.childInput.focus());
        },
        settingChildComment(focusChildInput) {
            this.subCommentLandingLoading = true;
            this.requestSubCommentList(this.commentSeq)
                .then(subComments => (this.childComments = subComments))
                .finally(() => {
                    if (this.childComments.length > 0) {
                        this.moveToLastComment(focusChildInput);
                    }
                    this.subCommentLandingLoading = false;
                });
        },
        moveToLastComment(focusChildInput) {
            this.$nextTick(() => {
                this.$nextTick(() => {
                    const subCommentWrapper = document.querySelector(`.sub-comments-${this.commentSeq}`);
                    if (!subCommentWrapper) {
                        return;
                    }
                    const subComments = subCommentWrapper.children;
                    if (_.isEmpty(subComments)) {
                        return;
                    }
                    const lastComment = subComments[subComments.length - 1];
                    const appender = getHeightAppender(lastComment.offsetHeight, focusChildInput);
                    const position = lastComment.offsetTop - window.innerHeight + appender;
                    if (position > window.scrollY) {
                        ScrollHelper.scrollTo(position);
                    }
                });
            });
        },
        submitSubComment() {
            if (!this.subCommentContent) {
                this.$store.commit(MutationTypes.OPEN_SNACK_BAR, this.EMPTY_COMMENT_TEXT);
                return;
            }
            this.subCommentSubmitLoading = true;
            this.requestWriteSubComment(this.subCommentContent, this.commentSeq)
                .then(() => {
                    mutationsHelper.countChildAlbumCommentCnt(this.commentSeq);
                    this.settingChildComment(false);
                    this.subCommentContent = null;
                    this.showChildComments = true;
                })
                .finally(() => (this.subCommentSubmitLoading = false));
        },
        clickShowChildComments() {
            this.showChildComments = true;
            this.moveToLastComment();
        },
    },
};
</script>

<style
    scoped
    lang="scss"
>
.comment-content-wrapper {
    display: flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 10px;
    background-color: #efefef;

    .comment-writer {
        font-size: 0.8rem;
        font-weight: bold;
    }

    .comment-datetime {
        font-size: 0.7rem;
    }

    .my-comment-chip {
        display: inline-block;
        margin-left: 4px;
        padding: 2px 4px;
        border: 1px solid;
        font-size: .5rem;
        font-weight: bold;
        border-radius: 8px;
    }

    .content-divider {
        height: 1px;
        background-color: #00000061;
        margin: 2px 0;
    }
}

.theme--dark {
    .comment-content-wrapper {
        display: inline-block;
        background-color: #424242;

        .content-divider {
            background-color: #bdbdbd;
        }
    }
}

.my-input {
    background-color: #424242;
    padding: 2px 8px;
    border-radius: 8px;
    width: 100%;
    font-size: 0.95rem;
    height: 28px;
}
</style>
