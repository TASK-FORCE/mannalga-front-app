<template>
    <div class="text-center">
        <v-btn :outlined="!!outlined"
               :color="color || 'blue'"
               @click="$emit('click');"
               v-text="text"
        />
    </div>
</template>

<script>
export default {
    name: 'CommonCenterBtn',
    props: ['text', 'color', 'outlined'],
};
</script>

<style scoped>

</style>
