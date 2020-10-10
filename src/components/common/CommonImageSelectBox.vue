<template>
    <div>
        <!-- 이미지 첨부 -->
        <input id="uploadFile"
               ref="imageInput"
               type="file"
               hidden
               accept="image/**"
               @change="onChangeImage"
        />
        
        <!-- 캔버스 영역 -->
        <!-- <canvas></canvas> -->
        <img id="editImg" 
             src=""
        />

        <!-- <input id="xAxis"
               type="hidden"
               value="0"
               placeholder="선택영여역의_x좌표"
        />
        <input id="yAxis"
               type="hidden"
               value="0"
               placeholder="선택영여역의_y좌표"
        />
        <input id="wLength"
               type="hidden"
               value="0"
               placeholder="선택영여역의_w넓이"
        />
        <input id="hLength"
               type="hidden"
               value="0"
               placeholder="선택영여역의_h높이"
        />
        <input id="cutBtn" 
               type="button"
               value="자르기"
               @click="imgCropApply"
        /> -->

        <!--   Image Resize 구현 필요     -->
        <!-- <div v-if="imageUrl">
            <v-img height="150"
                   :src="imageUrl"
            />
        </div> -->

        <div 
             class="image-selector-container"
             :style="cssProps"
             @click="onClickImageUpload"
        >
            <div class="image-selector">
                <v-icon>mdi-camera-plus-outline</v-icon>
                <div v-show="text" 
                    class="font-weight-medium mt-2">
                    {{ text }}
                </div>
            </div>
        </div>
    </div>
</template>

<!-- <script type="text/javascript" src="http://jcrop-cdn.tapmodo.com/v0.9.12/js/jquery.Jcrop.min.js"></script> -->
<script>
// import Jcrop from 'jcrop';

export default {
    name: 'CommonImageSelectBox',
    props: ['text', 'height'],
    data() {
        return {
            image: '',
            jcropApi: null,
        };
    },
    computed: {
        cssProps() {
            return {
                height: `${this.height}px`,
            };
        },
    },
    methods: {
        onClickImageUpload() {
            this.$refs.imageInput.click();
        },
        onChangeImage(e) {
            // [this.image] = e.target.files;
            const fileInfo = document.querySelector('#uploadFile').files[0];
            const reader = new FileReader();

            reader.onload = (() => {
                document.querySelector('#editImg').setAttribute('src', reader.result);
                this.canvasDrawImage(); // 캔버스에 이미지 출력
            });

            if (fileInfo) {
                // 업로드한 파일 URL을 읽기
                reader.readAsDataURL(fileInfo);
            }
        },
        canvasDrawImage() {
            const editImgWidth = document.querySelector('#editImg').clientWidth;
            const editImgHeight = document.querySelector('#editImg').clientHeight;
            const prepImage = new Image();

            prepImage.src = document.querySelector('#editImg').getAttribute('src');
            prepImage.onload = (() => {
                const canvas = document.querySelector('canvas');
                const canvasContext = canvas.getContext('2d');

                canvas.width = editImgWidth;
                canvas.height = editImgHeight;
                canvasContext.drawImage(prepImage, 0, 0, editImgWidth, editImgHeight); // 캔버스 이미지 그리기

                // 캔버스 이미지 끌어오기
                const dataURI = canvas.toDataURL('image/jpeg');
                document.querySelector('#editImg').setAttribute('src', dataURI);
            });
            // this.imgCropDesignate(); // 이미지 편집 실행
        },
        // imgCropDesignate() {
        //     const editWidth = document.querySelector('#editImg').clientWidth;
        //     const editHeight = document.querySelector('#editImg').clientHeight;

        //     // jcrop 실행시 크롭영역을 미리 세팅
        //     const x1 = window.screen.width / 2 - editWidth;
        //     const y1 = window.screen.height / 2 - editHeight;
        //     const x2 = editWidth / 1.5;
        //     const y2 = editHeight / 1.5;

        //     // jcrop 실행
        //     document.querySelector('#editImg').Jcrop({
        //         bgFade: true,
        //         bgOpacity: 0.2,
        //         setSelect: [x1, y1, x2, y2],
        //         onSelect: this.updateCoords,
        //     }, function () {
        //         this.jcropApi = this;
        //     });

        //     document.querySelector('#editImg').style.display = 'none';
        //     document.querySelector('#editImg').style.display = 'inline';
        // },
        // updateCoords(crap) { // 지정된 크롭 한 영역(좌표, 넓이, 높이) 저장
        //     document.querySelector('#xAxis').value = crap.x;
        //     document.querySelector('#yAxis').value = crap.y;
        //     document.querySelector('#wLength').value = crap.w;
        //     document.querySelector('#hLength').value = crap.h;
        // },
        // imgCropApply() { // 크롭한 영역 잘라내고 추출하기
        //     const editImage = new Image();
        //     editImage.src = document.querySelector('editImg').getAttribute('src');

        //     editImage.onload = function () {
        //         const canvas = document.querySelector('canvas');
        //         const canvasContext = canvas.getContext('2d');

        //         canvas.width = document.querySelector('#wLength').value;
        //         canvas.height = document.querySelector('#hLength').value;

        //         canvasContext.drawImage(
        //             editImage,
        //             document.querySelector('#xAxis').value, // 자르기를 시작할 x좌표
        //             document.querySelector('#yAxis').value, // 자르기를 시작할 y좌표
        //             document.querySelector('#wLength').value, // 잘라낸 이미지의 넓이
        //             document.querySelector('#hLength').value, // 잘라낸 이미지의 높이
        //             0, // 캔버스에 이미지를 배치할 x좌표
        //             0, // 캔버스에 이미지를 배치할 y좌표
        //             document.querySelector('#wLength').value, // 사용할 이미지의 넓이(이미지 스트레칭 또는 축소)
        //             document.querySelector('#hLength').value, // 사용할 이미지의 높이(이미지 스트레칭 또는 축소)
        //         );

        //         const dataURI = canvas.toDataURL('image/jpeg');
        //         document.querySelector('#editImg').setAttribute('src', dataURI);

        //         document.querySelector('#editImg').style.width = document.querySelector('#wLength').value;
        //         document.querySelector('#editImg').style.height = document.querySelector('#hLength').value;
        //     };

        //     document.querySelector('#cutBtn').style.display = 'none';

        //     // JCROP을 종료
        //     this.jcropApi.destroy();
        //     this.jcropApi = null;
        // },
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

canvas {
    /* display:none; */
    /* width: 100%; */
    /* height: 100%; */
    /* position: absolute; */
    /* z-index: 1000; */
    background-color: red;
}
</style>
