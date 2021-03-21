<template>
  <v-row class="mx-0">
    <v-col class="pa-0">
      <v-menu
        v-model="dateMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        min-width="290px"
        offset-y
        transition="scale-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            :label="dateLabel"
            :rules="RULES.DATE"
            prepend-icon="$calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          :min="minDate"
          @input="dateMenu = false"
        ></v-date-picker>
      </v-menu>
    </v-col>
    <v-col class="py-0">
      <v-menu
        v-model="timeMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        min-width="290px"
        offset-y
        transition="scale-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="time"
            :label="timeLabel"
            :rules="RULES.TIME"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-model="time"
          :min="minTime"
          format="24hr"
          @input="timeMenu = false"
        ></v-time-picker>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script lang="ts">

import { RULES } from '@/utils/common/constant/rules.ts';
import Vue from 'vue';

export default Vue.extend({
  name: 'DateTimePicker',
  props: {
    dateLabel: String,
    timeLabel: String,
    minDate: String,
    minTime: String,
    dateTime: {
      type: Object,
    },
  },
  data() {
    return {
      dateMenu: false,
      date: this.dateTime.date,
      timeMenu: false,
      time: this.dateTime.time,
      RULES,
    };
  },
  watch: {
    dateTime() {
      this.date = this.dateTime.date;
      this.time = this.dateTime.time;
    },
    date() {
      this.$emit('changeDateTime', { date: this.date, time: this.time });
    },
    time() {
      this.$emit('changeDateTime', { date: this.date, time: this.time });
    },
  },
});
</script>

<style scoped>

</style>
