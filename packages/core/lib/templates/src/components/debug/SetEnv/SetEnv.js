import { envList } from '../../../config/host';
import { env } from '../../../config/index';
import { key } from '../../../config/localKey';
import { hc } from '../../../utils/base';

Component({
  data: {
    curEnv: env,
    envList: [],
    envShow: false,
  },
  lifetimes: {
    attached() {
      const list = envList.map((e) => (e.name));
      this.setData({ envList: list });
    },
  },
  methods: {
    changeEnv() {
      this.setData({ envShow: true });
    },
    closeEnv() {
      this.setData({ envShow: false });
    },
    selectedEnv(e) {
      try {
        const Env = e.currentTarget.dataset.env;
        hc(key.env, Env);
        wx.showModal({
          title: '提示',
          content: '点击右上角三个点的icon，选择重新进入小程序，即可完成环境切换',
          showCancel: false,
          success: (res) => {
            if (res.confirm) {
              this.closeEnv();
            }
          },
        });
      } catch (error) {
        console.error('环境获取失败！');
      }
    },
  },
});
