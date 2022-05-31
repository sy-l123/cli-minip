// eslint-disable-next-line import/extensions
import { env } from '../../config/index';
// eslint-disable-next-line import/extensions
const sensors = null;

const app = getApp();
export default class Sensor {
  constructor(pagePath, pageTitle) {
    this.page_path = pagePath; // 页面url
    this.page_title = pageTitle; // 页面标题
    this.ts = new Date().getTime();
  }

  // eslint-disable-next-line class-methods-use-this
  init() {
    env === 'cn' && sensors.setPara({
      name: 'sensors',
      server_url: 'https://rhybrid.znlhzl.cn/sa?project=production',
      // 全埋点控制开关
      autoTrack: {
        mpClick: true,
      },
      // 自定义渠道追踪参数，如source_channel: ["custom_param"]
      source_channel: [],
      // 是否允许控制台打印查看埋点数据(建议开启查看)
      show_log: false,
      // 是否允许修改 onShareAppMessage 里 return 的 path，用来增加(登录 ID，分享层级，当前的 path)，在 app onShow 中自动获取这些参数来查看具体分享来源、层级等
      allow_amend_share_path: true,
    });
    env === 'cn' && sensors.setOpenid(app.globalData.openId);
    env === 'cn' && sensors.registerApp({
      userId: app.globalData.phone,
    });
    env === 'cn' && sensors.login(app.globalData.phone);
    env === 'cn' && sensors.init();
  }

  pageEnter(eventId, params) {
    const obj = {
      ts: this.ts,
      page_path: this.page_path,
      page_title: this.page_title,
      type: 'page_enter',
      ...params,
    };
    env === 'cn' && sensors.track(eventId, obj);
  }

  pageLeave(eventId, params, pageEnterTime) {
    const obj = {
      ts: this.ts,
      page_path: this.page_path,
      page_title: this.page_title,
      page_duration: this.ts - pageEnterTime,
      type: 'page_leave',
      ...params,
    };
    env === 'cn' && sensors.track(eventId, obj);
  }

  event(eventId, params) {
    const obj = {
      ts: this.ts,
      page_path: this.page_path,
      page_title: this.page_title,
      type: 'event',
      ...params,
    };
    env === 'cn' && sensors.track(eventId, obj);
  }
}
