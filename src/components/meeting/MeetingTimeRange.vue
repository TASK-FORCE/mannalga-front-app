<template>
    <div class="text-center f-07">
        <span class="meeting-time-text">{{ startTime }}</span>
        <span class="mx-1 font-weight-bold">~</span>
        <span class="meeting-time-text">{{ endTime }}</span>
    </div>
</template>

<script>
export default {
    name: 'MeetingTimeRange',
    props: {
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>
.meeting-time-text {
    border: 1px solid #795548;
    padding: 2px 8px;
    border-radius: 10px;
}
</style>
