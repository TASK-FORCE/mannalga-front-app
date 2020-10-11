<template>
    <div class="text-center">
        <v-btn :outlined="!!outlined"
               :color="color || 'blue'"
               :loading="isLoading"
               @click="$emit('click');"
        >
            {{ text }}
        </v-btn>
    </div>
</template>

<script>
export default {
    name: 'CommonCenterBtn',
    props: ['text', 'color', 'outlined', 'isLoading'],
};
</script>

<style scoped>

</style>
