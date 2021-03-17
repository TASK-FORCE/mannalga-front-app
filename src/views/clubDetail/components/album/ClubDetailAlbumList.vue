<template>
    <div>
        <InfiniteScrollTemplate
            name="album"
            :firstPageCallback="fetchFirstPage"
            :nextPageCallback="fetchNextPage"
            :pageElements="twoAlbumsList"
            :pageInfo="albumPage"
            :withListGroup="false"
        >
            <template v-slot:list-main>
                <v-row
                    v-for="(twoAlbums, index) in twoAlbumsList"
                    :key="index"
                    class="w-100 ma-0"
                >
                    <v-col
                        v-if="twoAlbums.length >= 1"
                        cols="6"
                        class="pr-1.5 pb-0"
                    >
                        <ClubDetailAlbumImage :album="twoAlbums[0]" />
                    </v-col>
                    <v-col
                        v-if="twoAlbums.length >= 2"
                        cols="6"
                        class="pl-1.5 pb-0"
                    >
                        <ClubDetailAlbumImage :album="twoAlbums[1]" />
                    </v-col>
                </v-row>
            </template>
            <template #empty>
                <EmptyPage
                    icon="image"
                    title="사진이 없습니다."
                    description="사진을 올려 모임원들과 나눠보세요."
                />
            </template>
        </InfiniteScrollTemplate>
        <AlbumImageCreateDialog v-model="isOpenImageRegisterDialog" />
        <FixedCreateBtn
            v-if="canCreateAlbum"
            color="#E8984E"
            :size="60"
            :icon-size="40"
            @click="isOpenImageRegisterDialog = true"
        />
        <FixedScrollToTopBtn color="red" />
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import FixedCreateBtn from '@/components/button/FixedCreateBtn.vue';
import AlbumImageCreateDialog from '@/components/album/AlbumImageCreateDialog.vue';
import ClubDetailAlbumImage from '@/views/clubDetail/components/album/ClubDetailAlbumImage.vue';
import gettersHelper from '@/store/helper/GettersHelper.js';
import _ from '@/utils/common/lodashWrapper.js';
import InfiniteScrollTemplate from '@/components/InfiniteScrollTemplate.vue';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import routerHelper from '@/router/RouterHelper.js';
import FixedScrollToTopBtn from '@/components/button/FixedScrollToTopBtn.vue';
import EmptyPage from '@/components/EmptyPage.vue';
import { CurrentUserInfo } from '../../../../interfaces/club';

export default Vue.extend({
    name: 'ClubDetailAlbumList',
    components: {
        EmptyPage,
        FixedScrollToTopBtn,
        InfiniteScrollTemplate,
        ClubDetailAlbumImage,
        AlbumImageCreateDialog,
        FixedCreateBtn,
    },
    props: {
        currentUserInfo: Object as PropType<CurrentUserInfo>,
    },
    data() {
        return {
            isOpenImageRegisterDialog: false,
        };
    },
    computed: {
        albumList: () => gettersHelper.albumList(),
        albumPage: () => gettersHelper.albumPage(),
        clubSeq: () => routerHelper.clubSeq(),
        twoAlbumsList() {
            return _.chunk(this.albumList, 2);
        },
        canCreateAlbum() {
            const { isMaster, isManager } = this.currentUserInfo;
            return isMaster || isManager;
        },
    },
    methods: {
        fetchFirstPage() {
            return actionsHelper.requestFirstAlbumList(this.clubSeq);
        },
        fetchNextPage() {
            return actionsHelper.requestNextAlbumList(this.clubSeq);
        },
    },
});
</script>
