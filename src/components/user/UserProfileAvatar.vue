<template>
    <!--      사진도 커스텀하게 선택 가능하게?        -->
    <v-avatar :size=size
    >
        <img :src="profileImg"
             alt="profile"
        >
    </v-avatar>
</template>

<script>

export default {
    name: 'UserProfileAvatar',
    props: {
        imgUrl: String,
        size: Number,
    },
    computed: {
        profileImg() {
            return this.imgUrl || require('@/images/default_profile_img.png');
        },
    },
};
</script>

<style scoped>

</style>
