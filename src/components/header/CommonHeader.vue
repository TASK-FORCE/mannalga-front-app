<template>
    <v-app-bar class="elevation-0"
               height="50px"
               app
    >
        <v-btn icon
               @click="$emit('click')"
        >
            <v-icon v-text="'$back'"/>
        </v-btn>
        <v-spacer />
        <span v-if="title"
              class="title"
        >
            {{ title }}
        </span>
    </v-app-bar>
</template>

<script>

export default {
    name: 'CommonHeader',
    props: {
        title: String,
    },
};
</script>

<style scoped>
.title {
    position: absolute;
    font-size: 1.1rem;
    left: 50%;
    transform: translate(-50%, 0);
}
</style>
