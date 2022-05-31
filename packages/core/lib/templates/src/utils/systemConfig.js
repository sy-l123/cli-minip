import utils from './index';
import {
  RTICK,
  LOCATION,
  TOKEN,
  CHANNEL,
  CITY,
} from '../config/localKey';
import { cityInServiceApi } from '../api/index';

const wxRequest = utils.promisify(wx.request);

class Config {
  constructor() {
    // 存入接口请求唯一值，后台防重需要
    utils.hc(RTICK, utils.operate.getUniqueId());
    // this.setSystemInfo();
  }

  // 获取系统信息
  async setSystemInfo() {
    const res = wx.getSystemInfoSync();
    console.log('获取系统信息', res);
    const systemInfo = Object.create(null);
    // 状态栏的高度，单位px
    systemInfo.statusBarHeight = res.statusBarHeight;
    // 设备像素比
    systemInfo.pixelRatio = res.pixelRatio;
    // 可使用窗口高度, 宽度 单位为px
    systemInfo.windowWidth = res.windowWidth;
    systemInfo.windowHeight = res.windowHeight;
    // 手机品牌
    systemInfo.brand = res.brand || '';
    // 客户端平台
    systemInfo.platform = res.platform;
    // 是否iOS系统 苹果手机
    const checkIOS = res.platform && res.platform.toLowerCase() === 'ios';
    systemInfo.checkIOS = checkIOS;
    // 微信版本号
    systemInfo.version = res.version;
    // 操作系统及版本
    systemInfo.system = res.system;
    // appId 2.12.3才支持
    // systemInfo.appId = res.host && res.host.appId;
    try {
      // 胶囊位置信息
      // const menuBtnPosi = wx.getMenuButtonBoundingClientRect();
      // // 胶囊实际位置，坐标信息不是左上角原点
      // const btnPosi = {
      //   height: menuBtnPosi.height,
      //   width: menuBtnPosi.width,
      //   // 胶囊top - 状态栏高度
      //   top: menuBtnPosi.top - res.statusBarHeight,
      //   // 胶囊bottom - 胶囊height - 状态栏height （胶囊实际bottom 为距离导航栏底部的长度）
      //   bottom: menuBtnPosi.bottom - menuBtnPosi.height - res.statusBarHeight,
      //   bottomRe: menuBtnPosi.top - res.statusBarHeight,
      //   // 这里不能获取 屏幕宽度，PC端打开小程序会有BUG，要获取窗口高度 - 胶囊right
      //   right: res.windowWidth - menuBtnPosi.right,
      // };
      // console.log('menuBtnPosi-->', systemInfo.statusBarHeight, menuBtnPosi, btnPosi);
      // // 自定义导航栏高度 （不带statusBarHeight）
      // const cusnavH = btnPosi.height + btnPosi.top + btnPosi.bottom;
      // systemInfo.customNavHeight = cusnavH;
      // // 导航栏高度 = 胶囊bottom + 胶囊实际bottom
      // const navbarHeight = menuBtnPosi.bottom + btnPosi.bottom;
      // systemInfo.navbarHeight = navbarHeight;
      // 手机型号
      // eslint-disable-next-line prefer-destructuring
      const {
        model,
      } = res;
      systemInfo.model = model;
      // 适配 iphone 11 12 13
      const modelX = model && (model.includes('iPhone X') || model.includes('iPhone 11') || model.includes('iPhone 12') || model.includes('iPhone 13'));
      systemInfo.modelX = modelX;
    } catch (error) {
      console.log('menuBtnPosi error', error);
    }
    this.systemInfo = systemInfo;
  }

  // 获取footer高度
  footerHeight(footTabHeight = 98) {
    let footerHeight = 0;
    if (this.systemInfo) {
      const {
        safeArea,
        windowHeight,
        pixelRatio,
        modelX,
      } = this.systemInfo;
      // 安全区域
      if (safeArea && safeArea.bottom) {
        const safeBottomGap = (windowHeight - safeArea.bottom > 0) ? (windowHeight - safeArea.bottom) : 0;
        // 底部安全高度
        this.systemInfo.safeBottomHeight = safeBottomGap;
        footerHeight = footTabHeight * pixelRatio + safeBottomGap;
      } else {
        footerHeight = footTabHeight * pixelRatio + (modelX ? 34 : 0);
      }
    }
    return footerHeight;
  }

  // 获取定位信息
  // eslint-disable-next-line class-methods-use-this
  async locationInfo() {
    const self = this;
    const setting = await wx.getSetting();
    if (setting.authSetting['scope.userLocation'] === false) {
      // 未授权
      // https://developers.weixin.qq.com/community/develop/doc/000cea2305cc5047af5733de751008
      console.log('未授权定位');
      this.storageNJCity();
    } else {
      try {
        const location = await wx.getLocation({ type: 'gcj02' });
        if (location.errMsg === 'getLocation:ok') {
          this.systemInfo.longitude = location.longitude;
          this.systemInfo.latitude = location.latitude;
          const locationObj = {
            longitude: location.longitude,
            latitude: location.latitude,
          };
          utils.hc(LOCATION, JSON.stringify(locationObj));
          await self.getCityInfo(locationObj).then((resCity) => {
            const cityInfo = (resCity && resCity.data && resCity.data.data && resCity.data.data.areaDto && resCity.data.data.areaDto.cityEntity) || {};
            console.log('loc cityInfo->', cityInfo);
            // 缓存city信息
            if (!utils.isEmptyObject(cityInfo)) {
              utils.hc(CITY, JSON.stringify(cityInfo));
            } else {
              console.log('定位城市获取失败,展示默认城市：南京');
              this.storageNJCity();
            }
          });
        }
      } catch (error) {
        console.log('用户拒绝了定位,展示默认城市：南京', error);
        this.storageNJCity();
      }
    }
    // https://blog.csdn.net/Maria028/article/details/82804955
  }

  // eslint-disable-next-line class-methods-use-this
  storageNJCity() {
    utils.hc(LOCATION, JSON.stringify({
      latitude: '32.059344',
      longitude: '118.796624',
    }));
    utils.hc(CITY, JSON.stringify({
      latitude: '32.059344',
      longitude: '118.796624',
      parentId: 1493129437123436500,
      regionId: 320100,
      regionName: '南京市',
      regionParentId: 320000,
      regionType: 2,
    }));
  }

  // eslint-disable-next-line class-methods-use-this
  async getCityInfo(location) {
    return wxRequest({
      url: cityInServiceApi,
      dataType: 'json',
      method: 'GET',
      data: {
        longitude: location.longitude,
        latitude: location.latitude,
      },
      header: {
        'X-Auth-Token': utils.getHc(TOKEN),
        'channel-code': utils.getHc(CHANNEL),
        rtick: utils.getHc(RTICK),
        'content-type': 'application/x-www-form-urlencoded',
        'X-Auth-AppId': '10002',
      },
    });
  }
}
const sysConfig = new Config();

export default sysConfig;
