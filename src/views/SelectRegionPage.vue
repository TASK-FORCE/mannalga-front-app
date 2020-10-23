<template>
    <div>
        <CommonHeader title="지역선택"
                      @clickBack="$router.back()"
        />
        <UserRegion :priority="priority" />
    </div>
</template>

<script>
import CommonHeader from '@/components/ui/header/CommonHeader.vue';
import UserRegion from '@/components/user/UserRegion.vue';

export default {
    name: 'SelectRegionPage',
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
