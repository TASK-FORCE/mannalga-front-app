<template>
    <div>
        <!-- <input id="uploadFile"
            ref="imageInput"
            type="file"
            hidden
            accept="image/**"
        /> -->
        <!-- @change="onChangeImage" -->

        <div 
            :id="'select-image-' + boxName"
            class="image-selector-container"
            :style="setHeight"
        >
        <!-- @click="onClickImageUpload" -->
            <img v-if="image" 
                :src="image"
            >
            <div class="image-selector">
                <v-icon>mdi-camera-plus-outline</v-icon>
                <div v-show="text" 
                    class="font-weight-medium mt-2">
                    {{ text }}
                </div>
            </div>
        </div>

        <!-- 이미지 자르기 Modal 
            - modal창 관련 (image-cropper) : https://github.com/overtrue/vue-avatar-cropper
            - 옵션 (cropper-options) : https://github.com/fengyuanchen/cropperjs#options 
                - 회전, 고정비율, 자유비율, 확대 등 설정 가능
        -->
        <image-cropper
            :trigger="'#select-image-'+boxName"
            upload-url="post/url"
            :labels="{submit: '완료', cancel: '취소'}"
            :cropper-options="{viewMode:2}"
            @uploaded="handleUploaded"
        />
        <!-- @TODO: 옵션 설정, upload-url 설정은 추후 다시 구현 -->
    </div>
</template>

<script>
import ImageCropper from 'vue-avatar-cropper';

export default {
    name: 'CommonImageSelectBox',
    components: { ImageCropper },
    props: ['text', 'height', 'boxName'],
    data() {
        return {
            image: '',
        };
    },
    computed: {
        setHeight() {
            return {
                height: `${this.height}px`,
            };
        },
    },
    methods: {
        // onClickImageUpload() {
        //     this.$refs.imageInput.click();
        // },
        handleUploaded(response) {
            if (response.status === 'success') {
                this.user.avatar = response.url;
                // this.$dispatch('updateImage', {image: response.url})
                // @TODO 이미지 업로드 성공시 처리
            }
        },
    },
};
</script>

<style scoped>
.image-selector-container {
    position: relative;
    border: thin solid #9e9e9e;
    border-radius: 4px;
    text-align: center;
    /* height: 60px; */
    /* height: 100px; */
}

.image-selector {
    position: absolute;
    color:#757575;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
