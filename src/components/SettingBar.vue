<template>
    <div v-ripple
         class="pl-5 pr-3 mt-4 d-flex"
         @click="$emit('click')"
    >
        <div>
            <WindMill v-if="isWindmill"
                      :color="windMillColor"
                      :width="18"
                      :height="18"
                      class="windmill mt-1"
            />
            <v-icon v-else
                    class="icon"
                    size="25"
                    v-text="`$${icon}`"
            />
        </div>
        <div class="ml-2 bar-title"
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
        <div class="chevron-box">
            <v-icon class="chevron"
                    size="25"
                    v-text="'$chevronRight'"
            />
        </div>
    </div>
</template>

<script>
import WindMill from '@/components/icons/WindMill.vue';
import gettersHelper from '@/store/helper/GettersHelper.js';

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
        windMillColor() {
            if (gettersHelper.isDarkTheme()) {
                return '#F5F5F5';
            }
            return '#292929';
        },
    },
};
</script>

<style scoped
       lang="scss"
>
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

.theme--dark {
    .icon, .bar-title {
        color: #F5F5F5 !important;
    }

    .chevron {
        color: #666666 !important;
    }

    .bar-description {
        color: #9f9f9f;
    }
}
</style>
