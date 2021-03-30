<template>
  <!--      사진도 커스텀하게 선택 가능하게?        -->
  <v-avatar
    v-if="imgUrl"
    :size=size
    @click="$emit('click')"
  >
    <img
      :src="imgUrl"
      alt="profile"
    >
  </v-avatar>
  <div
    v-else-if="name"
    @click="$emit('click')"
  >
    <TextAvatar
      :name="getTruncatedName(name)"
      :size="size"
      :bgColor="backgroundColor"
    />
  </div>
  <v-avatar
    v-else
    :size=size
    @click="$emit('click')"
  >
    <img
      :src="require('@/images/default_profile_img.png')"
      alt="profile"
    >
  </v-avatar>
</template>

<script lang="ts">

import TextAvatar from '@/components/user/TextAvatar.vue';
import Vue from 'vue';
import { hashCode } from '@/utils/prototype';

const COLORS: string[] = [
  '#800080',
  '#008000',
  '#008080',
  '#8a2be2',
  '#d2691e',
  '#008b8b',
  '#b8860b',
  '#daa520',
  '#808080',
  '#ba55d3',
  '#c71585',
  '#ff4500',
  '#4169e1',
  '#8b4513',
  '#f4a460',
  '#2e8b57',
  '#6a5acd',
  '#4682b4',
  '#ff6347',
];

export default Vue.extend({
  name: 'UserProfileAvatar',
  components: { TextAvatar },
  props: {
    imgUrl: String,
    name: String,
    size: {
      type: Number,
      default: 40,
    },
    appendNumber: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    backgroundColor(): string {
      return COLORS[(hashCode(this.getTruncatedName(this.name)) + this.appendNumber) % COLORS.length];
    },
  },
  methods: {
    getTruncatedName(name: string): string {
      if (!name) return '';
      return name.length > 1 ? name.substring(name.length - 2, name.length) : name;
    },
  },
});
</script>
