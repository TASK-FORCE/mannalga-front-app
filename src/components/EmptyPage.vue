<template>
    <div class="text-center">
        <div class="icon-box">
            <v-icon class="icon"
                    size="70"
                    v-text="`$${icon}`"
            />
        </div>
        <div class="title">
            {{ title }}
        </div>
        <div class="description">
            {{ description }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'EmptyPage',
    props: {
        icon: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
    },
};
</script>

<style scoped
       lang="scss"
>
.icon-box {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: #f6f6f6;

    .icon {
        margin: auto;
        color: #A4A4A4;
    }
}

.title {
    font-weight: bold;
    font-size: 1.1rem;
    margin-top: 1rem;
    color: #666666;
}

.description {
    font-size: 0.9rem;
    color: #666666;
    opacity: 0.57;
}

.theme--dark {
    .icon-box {
        background: #292929;

        .icon {
            color: #666666;
        }
    }

    .title, .description {
        color: #9f9f9f;
    }
}
</style>
