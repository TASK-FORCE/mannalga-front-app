<template>
    <div>
        <v-list-item :key="meeting.id"
                     :to="`/meeting_main/${meeting.id}`"
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
                                <v-icon>mdi-book-open-variant</v-icon>
                            </v-btn>
                            <span class="ml-1"
                                  style="font-size: 0.9rem"
                            >
                                {{ meeting.location }}
                            </span>
                        </div>
                        <div class="mt-1"
                             style="font-size: 1.1rem"
                        >
                            {{ meeting.title }}
                        </div>
                    </v-col>
                    <v-col align-self="center"
                           class="pa-0"
                    >
                        <div>
                            {{ meeting.memberCount }}명
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
    props: ['meeting'],
};
</script>

<style scoped>

</style>
