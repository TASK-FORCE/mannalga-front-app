<template>
    <v-card>
        <v-card-title class="pa-3"
                      v-text="title"
        />
        <v-divider />
        <v-card-text style="height: 300px;"
                     class="pa-0"
        >
            <v-list class="pt-0">
                <v-list-item-group v-if="showRootItemGroup">
                    <template v-for="interest in rootInterests">
                        <v-list-item :key="interest.seq"
                                     @click="selectRootInterest(interest)"
                        >
                            {{ interest.name }}
                        </v-list-item>
                    </template>
                </v-list-item-group>
                <v-list-item-group v-else>
                    <template v-for="interest in subInterestsBySelectedRootInterest">
                        <v-list-item :key="interest.seq"
                                     @click="selectSearchInterest(interest)"
                        >
                            {{ interest.name }}
                        </v-list-item>
                    </template>
                </v-list-item-group>
            </v-list>
        </v-card-text>
        <v-divider />
    </v-card>
</template>

<script>
export default {
    name: 'BottomSheetInterestCard',
    props: ['rootInterests'],
    data() {
        return {
            showRootItemGroup: true,
            selectedRootInterest: null,
            title: '관심사 선택',
        };
    },
    computed: {
        subInterestsBySelectedRootInterest() {
            const simpleRootInterest = {
                seq: this.selectedRootInterest.seq,
                name: this.selectedRootInterest.name,
            };
            return [simpleRootInterest, ...this.selectedRootInterest.interestList];
        },
    },
    methods: {
        selectRootInterest(rootInterest) {
            this.selectedRootInterest = rootInterest;
            this.title = rootInterest.name;
            this.showRootItemGroup = false;
        },
        selectSearchInterest(interest) {
            this.$emit('selectSearchInterest', interest);
            setTimeout(() => {
                this.showRootItemGroup = true;
                this.title = '관심사 선택';
            }, 100);
        },
    },
};
</script>

<style scoped>

</style>
