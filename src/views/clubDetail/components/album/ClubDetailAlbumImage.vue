<template>
    <v-card class="d-flex elevation-3 p-relative w-100"
            :height="height"
            @click="goToAlbumImagePostPage"
    >
        <ImageWithLoading :imgUrl="album.imgUrl"
                          style="border-radius: 5px"
        />
        <div class="img-bottom">
            <v-spacer />
            <div>
                <v-icon color="white"
                        small
                >
                    mdi-heart
                </v-icon>
                <span class="f-09">
                                {{ album.likeCnt }}
                </span>
            </div>
            <v-spacer />
            <div>
                <v-icon color="white"
                        small
                >
                    mdi-comment-multiple
                </v-icon>
                <span class="f-09">
                                {{ album.commentCnt }}
                </span>
            </div>
            <v-spacer />
        </div>
    </v-card>
</template>

<script>
import ImageWithLoading from '@/components/image/ImageWithLoading.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.js';
import routerHelper from '@/router/RouterHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';

export default {
    name: 'ClubDetailAlbumImage',
    components: { ImageWithLoading },
    props: {
        height: {
            type: Number,
            default: 130,
        },
        album: {
            type: Object,
            required: true,
        },
    },
    methods: {
        goToAlbumImagePostPage() {
            mutationsHelper.setAlbum(this.album);
            this.$router.push(generateParamPath(PATH.CLUB.ALBUM_POST, [routerHelper.clubSeq(), this.album.albumSeq || 0]));
        },
    },
};
</script>

<style scoped>
.img-bottom {
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
    opacity: 0.7;
    background-color: #3b3636 !important;
    color: white;
}
</style>
