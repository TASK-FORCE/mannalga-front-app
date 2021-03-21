<template>
    <v-card
        class="d-flex elevation-2 p-relative w-100"
        @click="goToAlbumImagePostPage"
    >
        <ImageWithLoading
            :imgUrl="album.imgUrl"
            style="border-radius: 5px"
            aspect-ratio="1"
        />
        <div
            v-if="hasLikeCnt || hasCommentCnt"
            class="img-bottom"
        >
            <div
                v-if="hasLikeCnt"
                class="d-flex align-center"
            >
                <div>
                    <v-icon
                        class="image-bottom-icon"
                        x-small
                        v-text="'$heartOut'"
                    />
                </div>
                <div class="f-09 image-bottom-text">
                    {{ album.likeCnt }}
                </div>
            </div>
            <div
                v-if="hasCommentCnt"
                class="d-flex align-center"
                :class="hasLikeCnt ? 'pl-1' : ''"
            >
                <div>
                    <v-icon
                        class="image-bottom-icon"
                        x-small
                        v-text="'$commentOut'"
                    />
                </div>
                <div class="image-bottom-text">
                    {{ album.commentCnt }}
                </div>
            </div>
        </div>
    </v-card>
</template>

<script lang="ts">
import ImageWithLoading from '@/components/image/ImageWithLoading.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.ts';
import routerHelper from '@/router/RouterHelper.ts';
import Vue, { PropType } from 'vue';
import { Album } from '@/interfaces/album';

export default Vue.extend({
    name: 'ClubDetailAlbumImage',
    components: { ImageWithLoading },
    props: {
        album: {
            type: Object as PropType<Album>,
            required: true,
        },
    },
    computed: {
        hasLikeCnt() {
            return this.album.likeCnt > 0;
        },
        hasCommentCnt() {
            return this.album.commentCnt > 0;
        },
    },
    methods: {
        goToAlbumImagePostPage() {
            this.$router.push(generateParamPath(PATH.CLUB.ALBUM_POST, [routerHelper.clubSeq(), this.album.albumSeq || 0]));
        },
    },
});
</script>

<style
    scoped
    lang="scss"
>
.img-bottom {
    display: flex;
    position: absolute;
    bottom: 4px;
    left: 4px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 5px;
    height: 23px;
    line-height: 23px;
    padding: 0 4px;

    .image-bottom-text {
        color: #3c3c3c;
        font-size: 12px;
        padding-left: 1px;
    }

    .image-bottom-icon {
        color: #666666;
    }
}

.theme--dark {
    .img-bottom {
        background: rgba(18, 18, 18, 0.8);

        .image-bottom-text {
            color: #F5F5F5;
        }

        .image-bottom-icon {
            color: #9f9f9f;
        }
    }
}
</style>
