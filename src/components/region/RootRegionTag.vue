<template>
    <div class="d-inline-block">
        <span :style="getStyle(getColor)"
              class="root-region-tag"
        >
            {{ rootRegion.name }}
        </span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

const regionStore = {
    서울특별시: { name: '서울시', color: '#f50e22' },
    대구광역시: { name: '대구시', color: '#4caf50' },
    인천광역시: { name: '인천시', color: '#3f51b5' },
    대전광역시: { name: '대구시', color: '#9c27b0' },
    울산광역시: { name: '울산시', color: '#e91e63' },
    세종특별자치시: { name: '세종시', color: '#009688' },
    강원도: { name: '강원도', color: '#795548' },
    경기도: { name: '경기도', color: '#ff9800' },
    충청북도: { name: '충청도', color: '#2196f3' },
    충청남도: { name: '충청도', color: '#2196f3' },
    광주광역시: { name: '광주시', color: '#673ab7' },
    전라북도: { name: '전라도', color: '#673ab7' },
    전라남도: { name: '전라도', color: '#673ab7' },
    부산광역시: { name: '부산시', color: '#2196f3' },
    경상북도: { name: '경상도', color: '#2196f3' },
    경상남도: { name: '경상도', color: '#2196f3' },
    제주특별자치도: { name: '제주도', color: '#1900dee3' },
};

export default Vue.extend({
    name: 'RootRegionTag',
    props: {
        rootRegionName: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: false,
        },
    },
    computed: {
        rootRegion() {
            const rootRegion = regionStore[this.rootRegionName];
            return rootRegion || { name: this.rootRegionName, color: 'red' };
        },
        getColor() {
            return this.color || this.rootRegion.color;
        },
    },
    methods: {
        getStyle(color) {
            return {
                color,
                border: `1px solid ${color}`,
            };
        },
    },
});
</script>

<style scoped>
.root-region-tag {
    padding: 4px;
    font-weight: bold;
    border-radius: 5px;
    font-size: 0.6rem;
    vertical-align: middle;
}
</style>
