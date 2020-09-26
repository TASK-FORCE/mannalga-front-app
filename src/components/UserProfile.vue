<template>
    <div v-show="!isLoading">
        <v-row justify="center"
               class="mt-40"
        >
            <v-col cols="3"
                   class="text-center my-auto"
            >
                <!--      사진도 커스텀하게 선택 가능하게?        -->
                <v-avatar class="top-50"
                          size=70
                >
                    <img :src="profileImg"
                         alt="profile"
                    >
                </v-avatar>
            </v-col>
            <!--     변경 가능한 이름만 더 강조?       -->
            <v-col cols="9">
                <v-text-field :value="profile.name"
                              label="이름 | 닉네임"
                              :rules="nameRules"
                              hide-details="auto"
                              @change="changeProfileName"
                ></v-text-field>
                <v-text-field label="생년월일"
                              readonly
                              :value="profile.dayOfBirth"
                              class="mt-3"
                              hide-details="auto"
                ></v-text-field>
            </v-col>
            <v-btn-toggle v-if="profile.gender"
                          class="mt-5"
                          mandatory
            >
                <v-btn>
                    {{ profile.gender }}
                </v-btn>
            </v-btn-toggle>
        </v-row>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import _ from '@/utils/lodashWrapper.js';
import { RULES } from '@/utils/constant/constant.js';
import { COMMON, IS_LOADING } from '@/store/type/common_type.js';
import { CHANGE_PROFILE_NAME, PROFILE, REQUEST_PROFILE, USER } from '@/store/type/user_type.js';
import { LOGIN_PATH } from '@/router/route_path_type.js';

export default {
    name: 'UserProfile',
    data() {
        return {
            nameRules: RULES.PROFILE_NAME,
        };
    },
    computed: {
        ...mapGetters(USER, { profile: PROFILE }),
        ...mapGetters(COMMON, { isLoading: IS_LOADING }),
        profileImg() {
            if (_.isEmpty(this.profile.imgUrl)) {
                return require('../images/default_profile_img.png');
            }
            return this.profile.imgUrl;
        },
    },
    created() {
        if (_.isDeepEmpty(this.profile)) {
            this[REQUEST_PROFILE]()
                .catch(() => this.$router.push(LOGIN_PATH));
        }
    },
    methods: {
        ...mapActions(USER, [REQUEST_PROFILE]),
        ...mapMutations(USER, { changeProfileName: CHANGE_PROFILE_NAME }),
    },
};
</script>

<style scoped>

</style>
