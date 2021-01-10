<template>
    <div>
        <v-list-item @click="click(setting)">
            <v-icon>{{ setting.icon }}</v-icon>
            <span class="mx-2">{{ setting.name }}</span>
            <div v-if="setting.component">
                <VerticalBarDivider />
                <component :is="setting.component" />
            </div>
            <div v-if="setting.text">
                <VerticalBarDivider />
                {{ setting.text }}
            </div>
            <v-spacer />
            <v-icon v-text="'$chevronRight'" />
        </v-list-item>
        <v-divider />
    </div>
</template>

<script>
import VerticalBarDivider from '@/components/VerticalBarDivider.vue';

export default {
    name: 'UserSettingTemplate',
    components: { VerticalBarDivider },
    props: {
        setting: Object,
    },
    methods: {
        click({ path, clickCallback }) {
            if (path) {
                this.$router.push(path);
                return;
            }

            if (clickCallback) {
                clickCallback();
            }
        },
    },
};
</script>

<style scoped>

</style>
