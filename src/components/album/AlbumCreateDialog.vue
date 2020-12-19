<template>
    <v-dialog :value="value"
              persistent
    >
        <v-card>
            <div class="d-flex pa-3">
                <div class="font-weight-bold ml-2"
                     style="font-size: 1.3rem"
                >
                    사진첩 등록
                </div>
            </div>
            <div class="px-4">
                <v-form ref="form">
                    <v-text-field v-model="title"
                                  :rules="RULES.CLUB_ALBUM_TITLE"
                                  class="pa-0"
                                  label="사진 제목"
                    />
                </v-form>
                <ImageSelectBox class="mt-1 mb-3 elevation-2"
                                height="300"
                                freeSize
                                @handleImageDto="changeImageDto"
                />
            </div>
            <div class="text-center pa-3">
                <v-btn
                    color="green darken-1"
                    outlined
                    @click="$emit('input', false)"
                >
                    취소
                </v-btn>
                <v-btn
                    class="ml-3"
                    color="green darken-1"
                    outlined
                    @click="requestAlbumCreate"
                >
                    등록
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>

import { MESSAGE, RULES } from '@/utils/common/constant/constant.js';
import ImageSelectBox from '@/components/image/ImageSelectBox.vue';
import routerParamHelper from '@/router/RouterParamHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';

export default {
    name: 'AlbumCreateDialog',
    components: { ImageSelectBox },
    props: {
        value: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            RULES,
            title: null,
            imgUrl: null,
            fileName: null,
        };
    },
    methods: {
        requestAlbumCreate() {
            if (this.$refs.form.validate()) {
                if (this.imgUrl && this.fileName) {
                    const clubAlbumCreateInfo = {
                        clubSeq: routerParamHelper.clubSeq(),
                        clubAlbumCreateDto: {
                            title: this.title,
                            file_name: this.fileName,
                            imgUrl: this.imgUrl,
                        },
                    };
                    actionsHelper.requestAlbumCreate(clubAlbumCreateInfo)
                        .then(() => {
                            this.clear();
                            mutationsHelper.openSnackBar(MESSAGE.SUCCESS_IMAGE_REGISTER);
                        });
                }
            } else {
                mutationsHelper.openSnackBar(MESSAGE.SELECT_IMAGE_REQUIRE);
            }
        },
        changeImageDto({ absolutePath, fileName }) {
            this.imgUrl = absolutePath;
            this.fileName = fileName;
        },
        clear() {
            this.title = null;
            this.imgUrl = null;
            this.fileName = null;
            this.$emit('input', false);
        },
    },
};
</script>

<style scoped>

</style>
