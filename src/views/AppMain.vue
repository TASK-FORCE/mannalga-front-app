<template>
    <v-container class="pt-0">
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
