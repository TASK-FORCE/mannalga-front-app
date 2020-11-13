<template>
    <v-btn
        class="mx-1 px-2"
        outlined
        small
        v-bind="attrs"
        v-on="on"
        @click="$emit('click')"
    >
        {{ text }}
        <v-icon right>mdi-menu-down</v-icon>
    </v-btn>
</template>

<script>
export default {
    name: 'ClubListSearchFilterBtn',
    props: ['attrs', 'on', 'text'],
};
</script>

<style scoped>

</style>
