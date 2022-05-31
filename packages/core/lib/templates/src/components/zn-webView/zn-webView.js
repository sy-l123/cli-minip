import utils from '../../utils/index';
import {
  host,
} from '../../config/index';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    options: {
      type: Object,
      value: {},
      observer(newVal, oldVal) {
        // 第一次初始化 不需要走该刷新方法
        if (!utils.isEmpty(oldVal) && !utils.isEmpty(newVal) && oldVal !== newVal) {
          this.initComponent(newVal);
        }
      },
    },
    // 父级页面是否展现
    isShow: {
      type: Boolean,
      value: true,
    },
    pageKind: {
      type: String,
      default: '',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    link: '', // 网址url
    defaultLinks: {
      deviceList: `${host.domainWebHost}/device/device_list?title=设备列表&inTab=1`,
      orderList: `${host.domainWebHost}/order/bsorder_list?title=我的订单&inTab=1`,
      mine: `${host.domainWebHost}/person/mine?inTab=1`,
      message: `${host.domainWebHost}/person/news?title=消息&inTab=1`,
    },
    webShow: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 初始化
    initComponent(options) {
      console.log('znweb initComponent------>');
      // 页面url
      let link = '';
      if (this.properties.pageKind) {
        try {
          link = this.data.defaultLinks[this.properties.pageKind];
        } catch (error) {
          // 1
        }
      }
      if (options.link) {
        link = decodeURIComponent(options.link);
      }
      const wxfw = {};
      // 用户信息
      if (!options.noUserInfo) {
        wxfw.app = 'wx7666ce36ed9a06c0';
        wxfw.appid = '10002';
      }
      const wxfwStr = JSON.stringify(wxfw);
      if (wxfwStr !== '{}') {
        if (link.indexOf('?') > -1 && !link.endsWith('?')) {
          link += `&wxfw=${wxfwStr}`;
        } else if (link.endsWith('?')) {
          link += `wxfw=${wxfwStr}`;
        } else {
          link += `?wxfw=${wxfwStr}`;
        }
        // eslint-disable-next-line no-useless-concat
        link += `${'&' + 't='}${(new Date()).getTime().toString()}`;
      }
      // 页面刷新
      let needRefresh = false;
      if (options.needRefresh) {
        needRefresh = true;
      }
      console.log('initComponent links--->', link);
      this.setData({
        link,
        webShow: needRefresh ? this.properties.isShow : true,
      });
    },
    // 获取web消息
    getmsg(event) {
      console.log('____H5 postMSG ', event.detail.data);
      this.triggerEvent('getmsg', event.detail.data);
    },

    // web加载成功
    webviewLoaded() {
      console.log('web加载成功');
      this.triggerEvent('webviewLoaded');
    },

    // web加载失败
    webviewError(e) {
      console.log('web加载失败', e);
      this.triggerEvent('webviewError', e);
    },
  },

  /**
   * 生命周期
   */
  attached() {
    // 在组件实例进入页面节点树时执行
    const {
      options,
    } = this.properties;
    this.initComponent(options);
  },

  detached() {
    // 在组件实例被从页面节点树移除时执行
  },
});
