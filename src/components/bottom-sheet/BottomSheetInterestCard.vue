<template>
    <v-card>
        <div class="title-wrapper">
            <v-btn
                v-show="!showRootInterests"
                icon
                class="title-back-btn"
                @click="showRoot"
            >
                <v-icon
                    size="28"
                    v-text="'$back'"
                />
            </v-btn>
            <div class="title-text">
                {{ title }}
            </div>
        </div>
        <v-divider />
        <v-card-text
            style="height: 300px;"
            class="pa-0"
        >
            <v-list class="pt-0">
                <div
                    v-for="interest in getInterests()"
                    :key="interest.seq"
                >
                    <v-list-item
                        @click="selectInterest(interest)"
                    >
                        {{ interest.name }}
                    </v-list-item>
                </div>
            </v-list>
        </v-card-text>
        <v-divider />
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { InterestGroupTree } from '@/interfaces/common';

const TITLE = '관심사 선택';
export default Vue.extend({
    name: 'BottomSheetInterestCard',
    props: {
        canSelectRoot: Boolean,
    },
    data() {
        return {
            showRootInterests: true,
            title: TITLE,
            interests: null,
        };
    },
    computed: {
        rootInterests(): InterestGroupTree[] {
            return this.$store.state.common.rootInterests;
        },
    },
    methods: {
        showRoot() {
            this.showRootInterests = true;
            this.interests = this.rootInterests;
            this.title = TITLE;
        },
        selectInterest(interest) {
            this.showRootInterests ? this.selectRootInterest(interest) : this.selectSubInterest(interest);
        },
        selectRootInterest(rootInterest) {
            this.title = rootInterest.name;
            this.interests = [...rootInterest.interestList];
            if (this.canSelectRoot) {
                this.interests.unshift({ ...rootInterest });
            }
            this.showRootInterests = false;
        },
        selectSubInterest(interest) {
            this.$emit('selectSubInterest', interest);
            this.$nextTick(() => {
                this.showRootInterests = true;
                this.title = TITLE;
            });
        },
        getInterests() {
            return this.showRootInterests ? this.rootInterests : this.interests;
        },
    },
});
</script>

<style
    scoped
    lang="scss"
>
.title-wrapper {
    height: 60px;
    line-height: 44px;
    padding: 0.5rem 1rem;

    .title-back-btn {
        margin-right: 0.5rem;
    }

    .title-text {
        display: inline;
        align-items: center;
        font-size: 1.3rem;
        font-weight: 500;
    }
}
</style>
