<template>
  <div class="form-beautify">
    <el-form-item
      v-if="label"
      :label="label"
      :rules="{ 'required': required }"
      class="label"
      :label-width="labelWidth"
    ></el-form-item>
    <div class="form-content-box">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'form-beautify',
  props: {
    label: String,
    labelWidth: String,
    required: Boolean,
  },
};
</script>

<style lang="less" scoped>
.form-beautify {
  display: flex;
  .form-content-box {
    flex: 1;
  }
  .label {
    padding-right: 0;
  }

  .dimension {
    display: inline-block;
    .el-radio-button__inner {
      width: 100px;
    }
  }

  :deep(.el-form-item__label) {
    padding: 0;
  }
}
</style>
