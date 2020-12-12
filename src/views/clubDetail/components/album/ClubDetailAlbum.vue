<template>
    <v-container>
        <v-row>
            <v-col
                v-for="img in imgUrls"
                :key="img"
                class="d-flex pa-1"
                cols="6"
            >
                <v-card class="d-flex elevation-3">
                    <v-img
                        :src="img"
                        class="grey lighten-2"
                    >
                        <template v-slot:placeholder>
                            <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                            >
                                <v-progress-circular indeterminate
                                                     color="grey lighten-5"
                                ></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </v-card>
            </v-col>
        </v-row>
        <AlbumCreateDialog v-model="dialogOpen" />
        <FixedCreateBtn v-if="canCreateAlbum"
                        color="green"
                        @click="dialogOpen = true"
        />
    </v-container>
</template>

<script>
import FixedCreateBtn from '@/components/button/FixedCreateBtn.vue';
import AlbumCreateDialog from '@/components/album/AlbumCreateDialog.vue';

export default {
    name: 'ClubDetailAlbum',
    components: { AlbumCreateDialog, FixedCreateBtn },
    props: {
        userInfo: Object,
    },
    data() {
        return {
            imgUrls: [
                'https://super-invention-static.s3.ap-northeast-2.amazonaws.com/temp/img/20201120092756-88ae2cf9-1543-40ca-81e3-3e3402791914-test.png',
                'https://super-invention-static.s3.ap-northeast-2.amazonaws.com/temp/img/20201118103423-c702c611-b3b8-45bc-980f-6c4b0ca74edb-test.png',
                'https://super-invention-static.s3.ap-northeast-2.amazonaws.com/temp/img/20201118101707-ac3c8e68-af94-4f84-bcf3-bef299e535d3-test.png',
                'https://super-invention-static.s3.ap-northeast-2.amazonaws.com/temp/img/20201118101037-c9edf193-4fcc-451c-b0a8-5bdf47d0d028-test.png',
                'https://super-invention-static.s3.ap-northeast-2.amazonaws.com/temp/img/20201118100751-6a8656d9-860e-4651-8acc-0f65b34b9671-test.png',
                'https://super-invention-static.s3.ap-northeast-2.amazonaws.com/temp/img/20201118094306-618bb095-a3e3-48de-9802-f4ac0da4b79d-test.png',
                'https://super-invention-static.s3.ap-northeast-2.amazonaws.com/temp/img/20201118094147-47bf55d3-6772-4e02-874a-bb60f0fb4390-test.png',
                'https://super-invention-static.s3.ap-northeast-2.amazonaws.com/temp/img/20201118094019-f7f9987d-5f78-438a-af0f-ee9494cbd5d1-test.png',
            ],
            dialogOpen: false,
        };
    },
    computed: {
        canCreateAlbum() {
            console.log(this.userInfo);
            const { isMaster, isManager } = this.userInfo;
            return isMaster || isManager;
        },
    },
};
</script>

<style scoped
       lang="scss"
>
</style>
