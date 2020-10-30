<template>
    <div>
        <v-img src="https://picsum.photos/510/300?random"
               aspect-ratio="2"
        ></v-img>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title>{{ clubInfo.name }}</v-list-item-title>
                <v-list-item-subtitle v-html="description"/>
                <v-list-item-subtitle>{{ clubInfo.clubInterest }} , {{ clubInfo.clubLocation }}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <CommonCenterBtn text="가입하기"
                         outlined
        />
    </div>
</template>

<script>
import CommonCenterBtn from '@/components/ui/button/CommonCenterBtn.vue';

export default {
    name: 'ClubMainInfoDetailSection',
    components: { CommonCenterBtn },
    props: ['clubInfo'],
    computed: {
        description() {
            return this.clubInfo.description.replaceAll('\n', '<br />');
        },
    },
};
</script>

<style scoped>

</style>
