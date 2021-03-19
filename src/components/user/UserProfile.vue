<template>
    <div v-show="!$store.state.common.loading">
        <v-row
            justify="center"
            class="mt-40"
        >
            <v-col
                cols="3"
                class="text-center my-auto"
            >
                <UserProfileAvatar
                    class="top-50"
                    :imgUrl="kakaoProfile.imgUrl"
                    :size="70"
                />
            </v-col>
            <!--     변경 가능한 이름만 더 강조?       -->
            <v-col cols="9">
                <v-text-field
                    :value="kakaoProfile.name"
                    label="이름 | 닉네임"
                    :rules="nameRules"
                    hide-details="auto"
                    @change="changeProfileName"
                ></v-text-field>
            </v-col>
            <v-btn-toggle
                v-if="kakaoProfile.gender"
                class="mt-5"
                mandatory
            >
                <v-btn>
                    {{ kakaoProfile.gender }}
                </v-btn>
            </v-btn-toggle>
        </v-row>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import _ from '@/utils/common/lodashWrapper.js';
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import { RULES } from '@/utils/common/constant/rules.ts';
import { PATH } from '@/router/route_path_type.js';
import { UserMutationTypes } from '@/store/type/mutationTypes.ts';
import { KakaoProfile } from '@/interfaces/user';
import { UserActionTypes } from '@/store/type/actionTypes';

export default Vue.extend({
    name: 'UserProfile',
    components: { UserProfileAvatar },
    data() {
        return {
            nameRules: RULES.PROFILE_NAME,
        };
    },
    computed: {
        kakaoProfile(): KakaoProfile {
            return this.$store.state.user.kakaoProfile;
        },
    },
    created() {
        if (_.isDeepEmpty(this.kakaoProfile)) {
            this.$store.dispatch(UserActionTypes.REQUEST_KAKAO_PROFILE)
                .catch(() => this.$router.push(PATH.LOGIN));
        }
    },
    methods: {
        changeProfileName(name) {
            this.$store.commit(UserMutationTypes.CHANGE_PROFILE_NAME, name);
        },
    },
});
;</script>

<style scoped>

</style>
