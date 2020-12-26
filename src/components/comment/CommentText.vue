<template>
    <div class="text-wrapper">
        <div class="my-auto">
            <div class="f-08">
                <span class="font-weight-bold">이동명</span>
                <span class="ml-2">2020-12-26 15:30</span>
            </div>
            <div class="text-divider" />
            <div class="f-09">
                {{ text }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CommentText',
    props: {
        text: String,
    },
};
</script>

<style scoped
       lang="scss"
>
.text-wrapper {
    padding: 4px 12px;
    border-radius: 10px;
    display: flex;
    background-color: #e0e0e0;

    .text-divider {
        height: 1px;
        background-color: #00000061;
        margin: 2px 0;
    }
}

.theme--dark {
    .text-wrapper {
        background-color: #424242;

        .text-divider {
            background-color: #bdbdbd;
        }
    }
}
</style>
