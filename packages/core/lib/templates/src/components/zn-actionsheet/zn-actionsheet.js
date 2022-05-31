Component({
  // 组件的属性列表
  properties: {
    showTopView: {
      type: Boolean,
      value: true,
    },
    componentId: {
      type: String,
      value: '',
    },
    topViewTitle: {
      type: String,
      value: '',
    },
    showTip: {
      type: Boolean,
      value: false,
    },
    actionsheetObj: {
      type: Object,
      observer(newVal) {
        this.showZanActionsheet(newVal);
      },
    },
  },

  // 组件的初始数据
  data: {
    zanActionsheet: {},
  },

  // 在组件实例刚刚被创建时执行
  created() {},
  // 在组件实例进入页面节点树时执行
  attached() {},
  // 在组件在视图层布局完成后执行
  ready() {},
  // 在组件实例被从页面节点树移除时执行
  detached() {},
  // 组件的方法列表
  methods: {
    showZanActionsheet(options = {}) {
      // {
      //   type: '1',
      //   name: '选项1',
      //   subname: '选项描述语1',
      //   className: 'action-class',
      //   loading: false,
      // },
      // {
      //   type: '2',
      //   name: '选项2',
      //   subname: '选项描述语2',
      //   className: 'action-class',
      //   loading: false,
      // },
      // {
      //   type: 'share',
      //   name: '去分享',
      //   openType: 'share',
      // },
      const {
        cancelText = '',
        closeOnClickOverlay = true,
        actions = [],
        show = false,
      } = options;
      return new Promise((resolve, reject) => {
        this.setData({
          zanActionsheet: {
            show,
            cancelText,
            closeOnClickOverlay,
            actions,
            // 回调钩子
            resolve,
            reject,
          },
        });
      });
    },
    resolveCancelClick() {
      const zanActionsheetData = this.zanActionsheet || {};
      const {
        reject,
      } = zanActionsheetData;
      console.info('[zan:actionsheet:cancel]');
      // this.zanActionsheet.show = false;
      // this.$apply();
      console.log('sssss', zanActionsheetData);
      this.setData({
        'zanActionsheet.show': false,
      });
      if (reject) {
        reject({
          type: 'cancel',
        });
      }
    },
    handleZanActionsheetMaskClick({
      currentTarget = {},
    }) {
      const dataset = currentTarget.dataset || {};
      const {
        closeOnClickOverlay,
      } = dataset;
      // 判断是否在点击背景时需要关闭弹层
      if (!closeOnClickOverlay) {
        return;
      }
      this.resolveCancelClick.call(this);
    },
    handleZanActionsheetCancelBtnClick() {
      this.resolveCancelClick.call(this);
    },
    handleZanActionsheetBtnClick({
      currentTarget = {},
    }) {
      const zanActionsheetData = this.data.zanActionsheet || {};
      const {
        resolve,
      } = zanActionsheetData;
      const dataset = currentTarget.dataset || {};
      const {
        index,
        type,
      } = dataset;
      const action = this.data.zanActionsheet.actions[index];
      console.log(`item index ${index} clicked`);
      // 如果是分享按钮被点击, 不处理关闭
      // if (type === 'share') {
      //   return
      // }
      action.current = true;
      if (action.asyncJob) {
        action.asyncJob(index);
        // this.zanActionsheet.show = false;
        action.loding = false;
        // this.$apply();
      } else {
        // this.zanActionsheet.show = false;
        action.loding = false;
      }
      this.setData({
        'zanActionsheet.show': false,
        'zanActionsheet.action': action,
      });
      // this.$apply();
      resolve({
        type,
      });
    },
  },
});
