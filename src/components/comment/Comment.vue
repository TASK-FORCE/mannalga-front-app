<template>
    <div class="d-flex my-2 px-2">
        <div class="py-1 mr-2">
            <UserProfileAvatar :size="40"
                               :name="comment.writer"
                               :appendNumber="comment.writeClubUserSeq"
                               :imgUrl="comment.imgUrl"
            />
        </div>
        <div class="content-wrapper">
            <div class="my-auto">
                <div class="f-08">
                    <span class="font-weight-bold">{{ comment.writer }}</span>
                    <span class="ml-2">{{ registerTime }}</span>
                    <div v-if="isWriter"
                          class="content-my-comment"
                    >내댓글</div>
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

export default {
    name: 'Comment',
    components: { UserProfileAvatar },
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
.content-wrapper {
    padding: 4px 12px;
    border-radius: 10px;
    display: flex;
    background-color: #efefef;

    .content-divider {
        height: 1px;
        background-color: #00000061;
        margin: 2px 0;
    }

    .content-my-comment {
        display: inline-block;
        margin-left: 4px;
        padding: 2px 4px;
        border: 1px solid;
        font-size: .5rem;
        font-weight: bold;
        border-radius: 8px;
    }
}

.theme--dark {
    .content-wrapper {
        background-color: #424242;

        .content-divider {
            background-color: #bdbdbd;
        }
    }
}
</style>
