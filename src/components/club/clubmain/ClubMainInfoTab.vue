<template>
    <v-tab-item>
        <v-img src="https://picsum.photos/510/300?random"
               aspect-ratio="1.7"
        ></v-img>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title>{{ clubInfo.clubName }}</v-list-item-title>
                <v-list-item-subtitle>{{ clubInfo.clubInterest }} , {{ clubInfo.clubLocation }}</v-list-item-subtitle>
                <v-list-item-subtitle>가입 {{ clubInfo.memberCnt }}명/ 총 {{ clubInfo.memberMaxCnt }}명</v-list-item-subtitle>
                <v-list-item-subtitle>{{ clubInfo.clubDetail }}</v-list-item-subtitle>
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
    name: 'ClubMainInfoTab',
    props: ['clubInfo'],
};
</script>

<style scoped>
</style>
