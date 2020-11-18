<template>
    <v-card>
        <div class="title-wrapper">
            <v-btn v-show="!showRootInterests"
                   icon
                   class="title-back-btn"
                   @click="showRoot"
            >
                <v-icon size="28">mdi-keyboard-backspace</v-icon>
            </v-btn>
            <div class="title-text">
                {{ title }}
            </div>
        </div>
        <v-divider />
        <v-card-text style="height: 300px;"
                     class="pa-0"
        >
            <v-list class="pt-0">
                <v-list-item-group>
                    <template v-for="interest in interests">
                        <v-list-item :key="interest.seq"
                                     @click="selectInterest(interest)"
                        >
                            {{ interest.name }}
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
    name: 'BottomSheetInterestCard',
    props: {
        rootInterests: Array,
        canSelectRoot: Boolean,
    },
    data() {
        return {
            showRootInterests: true,
            title: '관심사 선택',
            interests: this.rootInterests,
        };
    },
    watch: {
        rootInterests() {
            this.interests = this.rootInterests;
        },
    },
    methods: {
        showRoot() {
            this.showRootInterests = true;
            this.interests = this.rootInterests;
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
            setTimeout(() => {
                this.showRootInterests = true;
                this.title = '관심사 선택';
                this.interests = this.rootInterests;
            }, 100);
        },
    },
};
</script>

<style scoped
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
