<template>
    <div>
        <CommonHeader title="게시글" />
        <v-list-item>
            <v-list-item-avatar color="grey"></v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="font-weight-bold">[필독] 코딩 스터디 공지</v-list-item-title>
                <v-list-item-subtitle>01/01 10:42 작성자명</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-card-text>
            Visit ten places on our planet that are undergoing the biggest changes today.
        </v-card-text>

        <v-card-actions  class="float-left">
            <v-btn icon>
                <v-icon small>mdi-thumb-up-outline</v-icon> 3
            </v-btn>
            <v-btn icon>
                <v-icon small>mdi-comment-text-outline</v-icon> 2
            </v-btn>
        </v-card-actions>
        <v-card-actions  class="float-right">
            <v-btn
                text
                outlined
            >
                수정
            </v-btn>
            <v-btn
                text
                outlined
            >
                삭제
            </v-btn>
        </v-card-actions>
        <CommonComments />
    </div>
</template>

<script>
import CommonHeader from '@/components/common/CommonHeader.vue';
import CommonComments from '@/components/common/CommonComments.vue';

export default {
    name: 'ClubBoardPost',
    components: { CommonHeader, CommonComments },
    // props: ['seq'],
    data() {
        return {
        };
    },
    computed: {
    },
    methods: {
    },
};
</script>
