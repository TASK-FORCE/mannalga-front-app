<template>
    <v-dialog :value="value"
              @click:outside="$emit('input', false)"
    >
        <v-card>
            <div class="pt-3 pb-1 px-4 title"
            >
                {{ title }}
            </div>
            <div class="px-4">
                <slot name="description" />
            </div>
            <div class="text-center pa-3">
                <v-btn
                    color="green darken-1"
                    outlined
                    @click="close"
                >
                    {{ cancelText }}
                </v-btn>
                <v-btn
                    class="ml-3"
                    color="green darken-1"
                    outlined
                    :loading="loading"
                    @click="submit"
                >
                    {{ submitText }}
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
import routerHelper from '@/router/RouterHelper.js';

export default {
    name: 'YesOrNoDialog',
    props: {
        value: {
            type: Boolean,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        cancelText: {
            type: String,
            default: '취소',
        },
        submitText: {
            type: String,
            default: '확인',
        },
        submitPromiseCallback: {
            type: Function,
            required: true,
        },
    },
    data() {
        return {
            loading: false,
        };
    },
    computed: {
        clubSeq: () => routerHelper.clubSeq(),
    },
    beforeDestroy() {
        this.close();
    },
    methods: {
        submit() {
            this.loading = true;
            this.submitPromiseCallback()
                .finally(() => (this.loading = false));
        },
        close() {
            this.$emit('input', false);
        },
    },
};
</script>

<style scoped>

</style>
