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
                    <template v-for="state in rootStates">
                        <v-list-item :key="state.seq"
                                     @click="selectRootState(state)"
                                     v-text="state.name"
                        />
                    </template>
                </v-list-item-group>
                <v-list-item-group v-else>
                    <template v-for="state in subStatesBySelectedRootSeq">
                        <v-list-item :key="state.seq"
                                     @click="selectSearchState(state)"
                                     v-text="state.name"
                        />
                    </template>
                </v-list-item-group>
            </v-list>
        </v-card-text>
        <v-divider />
    </v-card>
</template>

<script>

export default {
    name: 'SearchFilterLocationCard',
    props: ['rootStates'],
    data() {
        return {
            showRootItemGroup: true,
            selectedRootState: null,
            title: '지역 선택',
        };
    },
    computed: {
        subStatesBySelectedRootSeq() {
            const simpleRootState = {
                seq: this.selectedRootState.seq,
                name: `${this.selectedRootState.name} 전체`,
            };
            return [simpleRootState, ...this.selectedRootState.subStates];
        },
    },
    methods: {
        selectRootState(rootState) {
            this.selectedRootState = rootState;
            this.title = rootState.name;
            this.showRootItemGroup = false;
        },
        selectSearchState(state) {
            this.$emit('selectSearchLocation', state);
            setTimeout(() => {
                this.showRootItemGroup = true;
                this.title = '지역 선택';
            }, 100);
        },
    },
};
</script>

<style scoped>

</style>
