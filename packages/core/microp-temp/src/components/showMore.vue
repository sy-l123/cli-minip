<template>
  <div>
    <span class="content-space" :class="[showall ? 'content-space-no' : '']">{{content}}</span>
    <el-button v-if="content && content.length > contentLength && !showall" type="text" @click="showall =! showall">{{showText}}</el-button>
  </div>
</template>
<script>
export default {
  props: {
    content: {
      type: String,
      default() {
        return '';
      },
    },
    showall: {
      type: Boolean,
      default() {
        return false;
      },
    },
    contentLength: {
      type: Number,
      default() {
        return 42;
      },
    },
    showText: {
      type: String,
      default() {
        return '查看';
      },
    },
  },
};
</script>
<style lang="less" scoped>
.content-space {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.content-space-no {
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  word-wrap: break-word !important;
}
</style>
