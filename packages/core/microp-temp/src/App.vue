<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="subTab">
      <component :is="Component" :key="route.fullPath" v-if="route.meta.isKeepAlive" />
    </keep-alive>
    <component :is="Component" :key="route.fullPath" v-if="!route.meta.isKeepAlive" />
  </router-view>
</template>

<script setup lang="ts">
import { onMounted, reactive, toRefs } from 'vue';

const data = reactive({
  subTab: '',
});

onMounted(() => {
  try {
    (window as any).zn_mainBus.$on('sub-tab', (info: string) => {
      const tabs = JSON.parse(info).map((item: any) => {
        item.path = item.path.replace('/goodManager/', '');
        item.path = item.path.replace('/base/', '');
        if (item.path.indexOf('?') > -1) {
          // eslint-disable-next-line prefer-destructuring
          item.path = item.path.split('?')[0];
        }
        return item.path;
      });
      data.subTab = tabs.join(',');
    });
  } catch (e) {
    //
  }
});

const {
  subTab,
} = toRefs(data);

</script>
