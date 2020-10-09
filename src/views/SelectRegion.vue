<template>
    <div>
        <CommonHeader title="지역선택" />
        <UserRegion :priority="priority" />
    </div>
</template>

<script>
import CommonHeader from '@/components/common/CommonHeader.vue';
import UserRegion from '@/components/user/UserRegion.vue';

export default {
    name: 'SelectRegion',
    components: { UserRegion, CommonHeader },
    computed: {
        priority() {
            return parseInt(this.$route.query.priority, 10);
        },
    },
};
</script>

<style scoped>

</style>
