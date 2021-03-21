<template>
    <v-snackbar
        :value="open"
        v-bind="{[snackBarOptions.location]: true}"
        :timeout="snackBarOptions.time || 2000"
        @input="value => $emit('input', value)"
    >
        {{ snackBarOptions.message }}

        <template v-slot:action="{ attrs }">
            <v-btn
                :color="snackBarOptions.color || 'blue'"
                outlined
                small
                v-bind="attrs"
                @click="$emit('click')"
            >
                {{ btnText }}
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { SnackBarOption } from '@/interfaces/common';

export default Vue.extend({
    name: 'SnackBar',
    props: {
        open: {
            type: Boolean,
            required: true,
        },
        snackBarOptions: {
            type: Object as PropType<SnackBarOption>,
            required: true,
        },
        btnText: {
            type: String,
            required: true,
        },
    },
});
</script>
