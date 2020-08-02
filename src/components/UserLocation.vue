<template>
    <div v-show="!isLoading">
        <div class="text-center">
            모임에 참여할 지역을 선택 해주세요. <br>
            (원하는 지역은 <b>최대 3개까지</b> 가능합니다)
        </div>
        <div class="text-center mt-3">
            <v-chip v-for="title in selectedLocationTitles"
                    :key="title"
                    small
                    class="mx-1 white--text lighten-1"
                    color="indigo"
            >
                {{title}}
            </v-chip>
        </div>
        <v-list>
            <v-list-group v-for="mainLocation in locationTemplate"
                          :key="mainLocation.title"
                          no-action
            >
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title v-text="mainLocation.title"></v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item
                    v-for="subLocation in mainLocation.subLocations"
                    :key="subLocation.id"
                    @click="toggleLocation(mainLocation.id, subLocation.id)"
                >
                    <v-list-item-action>
                        <v-checkbox
                            v-model="selectedLocations"
                            :value="{ mainLocationId: mainLocation.id, subLocationId: subLocation.id }"
                            color="primary"
                            @click="toggleLocation(mainLocation.id, subLocation.id)"
                        ></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="subLocation.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { buildSnackBarMessage } from '@/utils/commonUtils.js';
import { findIndex, isEmpty, isEqual } from '@/utils/lodashUtils.js';
import { MESSAGE } from '@/utils/constant/message.js';

export default {
    name: 'UserLocation',
    computed: {
        ...mapGetters('template', ['locationTemplate']),
        ...mapGetters('user', ['selectedLocations']),
        ...mapGetters('common', ['isLoading']),
        selectedLocationTitles() {
            return this.selectedLocations.map(({ mainLocationId, subLocationId }) => {
                const mainLocation = this.locationTemplate.find(({ id }) => id === mainLocationId);
                const subLocation = mainLocation.subLocations.find(({ id }) => id === subLocationId);
                return `${mainLocation.title} | ${subLocation.title}`;
            });
        },
    },
    created() {
        if (isEmpty(this.locationTemplate)) {
            this.requestLocationTemplate()
                .catch(() => this.$router.back()
                    .then(() => this.openSnackBar(buildSnackBarMessage(MESSAGE.SERVER_INSTABILITY))));
        }
    },
    methods: {
        ...mapActions('template', ['requestLocationTemplate']),
        ...mapMutations('common', ['openSnackBar']),
        ...mapMutations('user', ['removeSelectedLocations', 'addSelectedLocations']),
        toggleLocation(mainLocationId, subLocationId) {
            const targetLocation = { mainLocationId, subLocationId };
            const indexToBeDeleted = findIndex(this.selectedLocations, location => isEqual(location, targetLocation));
            if (indexToBeDeleted >= 0) {
                this.removeSelectedLocations(indexToBeDeleted);
                return;
            }
            if (this.selectedLocations.length >= 3) {
                this.openSnackBar(buildSnackBarMessage(MESSAGE.SELECT_LOCATION_OVER_COUNT));
                return;
            }
            this.addSelectedLocations(targetLocation);
        },
    },
};
</script>

<style scoped>

</style>
