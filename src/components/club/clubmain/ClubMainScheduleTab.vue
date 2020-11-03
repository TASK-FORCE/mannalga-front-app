<template>
    <v-tab-item>
        <v-card-text class="py-0">
            <v-timeline dense>
                <v-timeline-item
                    color="pink"
                    small
                >
                    <v-row>
                        <v-col cols="4">
                            <strong>5월 22일</strong>
                        </v-col>
                        <v-col>
                            <strong>6회차 스터디 - 쿠버</strong>
                            <div class="caption">판교 오픈커피 1시</div>
                        </v-col>
                    </v-row>
                </v-timeline-item>

                <v-timeline-item
                    color="teal lighten-3"
                    small
                >
                    <v-row>
                        <v-col cols="4">
                            <strong>5월 22일</strong>
                        </v-col>
                        <v-col>
                            <strong>5회차 스터디 - 뷰</strong>
                            <div class="caption">판교 오픈커피 1시</div>
                        </v-col>
                    </v-row>
                </v-timeline-item>

                <v-timeline-item
                    color="pink"
                    small
                >
                    <v-row>
                        <v-col cols="4">
                            <strong>5월 22일</strong>
                        </v-col>
                        <v-col>
                            <strong>4회차 스터디 - 리액트</strong>
                            <div class="caption">판교 오픈커피 1시</div>
                        </v-col>
                    </v-row>
                </v-timeline-item>

                <v-timeline-item
                    color="teal lighten-3"
                    small
                >
                    <v-row>
                        <v-col cols="4">
                            <strong>5월 22일</strong>
                        </v-col>
                        <v-col>
                            <strong>3회차 스터디 - 도커</strong>
                            <div class="caption">판교 오픈커피 1시</div>
                        </v-col>
                    </v-row>
                </v-timeline-item>

                <v-timeline-item
                    color="pink"
                    small
                >
                    <v-row>
                        <v-col cols="4">
                            <strong>5월 22일</strong>
                        </v-col>
                        <v-col>
                            <strong>2회차 스터디 - GIT</strong>
                            <div class="caption">판교 오픈커피 1시</div>
                        </v-col>
                    </v-row>
                </v-timeline-item>
            </v-timeline>

        </v-card-text>
        <FixedCreateBtn color="red" />
    </v-tab-item>
    <!-- @TODO 일정 추가하기 버튼 -->
</template>

<script>
import FixedCreateBtn from '@/components/ui/button/FixedCreateBtn.vue';

export default {
    name: 'ClubMainScheduleTab',
    components: { FixedCreateBtn },
    // @TODO 일정 CRUD
};
</script>

<style scoped>
</style>
