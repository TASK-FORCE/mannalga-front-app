<template>
    <div>
        <div class="d-flex px-2 mt-3">
            <UserProfileAvatar :size="40"
                               :imgUrl="writer.imgUrl"
                               :name="writer.name"
                               :appendNumber="writer.writerUserSeq"
            />
            <div class="ml-2">
                <div class="album-title">{{ album.title }}</div>
                <div class="f-09">
                    {{ writer.name }}
                </div>
            </div>
            <v-spacer />
            <div class="mr-3 d-flex">
                <v-btn class="mr-1"
                       icon
                >
                    <v-icon color="red"
                    >
                        mdi-heart
                    </v-icon>
                </v-btn>
                <div class="p-relative"
                     style="height: 36px;"
                >
                    <div class="absolute-center">
                        ({{ album.likeCnt }})
                    </div>
                </div>
            </div>
        </div>
        <div class="pa-3">
            <ImageWithDialog class="elevation-2"
                             :imgUrl="album.imgUrl"
            />
        </div>
        <MiddleDivider />
        <div class="ma-3">
            <v-icon color="green"
                    lar
            >
                mdi-comment-multiple
            </v-icon>
            댓글
            ({{ album.commentCnt }})
        </div>
    </div>
</template>

<script>
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import MiddleDivider from '@/components/MiddleDivider.vue';
import ImageWithDialog from '@/components/image/ImageWithDialog.vue';
import gettersHelper from '@/store/helper/GettersHelper.js';

export default {
    name: 'ClubAlbumPostBody',
    components: { ImageWithDialog, MiddleDivider, UserProfileAvatar },
    computed: {
        album: () => gettersHelper.album(),
        writer() {
            return this.album.writer;
        },
    },
    mounted() {
        if (!this.album.imgUrl) {
            this.$router.back();
        }
    },
};
</script>

<style scoped>
.album-title {
    font-weight: 700;
    font-size: 1.05rem;
}
</style>
