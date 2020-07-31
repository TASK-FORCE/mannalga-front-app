<template>
    <v-container>
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
                        src="https://cdn.vuetifyjs.com/images/john.jpg"
                        alt="profile"
                    >
                </v-avatar>
            </v-col>
            <!--     변경 가능한 이름만 더 강조?       -->
            <v-col cols="9">
                <v-text-field v-model="profile.name"
                              label="이름 | 닉네임"
                              :rules="nameRules"
                              hide-details="auto"
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

export default {
    name: 'UserProfile',
    props: {
        profile: Object,
    },
    data() {
        return {
            nameRules: NAME_RULES,
        };
    },
};
</script>

<style scoped>

</style>
