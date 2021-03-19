<template>
    <div class="footer">
        <div class="d-flex w-100 pa-2">
            <div class="my-auto flex-grow-1">
                <v-text-field v-model="content"
                              :placeholder="EMPTY_COMMENT_TEXT"
                              single-line
                              hide-details
                              filled
                              dense
                              class="pa-0"
                />
            </div>
            <div class="my-auto ml-3">
                <v-btn outlined
                       :loading="loading"
                       @click="writeComment"
                >
                    등록
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { MESSAGE } from '@/utils/common/constant/messages.ts';
import { CommonMutationTypes } from '@/store/type/mutationTypes.ts';
import Vue from 'vue';

export default Vue.extend({
    name: 'CommentWriteFooter',
    props: {
        requestWriteComment: {
            type: Function,
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            default: (content) => {},
        },
        postProcessor: {
            type: Function,
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            default: () => {},
        },
    },
    data() {
        return {
            EMPTY_COMMENT_TEXT: MESSAGE.EMPTY_COMMENT_TEXT,
            content: null,
            loading: false,
        };
    },
    created() {
        this.$vuetify.application.footer = 60;
    },
    beforeDestroy() {
        this.$vuetify.application.footer = 0;
    },
    methods: {
        writeComment() {
            if (this.content) {
                this.loading = true;
                this.requestWriteComment(this.content)
                    .then(() => {
                        this.postProcessor();
                        this.content = null;
                    })
                    .finally(() => (this.loading = false));
                return;
            }
            this.$store.commit(CommonMutationTypes.OPEN_SNACK_BAR, this.EMPTY_COMMENT_TEXT);
        },
    },
});
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
