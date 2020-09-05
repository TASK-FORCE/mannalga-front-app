<template>
    <v-tab-item>
        <v-img src="https://picsum.photos/510/300?random"
               aspect-ratio="1.7"
        ></v-img>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title>모임 이름</v-list-item-title>
                <v-list-item-subtitle>(모임 정보 예쁘게 아이콘으로 표시할 곳)</v-list-item-subtitle>
                <v-list-item-subtitle>(모임 소개글입니다. 모임 소개글입니다.)</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-list-item>
            <v-list-item-content>
                <v-timeline dense>
                    <v-timeline-item
                        v-for="n in 4"
                        :key="n"
                        large
                    >
                        <template v-slot:icon>
                            <v-avatar>
                                <img src="http://i.pravatar.cc/64">
                            </v-avatar>
                        </template>
                        <v-card class="elevation-2">
                            <v-card-text>Lorem ipsum dolor sit amet, no nam oblique veritus.</v-card-text>
                        </v-card>
                    </v-timeline-item>
                </v-timeline>
            </v-list-item-content>
        </v-list-item>
        <!-- @TODO 가입하기 버튼 -->
    </v-tab-item>
</template>

<script>
export default {
    name: 'ClubInfo',
};
</script>

<style scoped>
</style>
