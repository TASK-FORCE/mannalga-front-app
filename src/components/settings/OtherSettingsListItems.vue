<template>
    <div>
        <div v-for="setting in settings"
             :key="setting.name"
        >
            <v-list-item>
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
                <v-icon>mdi-chevron-right</v-icon>
            </v-list-item>
            <v-divider />
        </div>
    </div>
</template>

<script>
import VerticalBarDivider from '@/components/VerticalBarDivider.vue';

export default {
    name: 'OtherSettingsListItems',
    components: { VerticalBarDivider },
    props: {
        settings: Array,
    },
};
</script>

<style scoped>

</style>
