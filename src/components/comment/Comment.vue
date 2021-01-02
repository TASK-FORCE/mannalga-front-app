<template>
    <div class="d-flex my-2 px-2">
        <div class="py-1 mr-2">
            <UserProfileAvatar :size="40"
                               :name="'동명'"
                               :appendNumber="213"
            />
        </div>
        <CommentText text="모두 수고하셨어요" />
    </div>
</template>

<script>
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import CommentText from '@/components/comment/CommentText.vue';

export default {
    name: 'Comment',
    components: { CommentText, UserProfileAvatar },
    props: {
        isWriter: {
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
