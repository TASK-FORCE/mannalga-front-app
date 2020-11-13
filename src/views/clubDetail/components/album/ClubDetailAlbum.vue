<template>
    <div>
        <v-container fluid>
            <v-row>
                <v-col
                    v-for="n in 9"
                    :key="n"
                    class="d-flex child-flex pa-1"
                    cols="4"
                >
                    <v-card flat
                            tile
                            class="d-flex elevation-1"
                    >
                        <v-img
                            :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                            aspect-ratio="1"
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
        </v-container>
        <FixedCreateBtn color="green" />
    </div>
</template>

<script>
import FixedCreateBtn from '@/components/button/FixedCreateBtn.vue';

export default {
    name: 'ClubDetailAlbum',
    components: { FixedCreateBtn },
    props: ['albumList'],
    // @TODO 앨범 CRUD
};
</script>

<style scoped>
</style>
