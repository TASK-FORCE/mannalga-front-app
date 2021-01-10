<template>
    <v-btn
        class="mx-1 px-2"
        outlined
        small
        :color="color"
        v-bind="attrs"
        v-on="on"
        @click="$emit('click')"
    >
        {{ text }}
        <v-icon right
                v-text="'$menuDown'"
        />
    </v-btn>
</template>

<script>
export default {
    name: 'ClubListSearchFilterBtn',
    props: ['attrs', 'on', 'text', 'color'],
};
</script>

<style scoped>

</style>
