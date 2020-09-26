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
import { MESSAGE } from '@/utils/constant/constant.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';
import { actionsHelper } from '@/store/helper/actionsHelper.js';

export default {
    name: 'CommonImageSelectBox',
    props: {
        text: String,
        imageUrl: String,
    },
    computed: {},
    methods: {
        onChangeImage(e) {
            const [image] = e.target.files;
            actionsHelper.uploadTempImage(image)
                .then(url => this.$emit('changeImageUrl', url))
                .catch(() => mutationsHelper.openSnackBar(MESSAGE.SERVER_INSTABILITY));
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
