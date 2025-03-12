<template>
  <q-item
    clickable
    tag="router-link"
    :to="link"
    :active="active"
    v-ripple
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon
        :name="icon"
        class="essential-link__text"
      />
    </q-item-section>

    <q-item-section class="essential-link__text">
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label
        caption
        class="essential-link__text"
      >
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link: string;
  icon?: string;
  active?: boolean;
};

withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
  active: false,
});
</script>

<style>
  .essential-link__text {
    color: #b8bcc2;
  }
</style>
