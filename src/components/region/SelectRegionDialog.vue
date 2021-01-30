<template>
    <v-dialog :value="value"
              persistent
    >
        <v-card class="pa-3">
            <div class="text-center font-weight-bold mb-2"
                 style="font-size: 1.35rem"
            >
                지역 선택
            </div>
            <UserRegionSelectList :selectedRegions="selectedRegions"
                                  @selectRegion="selectRegion"
            >
                <template #header>
                    <div class="text-center mb-7">
                        모임 지역을 선택 해주세요. <br>
                        (원하는 지역은 <b>최대 3개</b> 선택 가능합니다)
                    </div>
                </template>
                <template #footer>
                    <div class="text-center pa-3">
                        <v-btn
                            color="primary"
                            outlined
                            width="100"
                            @click="cancel"
                        >
                            취소
                        </v-btn>
                        <v-btn
                            class="ml-3"
                            color="primary"
                            outlined
                            width="100"
                            @click="submit"
                        >
                            등록
                        </v-btn>
                    </div>
                </template>
            </UserRegionSelectList>
        </v-card>
    </v-dialog>
</template>

<script>
import UserRegionSelectList from '@/components/user/UserRegionSelectList.vue';

export default {
    name: 'SelectRegionDialog',
    components: { UserRegionSelectList },
    props: {
        value: {
            type: Boolean,
            required: true,
        },
        regions: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            selectedRegions: null,
        };
    },
    mounted() {
        this.selectedRegions = { ...this.regions };
    },
    methods: {
        selectRegion({ priority, region }) {
            this.$set(this.selectedRegions, priority, region);
        },
        submit() {
            this.$emit('selectRegions', this.selectedRegions);
            this.close();
        },
        cancel() {
            this.selectedRegions = {};
            this.close();
        },
        close() {
            this.$emit('input', false);
        },
    },
};
</script>

<style scoped>

</style>
