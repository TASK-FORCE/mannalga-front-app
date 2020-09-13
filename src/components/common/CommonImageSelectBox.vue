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
export default {
    name: 'CommonImageSelectBox',
    props: ['text'],
    data() {
        return {
            imageUrl: '',
        };
    },
    methods: {
        onChangeImage(e) {
            this.imageUrl = URL.createObjectURL(e.target.files[0]);
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
