<template>
    <div>
        <UserLocation />
        <GoBackBtnFooter @clickGoBtn="clickGoBtn" />
    </div>
</template>

<script>
import GoBackBtnFooter from '@/components/GoBackBtnFooter.vue';
import { mapGetters, mapMutations } from 'vuex';
import UserLocation from '@/components/UserLocation.vue';
import { buildSnackBarMessage, isEmpty } from '@/utils/commonUtils.js';
import { SELECT_LOCATION_REQUIRE } from '@/utils/constant/message.js';

export default {
    name: 'RegisterLocation',
    components: { UserLocation, GoBackBtnFooter },
    data() {
        return {
            selectedTemplateIds: [],
            test: false,
        };
    },
    computed: {
        ...mapGetters('user', ['profile', 'selectedLocations']),
    },
    created() {
        if (isEmpty(this.profile)) {
            this.$router.push('/register/profile');
        }
    },
    methods: {
        ...mapMutations('common', ['openSnackBar']),
        clickGoBtn() {
            if (!isEmpty(this.selectedLocations)) {
                this.$router.push('/register/interest');
                return;
            }
            this.openSnackBar(buildSnackBarMessage(SELECT_LOCATION_REQUIRE));
        },
    },
};
</script>

<style scoped>

</style>
