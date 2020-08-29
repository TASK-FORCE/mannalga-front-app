<template>
    <div>
        <CommonHeader title="지역선택" />
        <UserLocation :priority="priority" />
    </div>
</template>

<script>
import CommonHeader from '@/components/common/CommonHeader.vue';
import UserLocation from '@/components/UserLocation.vue';

export default {
    name: 'SelectLocation',
    components: { UserLocation, CommonHeader },
    computed: {
        priority() {
            return parseInt(this.$route.query.priority, 10);
        },
    },
};
</script>

<style scoped>

</style>
