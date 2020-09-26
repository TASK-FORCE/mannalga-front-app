<template>
    <div>
        <v-list-item :key="club.seq"
                     :to="`/club/main/${club.seq}`"
        >
            <div>
                <v-img src="../images/vue.png"
                       max-width="60"
                       max-height="50"
                />
            </div>
            <div class="ml-5 w-100">
                <v-row>
                    <v-col cols="10">
                        <div>
                            <v-btn fab
                                   x-small
                                   width="28"
                                   height="28"
                                   outlined
                                   color="light-green"
                            >
                                <!--   TODO 관심사별 아이콘 정의 필요  -->
                                <v-icon>mdi-book-open-variant</v-icon>
                            </v-btn>
                            <span class="ml-1"
                                  style="font-size: 0.9rem"
                            >
                                {{ firstLocation.name }} | {{ firstInterest.name }}
                            </span>
                        </div>
                        <div class="mt-1">
                            {{ club.id }} {{ club.name }}
                        </div>
                    </v-col>
                    <v-col align-self="center"
                           class="pa-0 text-body-2"

                    >
                        <div style="font-size: 0.8rem">
                            {{ club.userCount }}/{{ club.maximumNumber }}
                        </div>
                    </v-col>
                </v-row>

            </div>
        </v-list-item>
        <v-divider />
    </div>
</template>

<script>
export default {
    name: 'ClubPost',
    props: ['club'],
    computed: {
        firstLocation() {
            const { state } = this.club.states.find(({ priority }) => priority === 1);
            return state;
        },
        firstInterest() {
            const { interest } = this.club.interests.find(({ priority }) => priority === 1);
            return interest;
        },
    },
};
</script>

<style scoped>

</style>
