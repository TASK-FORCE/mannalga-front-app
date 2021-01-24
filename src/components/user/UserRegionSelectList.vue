<template>
    <div class="absolute-center text-center w-100">
        <div class="text-center mb-7">
            모임에 참여할 지역을 선택 해주세요. <br>
            (원하는 지역은 <b>최대 3개</b> 선택 가능합니다)
        </div>
        <div v-for="priority in prioritySize"
             :key="priority"
             class="my-7"
        >
            <div v-if="isSelected(priority)">
                <v-btn
                    class="selected-region-chip justify-start"
                    color="#2196f3"
                    label
                    outlined
                    width="170"
                    height="30"
                    @click.stop="clickBtn(priority)"
                >
                    <span class="ml-3">{{ getText(priority) }}</span>
                    <v-btn class="close"
                           fab
                           x-small
                           outlined
                           color="#2196f3"
                           width="20"
                           height="20"
                           @click.stop="remove(priority)"
                    >
                        <v-icon v-text="'$close'" />
                    </v-btn>
                </v-btn>
            </div>
            <v-btn v-else
                   outlined
                   width="170"
                   height="30"
                   @click="clickBtn(priority)"
                   v-text="`${priority}번째 지역`"
            />
        </div>
    </div>
</template>

<script>
import gettersHelper from '@/store/helper/GettersHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import { PATH } from '@/router/route_path_type.js';

export default {
    name: 'UserRegionSelectList',
    data() {
        return {
            prioritySize: 3,
        };
    },
    computed: {
        selectedRegions: () => gettersHelper.selectedRegions(),
    },
    methods: {
        getText(priority) {
            const { name } = this.selectedRegions[priority];
            const split = name.split('/');
            if (split.length === 2 && split[0] === split[1]) {
                return split[0];
            }
            return name;
        },
        isSelected(priority) {
            return !!this.selectedRegions[priority];
        },
        clickBtn(priority) {
            if (this.validate(priority)) {
                this.$router.push(`${PATH.SELECT_REGION}?priority=${priority}`);
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
        remove(priority) {
            mutationsHelper.removeSelectedRegions(priority);
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

.close {
    position: absolute;
    right: -7px;
}
</style>
