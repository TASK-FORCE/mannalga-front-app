<template>
    <div v-ripple
         class="pl-5 pr-3 d-flex"
         @click="$emit('click')"
    >
        <div class="my-auto">
            <WindMill v-if="isWindmill"
                      color="#292929"
                      :width="18"
                      :height="18"
                      class="windmill mt-1"
            />
            <v-icon v-else
                    class="icon"
                    v-text="`$${icon}`"
            />
        </div>
        <div class="ml-2 bar-title my-auto"
             :style="description ? {width: '70px'} : ''"
        >
            {{ title }}
        </div>
        <v-spacer />
        <div v-if="description"
             class="bar-description my-auto"
        >
            {{ description }}
        </div>
        <div class="chevron-box my-auto">
            <v-icon class="chevron"
                    size="30"
                    v-text="'$chevronRight'"
            />
        </div>
    </div>
</template>

<script>
import WindMill from '@/components/icons/WindMill.vue';

export default {
    name: 'SettingBar',
    components: { WindMill },
    props: {
        title: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
        description: String,
    },
    computed: {
        isWindmill() {
            return this.icon === 'windmill';
        },
    },
};
</script>

<style scoped>
.icon {
    color: #292929 !important;
}

.chevron {
    color: #9f9f9f !important;
}

.windmill {
    margin-left: 3px;
}

.bar-title {
    color: #292929;
    font-weight: 500;
    font-size: 16px;
}

.chevron-box {
    width: 30px;
}

.bar-description {
    font-size: 14px;
    font-weight: 500;
    color: #666666;
    margin-right: 4px;
    margin-left: 4px;
    word-break: keep-all;
    text-align: right;
    width: 100%;
}
</style>
