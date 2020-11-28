<template>
    <v-dialog :value="open"
              persistent
              max-width="1800"
    >
        <div class="image-dialog-wrapper dialog-bg">
            <div class="dialog-bg">
                <v-btn class="pl-1 mt-1 white--text"
                       text
                       @click="$emit('close')"
                >
                    <v-icon large>mdi-close</v-icon>
                </v-btn>
            </div>
            <v-carousel v-model="carouselNum"
                        :show-arrows="paths.length > 1"
                        hide-delimiters
            >
                <v-carousel-item v-for="(path, index) in paths"
                                 :key="index"
                >
                    <v-sheet class="image-dialog__sheet dialog-bg"
                             height="100%"
                             tile
                    >
                        <v-img :src="path"
                               class="image-dialog__sheet-image"
                        />
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>
            <slot name="footer" />
        </div>
    </v-dialog>
</template>

<script>
export default {
    name: 'ImageCarouselDialog',
    props: {
        open: {
            type: Boolean,
            default: false,
        },
        paths: {
            type: Array,
            default: () => [],
            validator: (array) => array.length > 0,
        },
    },
    data() {
        return {
            carouselNum: 0,
        };
    },
    mounted() {
        if (!Array.isArray(this.paths) || this.paths.length < 1) {
            this.$emit('close');
        }
    },
};
</script>

<style scoped
       lang="scss"
>
.image-dialog-wrapper {
    .image-dialog__sheet {
        position: relative;

        .image-dialog__sheet-image {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}

.dialog-bg {
    background-color: #130f0f;
}
</style>
