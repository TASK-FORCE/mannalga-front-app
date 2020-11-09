<template>
    <div>
        <v-list-item :key="myClub.seq"
                     :to="`/club/${myClub.seq}`"
        >
            <div>
                <v-img src="@/images/vue.png"
                       max-width="60"
                       max-height="50"
                />
            </div>
            <div class="ml-5 w-100">
                <v-row>
                    <v-col cols="10">
                        <div>
                            <span v-for="(myRole, index) in myRoles"
                                  :key="index"
                                  class="ml-1 f-09"
                            >
                                {{ myRole.roleGroupName }} : {{ myRole.name }}
                            </span>
                        </div>
                        <div class="mt-1">
                            {{ myClub.id }} {{ myClub.name }}
                        </div>
                    </v-col>
                    <v-col align-self="center"
                           class="pa-0 text-body-2"

                    >
                        <div class="f-08">
                            {{ myClub.userCount }}/{{ myClub.maximumNumber }}
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
    name: 'MyClubPost',
    props: {
        myClubContext: {
            type: Object,
        },
    },
    computed: {
        myClub() {
            return this.myClubContext.club;
        },
        myRoles() {
            return this.myClubContext.roles;
        },
    },
};
</script>

<style scoped>

</style>
