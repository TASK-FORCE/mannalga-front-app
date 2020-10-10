<template>
    <div v-show="!isLoading">
        <v-row justify="center"
               class="mt-40"
        >
            <v-col cols="3"
                   class="text-center my-auto"
            >
                <UserProfileAvatar class="top-50"
                                   :imgUrl="profile.imgUrl"
                                   :size="70"
                />
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
import _ from '@/utils/lodashWrapper.js';
import { RULES } from '@/utils/constant/constant.js';
import { LOGIN_PATH } from '@/router/route_path_type.js';
import { gettersHelper } from '@/store/helper/gettersHelper.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';
import { actionsHelper } from '@/store/helper/actionsHelper.js';
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';

export default {
    name: 'UserProfile',
    components: { UserProfileAvatar },
    data() {
        return {
            nameRules: RULES.PROFILE_NAME,
        };
    },
    computed: {
        profile: () => gettersHelper.profile(),
        isLoading: () => gettersHelper.isLoading(),
    },
    created() {
        if (_.isDeepEmpty(this.profile)) {
            actionsHelper.requestProfile()
                .catch(() => this.$router.push(LOGIN_PATH));
        }
    },
    methods: {
        changeProfileName: (name) => mutationsHelper.changeProfileName(name),
    },
};
</script>

<style scoped>

</style>
