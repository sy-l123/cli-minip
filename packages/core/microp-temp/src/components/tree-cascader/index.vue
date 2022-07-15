<template>
  <div class="tree-cascader">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="tree-box">
          <el-scrollbar :style="{'height': height+'px'}">
            <el-tree
              ref="treeRef"
              :data="dataAll"
              show-checkbox
              :render-after-expand="false"
              node-key="id"
              @check-change="checkChange"
              :check-on-click-node="true"
              :default-expanded-keys="chooseIds"
              :default-checked-keys="chooseIds">
            </el-tree>
          </el-scrollbar>
        </div>
      </el-col>

      <el-col :span="12">
        <div class="tree-box list-box">
          <el-scrollbar :style="{'height': height+'px'}">
            <el-table
              :data="tableData"
              :max-height="height+'px'"
              style="width: 100%"
              :show-header="false">
              <el-table-column>
                <template v-slot="scope">
                  <el-row type="flex" justify="space-between">
                    <el-col :span="22">{{scope.row.label}}</el-col>
                    <el-col :span="2"> <el-icon @click="choseList(scope.row.id)"><close /></el-icon></el-col>
                  </el-row>
                  <div></div>
                </template>
              </el-table-column>
            </el-table>
          </el-scrollbar>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import {
  reactive, ref, defineComponent, toRefs, onMounted, computed, watch,
} from 'vue';

export default defineComponent({
  name: 'BrandManageTreeCascader',
  emits: ['change'],
  props: {
    // 默认禁用到2级
    disabledLevel: {
      type: Number,
      default: 2,
    },
    height: {
      type: Number,
      default: 400,
    },
    value: {
      type: Array,
      default: () => [],
    },
    option: {
      type: Array,
      default: () => [],
    },
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  setup(props:any, ctx:any) {
    const dataValue = reactive({
      dataAll: [],
      chooseIds: [...props.value],
      tableData: [],
      treeData: {},
    });
    // eslint-disable-next-line vue/return-in-computed-property,no-unused-expressions
    // const treeStyle = computed(() => { `${props.height}px`; });
    const treeRef = ref();
    const initData = (data:any) => {
      dataValue.treeData = {};
      // eslint-disable-next-line no-use-before-define
      handleData(data, null, 1);
      // 默认全部展开
      dataValue.dataAll = data;
      // eslint-disable-next-line no-use-before-define
      getChooseList();
    };
    // 递归处理级联数据
    const handleData = (data:any, parentId:any, level:any) => {
      data.forEach((item:any) => {
        // 设置禁用
        item.disabled = level <= props.disabledLevel;
        const { children, ...plainData } = item;
        // 扁平比数据结构
        dataValue.treeData[item.id] = {
          ...plainData,
          parentId,
        };
        // 还有下一级，递归调用
        if (children && children.length > 0) {
          handleData(children, item.id, level + 1);
        }
      });
    };
    // 根据id获取全链路
    const getFullpathById:any = (id:any, pathNames:any) => {
      const node = dataValue.treeData[id];
      if (!node) {
        return [];
      }
      pathNames.push(node.label);
      if (node.parentId) {
        return getFullpathById(node.parentId, pathNames);
      }
      return pathNames;
    };
    // 处理左侧列表数据
    const getChooseList = () => {
      dataValue.tableData = JSON.parse(JSON.stringify(dataValue.chooseIds.map((id) => ({ id, label: getFullpathById(id, []).reverse().join('-') })).filter(({ label }) => label)));
    };
    // 选中状态改变
    const checkChange = (node:any, bool:any) => {
      // 父节点不做处理
      if (node.disabled) {
        return;
      }
      // eslint-disable-next-line no-use-before-define
      handleCheckChange(node, bool);
      ctx.emit('change', [...dataValue.chooseIds]);
    };
    const handleCheckChange = (node:any, bool:any) => {
      // 如果是选中
      if (bool) {
        if (dataValue.chooseIds.includes(node.id)) {
          return;
        }
        dataValue.chooseIds.push(node.id);
        return;
      }
      // 取消选中
      dataValue.chooseIds = dataValue.chooseIds.filter((id) => node.id !== id);
    };
    // 左侧列表关闭
    const choseList = (id:any) => {
      checkChange(dataValue.treeData[id], false);
      treeRef.value.setCheckedKeys(dataValue.chooseIds, false);
      treeRef.value.setChecked(id, false, true);
    };
    onMounted(() => {
      initData(props.option);
    });
    watch(() => props.option, (newVal) => {
      initData(newVal);
    }, {
      deep: true,
    });
    watch(() => props.value, (newVal) => {
      dataValue.chooseIds = [...newVal];
    }, {
      deep: true,
    });
    watch(() => dataValue.chooseIds, (newVal) => {
      getChooseList();
    }, {
      deep: true,
    });
    const {
      dataAll, chooseIds, tableData, treeData,
    } = toRefs(dataValue);
    return {
      dataAll,
      chooseIds,
      tableData,
      treeData,
      treeRef,
      checkChange,
      choseList,
    };
  },
});
</script>
<style lang='less' scoped>
  .tree-cascader{
    width: 100%;
    overflow: hidden;
    .el-table::before{
      display: none;
    }
    .tree-box{
      border: 1px solid #dddddd;
      background-color: #ffffff;
      border-radius: 6px;
      overflow: hidden;
      padding-bottom: 10px;
    }
    .list-box{
      margin-left: 20px;
    }
    .el-icon-close{
      font-size: 14px;
      cursor: pointer;
      line-height: 24px;
      &:hover{
        color: #3673FF;
      }
    }
    :deep(.el-scrollbar){
      padding-bottom: 15px;
    }
    :deep(.el-scrollbar__wrap){
      height: calc(100% + 17px);
    }
    :deep(.el-scrollbar__view){
      height: 100%;
    }
    :deep(.el-scrollbar__view .el-table){
      height: 100%;
    }
    :deep(.el-scrollbar__view .el-table .el-table__inner-wrapper){
      height: 100%;
    }
  }
</style>
