<template>
    <div class="d-flex px-3 align-center">
        <UserProfileAvatar :size="40"
                           :imgUrl="imageUrl"
        />
        <div class="ml-3">
            <div class="name">{{ name }}</div>
            <div class="description">{{ description }}</div>
        </div>
        <v-spacer />
        <slot name="tag" />
    </div>
</template>

<script>
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';

export default {
    name: 'SimpleUserProfile',
    components: { UserProfileAvatar },
    props: {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: '',
        },
        imageUrl: {
            type: String,
            default: '',
        },
    },
};
</script>

<style scoped>
.name {
    font-size: 0.95rem;
    font-weight: 500;
}

.description {
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.7);
}
</style>
