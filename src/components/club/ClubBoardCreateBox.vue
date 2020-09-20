<template>
    <div class="field-wrapper">
        <v-text-field class="pa-0"
                        label="글 제목"
        />
        <v-textarea outlined
                    label="내용을 작성해주세요."
        ></v-textarea>
    </div>
</template>

<script>
export default {
    name: 'ClubBoardCreateBox',
    methods: {
        
    },
};
</script>

<style scoped>
.field-wrapper {
    margin-top: 2rem;
    padding-left: 2rem;
    padding-right: 2rem;
}
</style>
