<template>
    <div>
        <CommonHeader title="지역선택"
                      @click="$router.back()"
        />
        <RegionSelectPageBody :priority="priority" />
    </div>
</template>

<script>
import CommonHeader from '@/components/header/CommonHeader.vue';
import RegionSelectPageBody from '@/views/regionSelect/RegionSelectPageBody.vue';

export default {
    name: 'RegionSelectPage',
    components: { RegionSelectPageBody, CommonHeader },
    computed: {
        priority() {
            return parseInt(this.$route.query.priority, 10);
        },
    },
};
</script>

<style scoped>

</style>
