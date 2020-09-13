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
    props: {
        rootStates: Array,
    },
    data() {
        return {
            showRootStates: true,
            title: '지역 선택',
            states: this.rootStates,
        };
    },
    watch: {
        rootStates() {
            this.states = this.rootStates;
        },
    },
    methods: {
        // TODO state -> location으로 변경하자. 백엔드에선 state로 주지만 state는 상태라는 의미도 있어서 명시적이지 못하다.
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
