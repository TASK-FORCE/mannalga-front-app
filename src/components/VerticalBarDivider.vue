<template>
    <span :class="getMargin"
          class="grey--text"
    > |
    </span>
</template>

<script>
export default {
    name: 'VerticalBarDivider',
    props: {
        margin: {
            type: Number,
            default: 2,
        },
    },
    computed: {
        getMargin() {
            return `mx-${this.margin}`;
        },
    },
};
</script>

<style scoped>

</style>
