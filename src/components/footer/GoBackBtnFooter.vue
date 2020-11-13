<template>
    <v-footer fixed
              app
              class="pa-0"
    >
        <v-bottom-navigation class="text-center pa-0"
                             grow
                             horizontal
        >
            <v-btn v-show="!safeHideBackBtn"
                   @click="$router.back()"
            >
                <v-icon x-large>mdi-arrow-left-bold</v-icon>
            </v-btn>
            <v-btn v-show="!safeHideGoBtn"
                   @click="$emit('clickGoBtn')"
            >
                <v-icon x-large>mdi-arrow-right-bold</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </v-footer>
</template>

<script>
export default {
    name: 'GoBackBtnFooter',
    props: {
        hideBackBtn: Boolean,
        hideGoBtn: Boolean,
    },
    computed: {
        safeHideBackBtn() {
            return !!this.hideBackBtn;
        },
        safeHideGoBtn() {
            return !!this.hideGoBtn;
        },
    },
};
</script>

<style scoped>

</style>
