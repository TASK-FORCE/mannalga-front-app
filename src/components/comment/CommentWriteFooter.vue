<template>
    <v-footer fixed
              class="pa-1"
              app
    >
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
    </v-footer>
</template>

<script>
export default {
    name: 'CommentWriteFooter',
};
</script>

<style scoped>

</style>
