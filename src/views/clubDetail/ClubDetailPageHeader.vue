<template>
    <v-app-bar
        class="elevation-0"
        app
    >
        <v-btn
            icon
            class="back-btn"
            @click="moveToClubListPage"
        >
            <v-icon v-text="'$back'" />
        </v-btn>
        <div class="header-club-name">{{ $store.state.club.clubInfo.name }}</div>
        <v-spacer />
        <UserSettingPageEnterAvatar />
    </v-app-bar>
</template>

<script>
import { PATH } from '@/router/route_path_type.js';
import clubDetailVuexService from '@/store/service/ClubDetailVuexService.ts';
import lastScrollPositionCache from '@/utils/cache/LastScrollPositionCache.js';
import lastClubTabCache from '@/utils/cache/LastClubTabCache.js';
import routerHelper from '@/router/RouterHelper.js';
import UserSettingPageEnterAvatar from '@/components/UserSettingPageEnterAvatar.vue';

export default {
    name: 'ClubDetailPageHeader',
    components: { UserSettingPageEnterAvatar },
    data() {
        return {
            clubListPath: PATH.CLUB_LIST,
        };
    },
    methods: {
        moveToClubListPage() {
            lastScrollPositionCache.init(this.$route.fullPath);
            lastClubTabCache.save(routerHelper.clubSeq(), 'main');
            this.$router.push(this.clubListPath);
            clubDetailVuexService.reset();
        },
    },
};
</script>

<style
    scoped
    lang="scss"
>
.header-club-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 18px;
    font-weight: bold;
    color: #292929;
}

.back-btn {
    color: #292929 !important;
}

.theme--dark {
    .header-club-name, .back-btn {
        color: #F5F5F5 !important;
    }
}
</style>
