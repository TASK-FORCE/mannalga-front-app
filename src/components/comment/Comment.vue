<template>
    <div>
        <div v-if="!myComment"
             class="d-flex my-2 px-2"
        >
            <div class="py-1 mr-2">
                <UserProfileAvatar :size="40"
                                   :name="'동명'"
                                   :appendNumber="213"
                />
            </div>
            <CommentText text="모두 수고하셨어요" />
        </div>
        <div v-else
             class="d-flex my-2 px-2"
        >
            <v-spacer />
            <CommentText class="mr-2"
                         text="모두 수고하셨어요 모두 수고하셨어요 모두 수고하셨어요 모두 수고하셨어요 모두 수고하셨어요 모두 수고하셨어요 모두 수고하셨어요"
            />
            <div class="py-1">
                <UserProfileAvatar :size="40"
                                   :name="'동명'"
                                   :appendNumber="213"
                />
            </div>
        </div>
    </div>
</template>

<script>
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import CommentText from '@/components/comment/CommentText.vue';

export default {
    name: 'Comment',
    components: { CommentText, UserProfileAvatar },
    props: {
        myComment: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style scoped
       lang="scss"
>
</style>
