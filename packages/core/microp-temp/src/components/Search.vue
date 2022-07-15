<template>
  <div class="oms-search oms-container">
    <section class="oms-search-item" v-if="isShowSearch">
      <section class="oms-search-con"><slot name="search"></slot></section>
    </section>
    <section class="oms-search-item" v-if="isShowQuery">
      <section class="oms-search-con"><slot name="query"></slot></section>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'OmsSearch',
  computed: {
    isShowSearch(): boolean {
      return !!(this.$slots.search);
    },
    isShowQuery() {
      return !!(this.$slots.query);
    },
  },
});
</script>

<style lang="less" scoped>
.oms-container {
  border-radius: 4px;
}
.oms-search {
  display: flex;
  flex-flow: column nowrap;
  line-height: 32px;
  .oms-search-item {
    display: flex;
    flex-flow: row nowrap;
    margin: 5px 0;
    .oms-search-label {
      color: #000;
      flex-shrink: 0;
    }
    .oms-search-con {
      &:after {
        contain: none;
        display: block;
        clear: both;
      }
    }
  }
}
</style>
