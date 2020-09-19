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
                    <template v-for="name in ['최신순', '인기순', '과거순']">
                        <v-list-item :key="name"
                                     @click="selectSortOption(name)"
                                     v-text="name"
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
    name: 'BottomSheetSortCard',
    data() {
        return {
            title: '정렬',
        };
    },
    methods: {
        selectSortOption(name) {
            this.$emit('selectSortOption', { name });
        },
    },
};
</script>

<style scoped>

</style>
