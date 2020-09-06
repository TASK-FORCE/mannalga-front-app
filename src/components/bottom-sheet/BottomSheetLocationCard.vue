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
                <v-list-item-group>
                    <template v-for="state in states">
                        <v-list-item :key="state.seq"
                                     @click="selectState(state)"
                        >
                            {{ state.name }}
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
    name: 'BottomSheetLocationCard',
    props: ['rootStates'],
    data() {
        return {
            showRootStates: true,
            title: '지역 선택',
            states: [],
        };
    },
    mounted() {
        this.states = this.rootStates;
    },
    methods: {
        selectState(state) {
            this.showRootStates ? this.selectRootState(state) : this.selectSubState(state);
        },
        selectRootState(state) {
            this.title = state.name;
            const rootState = { ...state };
            rootState.name += ' 전체';
            this.states = [rootState, ...state.subStates];
            this.showRootStates = false;
        },
        selectSubState(state) {
            this.$emit('selectSubState', state);
            setTimeout(() => {
                this.showRootStates = true;
                this.title = '지역 선택';
                this.states = this.rootStates;
            }, 100);
        },
    },
};
</script>

<style scoped>

</style>
