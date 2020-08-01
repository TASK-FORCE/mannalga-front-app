<template>
    <v-container v-show="!isLoading">
        <v-row justify="center"
               class="mt-40"
        >
            <v-col cols="3"
                   class="text-center my-auto"
            >
                <!--      사진도 커스텀하게 선택 가능하게?        -->
                <v-avatar class="top-50"
                          size=80
                >
                    <img
                        :src="profile.img"
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
                              @change="changeName"
                ></v-text-field>
                <v-text-field label="생년월일"
                              readonly
                              :value="profile.dayOfBirth"
                              class="mt-3"
                              hide-details="auto"
                ></v-text-field>
            </v-col>
            <v-btn-toggle class="mt-5"
                          mandatory
            >
                <v-btn>
                    {{ profile.gender }}
                </v-btn>
            </v-btn-toggle>
        </v-row>
    </v-container>
</template>

<script>
import { NAME_RULES } from '@/utils/constant/rules.js';
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { isEmpty } from '@/utils/commonUtils.js';

export default {
    name: 'UserProfile',
    data() {
        return {
            nameRules: NAME_RULES,
        };
    },
    computed: {
        ...mapGetters('user', ['profile']),
        ...mapGetters('common', ['isLoading']),
    },
    created() {
        if (isEmpty(this.profile)) {
            this.requestProfile()
                .catch(() => this.$router.push('/login'));
        }
    },
    methods: {
        ...mapActions('user', ['requestProfile']),
        ...mapMutations('user', ['changeName']),
    },
};
</script>

<style scoped>

</style>
