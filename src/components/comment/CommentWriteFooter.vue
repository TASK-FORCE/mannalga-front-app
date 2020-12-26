<template>
    <div class="footer">
        <div class="d-flex w-100 pa-2">
            <div class="my-auto flex-grow-1">
                <v-text-field placeholder="댓글을 작성해주세요."
                              single-line
                              hide-details
                              filled
                              dense
                              class="pa-0"
                />
            </div>
            <div class="my-auto ml-3">
                <v-btn outlined
                >
                    등록
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CommentWriteFooter',
    created() {
        this.$vuetify.application.footer = 60;
    },
    beforeDestroy() {
        this.$vuetify.application.footer = 0;
    },
};
</script>

<style scoped
       lang="scss"
>
.footer {
    height: 60px;
    position: fixed;
    bottom: 0;
    z-index: 5;
    width: 100%;
    background-color: white;
}

.theme--dark {
    .footer {
        background-color: #1e1e1e;
    }
}
</style>
