<template>
    <v-container class="py-0">
        <MainHeader />
        <AppMainClubTabs />
    </v-container>
</template>

<script>
import MainHeader from '@/components/AppMainHeader.vue';
import AppMainClubTabs from '@/components/AppMainClubTabs.vue';

export default {
    name: 'AppMain',
    components: { AppMainClubTabs, MainHeader },
};
</script>

<style scoped>

</style>
