<template>
    <div>
        <input ref="imageInput"
               type="file"
               hidden
               accept="image/**"
               @change="onChangeImage"
        />
        <!--   Image Resize 구현 필요     -->
        <div v-if="imageUrl">
            <v-img height="150"
                   :src="imageUrl"
                   @click="onClickImageUpload"
            />
        </div>
        <div v-else
             class="image-selector-container"
             @click="onClickImageUpload"
        >
            <div class="image-selector">
                <v-icon>mdi-camera-plus-outline</v-icon>
                <div class="font-weight-medium mt-2">
                    {{ text }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import { COMMON, OPEN_SNACKBAR, UPLOAD_TEMP_IMAGE } from '@/store/type/common_type.js';
import { buildSnackBarOption } from '@/utils/snackbarUtils.js';
import { MESSAGE } from '@/utils/constant/constant.js';

export default {
    name: 'CommonImageSelectBox',
    props: {
        text: String,
        imageUrl: String,
    },
    computed: {},
    methods: {
        ...mapActions(COMMON, [UPLOAD_TEMP_IMAGE]),
        ...mapMutations(COMMON, [OPEN_SNACKBAR]),
        onChangeImage(e) {
            const [image] = e.target.files;
            this[UPLOAD_TEMP_IMAGE](image)
                .then(url => this.$emit('changeImageUrl', url))
                .catch(() => this[OPEN_SNACKBAR](buildSnackBarOption(MESSAGE.SERVER_INSTABILITY)));
        },
        onClickImageUpload() {
            this.$refs.imageInput.click();
        },

    },
};
</script>

<style scoped>
.image-selector-container {
    position: relative;
    background-color: #e9e9e9;
    text-align: center;
    height: 100px;
}

.image-selector {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
