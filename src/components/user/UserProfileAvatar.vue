<template>
    <!--      사진도 커스텀하게 선택 가능하게?        -->
    <v-avatar v-if="imgUrl"
              :size=size
    >
        <img :src="imgUrl"
             alt="profile"
        >
    </v-avatar>
    <div v-else-if="name">
        <div class="name-avatar"
             :style="getBoxClass(name)"
        >
            <span class="name-avatar-text"
                  :style="`font-size: ${size / 40}rem`"
            >
                {{ getTruncatedName(name) }}
            </span>
        </div>
    </div>
    <v-avatar v-else
              :size=size
    >
        <img :src="require('@/images/default_profile_img.png')"
             alt="profile"
        >
    </v-avatar>
</template>

<script>

const COLORS = [
    '#800080',
    '#008000',
    '#008080',
    '#8a2be2',
    '#d2691e',
    '#008b8b',
    '#b8860b',
    '#daa520',
    '#808080',
    '#ba55d3',
    '#c71585',
    '#ff4500',
    '#4169e1',
    '#8b4513',
    '#f4a460',
    '#2e8b57',
    '#6a5acd',
    '#4682b4',
    '#ff6347',
];

export default {
    name: 'UserProfileAvatar',
    props: {
        imgUrl: String,
        name: String,
        size: {
            type: Number,
            default: 40,
        },
        appendNumber: {
            type: Number,
            default: 0,
        },
    },
    methods: {
        getBoxClass(name) {
            if (!name) return {};
            return {
                width: `${this.size}px`,
                height: `${this.size}px`,
                backgroundColor: COLORS[(this.getTruncatedName(name).hashCode() + this.appendNumber) % COLORS.length],
            };
        },
        getTruncatedName(name) {
            if (!name) return {};
            return name.length > 1 ? name.substring(name.length - 2, name.length) : name;
        },
    },
};
</script>

<style scoped
       lang="scss"
>
.name-avatar {
    border-radius: 50%;
    position: relative;

    .name-avatar-text {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100%;
        text-align: center;
        transform: translate(-50%, -50%);
        color: white;
    }
}
</style>
