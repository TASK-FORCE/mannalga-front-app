<template>
    <v-container>
        <div class="text-center title">
            백도어 로그인
        </div>
        <div class="list-container">
            <div
                v-for="(user, index) in users"
                :key="user.seq"
                class="list-item"
            >
                <div style="width: 100px">
                    seq: {{ user.seq }}
                </div>
                <div>
                    이름: {{ user.userName }}
                </div>
                <v-spacer />
                <v-btn
                    small
                    :loading="loadingIndex === index"
                    @click="login(user, index)"
                >
                    로그인
                </v-btn>
            </div>
        </div>
    </v-container>
</template>

<script lang="ts">
import axios from 'axios';
import mutationsHelper from '@/store/helper/MutationsHelper.ts';
import { PATH } from '@/router/route_path_type.js';
import { MutationTypes } from '@/store/type/methodTypes.ts';
import Vue from 'vue';

export default Vue.extend({
    name: 'BackdoorLoginPage',
    data() {
        return {
            users: [], // seq, userName
            loadingIndex: -1,
        };
    },
    async created() {
        const response = await axios.get('/api/users/door');
        this.users = response.data.data;
    },
    methods: {
        login({ seq, userName }, index) {
            this.loadingIndex = index;
            axios.get(`/api/users/door/${userName}`)
                .then((response) => {
                    const appToken = response.data.data;
                    mutationsHelper.setAppToken(appToken);
                    this.$router.push(PATH.CLUB_LIST)
                        .then(() => this.$router.go());
                    localStorage.setItem('backdoor', 'true');
                })
                .catch(() => {
                    this.$store.commit(MutationTypes.OPEN_SNACK_BAR, '로그인 실패!')
                })
                .finally(() => (this.loadingIndex = -1));
        },
    },
});
</script>

<style
    scoped
    lang="scss"
>
.list-container {
    padding: 0 2rem;

    .list-item {
        display: flex;
        padding: 10px 0;
        border-bottom: solid 1px grey;
    }
}
</style>
