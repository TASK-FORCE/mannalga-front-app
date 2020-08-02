<template>
    <div class="mx-3">
        <div class="text-center">
            관심사를 선택 해주세요. <br>
            (원하는 관심사는 최대 5개까지 가능합니다)
        </div>
        <div v-for="interestCategory in interestCategories"
             :key="interestCategory.mainCategory"
             class="mt-3"
        >
            <v-icon>mdi-music-circle-outline</v-icon>
            {{interestCategory.mainCategory}}
            <br>
            <v-btn v-for="(subCategory, index) in interestCategory.subCategories"
                   :key="subCategory"
                   :class="include(index, interestCategory.id)"
                   outlined
                   class="ma-1"
                   small
                   @click="toggleInterest(index, interestCategory.id)"
            >
                {{subCategory}}
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserInterest',
    data() {
        return {
            selectedIds: [],
            interestCategories: [
                { id: 1, mainCategory: '아웃도어/여행', subCategories: getSubInterestCategory() },
                { id: 2, mainCategory: '운동/스포츠', subCategories: getSubInterestCategory() },
                { id: 3, mainCategory: '인문학/책/글', subCategories: getSubInterestCategory() },
                { id: 4, mainCategory: '외국/언어', subCategories: getSubInterestCategory() },
                { id: 5, mainCategory: '문화/공연/축제', subCategories: getSubInterestCategory() },
            ],
        };
    },
    methods: {
        toggleInterest(index, mainId) {
            const selectedId = makeId(index, mainId);
            const include = this.selectedIds.includes(selectedId);
            if (include) {
                this.selectedIds = this.selectedIds.filter(id => id !== selectedId);
            } else {
                this.selectedIds.unshift(selectedId);
            }

            this.selectedIds = this.selectedIds.filter((_, _index) => _index < 5);
        },
        include(index, mainId) {
            const selectedId = makeId(index, mainId);
            const include = this.selectedIds.includes(selectedId);
            return include ? 'active' : '';
        },
    },
};

function makeId(index, mainId) {
    return index + (getSubInterestCategory().length * mainId);
}

function getSubInterestCategory() {
    return ['자전거', '배드민턴', '볼링', '독서', '인문학', '노래/보컬', '클래식', '재즈', '보육원'];
}
</script>

<style scoped>
.active {
    background-color: green;
    color: white;
}
</style>
