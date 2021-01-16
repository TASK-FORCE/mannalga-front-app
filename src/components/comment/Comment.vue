<template>
    <div class="d-flex my-2 px-2">
        <div class="py-1 mr-2">
            <UserProfileAvatar :size="40"
                               :name="comment.writer"
                               :appendNumber="comment.writerSeq"
                               :imgUrl="comment.imgUrl"
            />
        </div>
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
</template>

<script>
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import VerticalBarDivider from '@/components/VerticalBarDivider.vue';
import Chip from '@/components/chip/Chip.vue';

export default {
    name: 'Comment',
    components: { Chip, VerticalBarDivider, UserProfileAvatar },
    props: {
        comment: {
            type: Object,
            required: true,
        },
    },
    computed: {
        isWriter() {
            return !!this.comment.isWrittenByMe;
        },
        registerTime() {
            const time = this.comment.registerTime;
            return time ? time.substring(0, 16) : '';
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
        background-color: #424242;

        .content-divider {
            background-color: #bdbdbd;
        }
    }
}
</style>
