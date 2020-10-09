<template>
    <div class="absolute-center text-center w-100">
        <div class="text-center mb-7">
            모임에 참여할 지역을 선택 해주세요. <br>
            (원하는 지역은 <b>최대 3개까지</b> 가능합니다)
        </div>
        <div v-for="priority in prioritySize"
             :key="priority"
        >
            <v-btn outlined
                   width="150"
                   height="30"
                   class="mt-5 mb-5"
                   :color="getColor(priority)"
                   @click="clickBtn(priority)"
                   v-text="getText(priority)"
            >
            </v-btn>
        </div>
    </div>
</template>

<script>
import { COLOR } from '@/utils/constant/constant.js';
import { SELECT_REGION_PATH } from '@/router/route_path_type.js';
import { gettersHelper } from '@/store/helper/gettersHelper.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';

export default {
    name: 'UserRegionPriority',
    data() {
        return {
            prioritySize: 3,
        };
    },
    computed: {
        selectedRegions: () => gettersHelper.selectedRegions(),
    },
    methods: {
        getColor(priority) {
            if (this.selectedRegions[priority]) {
                return COLOR.SELECTED;
            }
            return COLOR.NOT_SELECTED;
        },
        getText(priority) {
            if (this.selectedRegions[priority]) {
                const { name } = this.selectedRegions[priority];
                const split = name.split('/');
                if (split.length === 2 && split[0] === split[1]) {
                    return split[0];
                }
                return name;
            }
            return `우선순위 ${priority}`;
        },
        clickBtn(priority) {
            if (this.validate(priority)) {
                this.$router.push(`${SELECT_REGION_PATH}?priority=${priority}`);
            }
        },
        validate(priority) {
            if (priority > 1) {
                for (let i = 1; i < priority; i++) {
                    if (!this.selectedRegions[i]) {
                        mutationsHelper.openSnackBar(`${i}번째 지역을 먼저 선택해주세요.`);
                        return false;
                    }
                }
            }
            return true;
        },
    },
};
</script>

<style scoped>
.absolute-center {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
}
</style>
