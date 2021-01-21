<template>
    <div>
        <div class="d-flex my-2 px-2">
            <div class="py-1 mr-2">
                <UserProfileAvatar :size="40"
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
                                <div v-if="isWriter"
                                     class="d-flex align-center"
                                >
                                    <VerticalBarDivider :margin="1" />
                                    <Chip v-if="isWriter"
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
                <div v-if="isRootComment && isFolded"
                     class="d-flex mx-2"
                >
                    <v-btn v-if="hasChildComment"
                           class="f-08 mr-3 pa-0 font-weight-bold"
                           text
                           small
                           color="blue"
                           @click="unFold(false)"
                    >
                        답글 3개
                    </v-btn>
                    <v-btn class="f-08 pa-0"
                           text
                           small
                           @click="unFold(true)"
                    >
                        답글 달기
                    </v-btn>
                </div>
                <div v-if="!isFolded">
                    <div>
                        <div v-for="(comment, index) in childComments"
                             :key="index"
                        >
                            <Comment :comment="comment" />
                        </div>
                        <div>
                            <v-btn> 접기 </v-btn>
                        </div>
                    </div>
                    <div class="d-flex w-100 px-2 pt-2 child-comment-info-wrapper">
                        <v-text-field ref="childInput"
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
                            <v-btn outlined
                                   small
                                   style="border-radius: 8px"
                                   height="25"
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
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import { MESSAGE } from '@/utils/common/constant/messages.js';

export default {
    name: 'Comment',
    components: { Chip, VerticalBarDivider, UserProfileAvatar },
    props: {
        comment: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            EMPTY_COMMENT_TEXT: MESSAGE.EMPTY_COMMENT_TEXT,
            childComments: [],
            isFolded: true,
        };
    },
    computed: {
        isWriter() {
            return !!this.comment.isWrittenByMe;
        },
        hasChildComment() {
            return this.comment.childCommentCnt >= 0;
        },
        isRootComment() {
            return this.comment.depth === 1;
        },
        registerTime() {
            const time = this.comment.registerTime;
            return time ? time.substring(0, 16) : '';
        },
    },
    methods: {
        focusChildCommentInput() {
            mutationsHelper.focusChildCommentInput();
        },
        focusOutChildCommentInput() {
            mutationsHelper.focusOutChildCommentInput();
        },
        unFold(focusChildInput) {
            this.isFolded = false;
            this.settingChildComment();
            if (focusChildInput) {
                this.focusChildInput();
            }
        },
        focusChildInput() {
            const { childInput } = this.$refs;
            if (childInput) {
                childInput.focus();
            } else {
                setTimeout(this.focusChildInput, 100);
            }
        },
        settingChildComment() {
            if (this.childComments.length === 0) {
                this.childComments = [
                    {
                        writer: '동명',
                        writerSeq: 7,
                        writeClubUserSeq: 6328,
                        registerTime: '2021-01-02 21:57:56',
                        content: 'Hello World Hello World',
                        imgUrl: '',
                        isWrittenByMe: false,
                        depth: 2,
                        childCommentCnt: 0,
                        onlyDirectChildCnt: false,
                    },
                    {
                        writer: '동명',
                        writerSeq: 7,
                        writeClubUserSeq: 6328,
                        registerTime: '2021-01-02 21:57:57',
                        content: 'Hello World Hello World',
                        imgUrl: '',
                        isWrittenByMe: false,
                        depth: 2,
                        childCommentCnt: 0,
                        onlyDirectChildCnt: false,
                    },
                    {
                        writer: '동명',
                        writerSeq: 7,
                        writeClubUserSeq: 6328,
                        registerTime: '2021-01-02 21:57:57',
                        content: 'Hello World Hello World',
                        imgUrl: '',
                        isWrittenByMe: false,
                        depth: 2,
                        childCommentCnt: 0,
                        onlyDirectChildCnt: false,
                    },
                    {
                        writer: '동명',
                        writerSeq: 7,
                        writeClubUserSeq: 6328,
                        registerTime: '2021-01-02 21:57:58',
                        content: 'Hello World Hello World',
                        imgUrl: '',
                        isWrittenByMe: false,
                        depth: 2,
                        childCommentCnt: 0,
                        onlyDirectChildCnt: false,
                    },
                    {
                        writer: '동명',
                        writerSeq: 7,
                        writeClubUserSeq: 6328,
                        registerTime: '2021-01-02 21:57:59',
                        content: 'Hello World Hello World',
                        imgUrl: '',
                        isWrittenByMe: false,
                        depth: 2,
                        childCommentCnt: 0,
                        onlyDirectChildCnt: false,
                    },
                ];
            }
        },
    },
};
</script>

<style scoped
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
