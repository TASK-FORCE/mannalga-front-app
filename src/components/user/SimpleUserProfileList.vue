<template>
    <div>
        <div v-for="user in users"
             :key="user.seq"
        >
            <SimpleUserProfile :user="user"
                               class="my-2"
            />
            <v-divider />
        </div>
    </div>
</template>

<script lang="ts">
import SimpleUserProfile from '@/components/user/SimpleUserProfile.vue';
import Vue from 'vue';

export default Vue.extend({
    name: 'SimpleUserProfileList',
    components: { SimpleUserProfile },
    props: {
        /**
         * seq, imageUrl, name
         */
        users: {
            type: Array,
            default: () => [],
        },
    },
});
</script>

<style scoped>

</style>
