<template>
    <v-container class="py-0">
        <InfiniteScrollTemplate name="album"
                                :firstPageCallback="fetchFirstPage"
                                :nextPageCallback="fetchNextPage"
                                :pageElements="twoAlbumsList"
                                :pageInfo="albumPage"
                                :withListGroup="false"
        >
            <template v-slot:list-main>
                <v-row v-for="(twoAlbums, index) in twoAlbumsList"
                       :key="index"
                >
                    <v-col
                        v-for="album in twoAlbums"
                        :key="album.albumSeq"
                        class="d-flex"
                        style="padding: 6px"
                        cols="6"
                    >
                        <ClubDetailAlbumImage :album="album"
                                              :height="imgHeight"
                        />
                    </v-col>
                </v-row>
            </template>
            <template #empty>
                <EmptyPage icon="image"
                           title="사진이 없습니다."
                           description="사진을 올려 모임원들과 나눠보세요."
                />
            </template>
        </InfiniteScrollTemplate>
        <AlbumImageCreateDialog v-model="isOpenImageRegisterDialog" />
        <FixedCreateBtn v-if="canCreateAlbum"
                        color="green"
                        left
                        @click="isOpenImageRegisterDialog = true"
        />
        <FixedScrollToTopBtn color="red" />
    </v-container>
</template>

<script>
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

export default {
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
        currentUserInfo: Object,
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
        imgHeight() {
            return ((window.innerWidth / 2) - 8) * 0.75;
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
};
</script>

<style scoped
       lang="scss"
>

</style>
