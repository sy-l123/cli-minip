Component({
  properties: {
    showFanhui: {
      type: Boolean,
      default: false,
    },
    pageTitle: {
      type: String,
      default: '',
    },
    leftTitle: {
      type: String,
      default: '',
    },
    identify: {
      type: Object,
      default: {},
      observer(newVal) {
        this.changeIdentify(newVal);
      },
    },
    fade: {
      type: String,
      default: '',
    },
    isFixed: {
      type: Boolean,
      default: true,
    },
    showBackHomeIcon: {
      type: Boolean,
      default: false,
    },
    showHomeTitleIcon: {
      type: Boolean,
      default: false,
    },
  },
  data: {
    navbarHeight: 0,
    statusBarHeight: 0,
    isLogin: false,
    companyTitle: '',
    companyIcon: '/assets/img/home_person_loged.svg',
    certStatus: '',
    customerType: '',
  },
  attached() {
    const app = getApp();

    const res = wx.getSystemInfoSync();
    // 胶囊位置信息
    const menuBtnPosi = wx.getMenuButtonBoundingClientRect();
    // 胶囊实际位置，坐标信息不是左上角原点
    const btnPosi = {
      height: menuBtnPosi.height,
      width: menuBtnPosi.width,
      // 胶囊top - 状态栏高度
      top: menuBtnPosi.top - res.statusBarHeight,
      // 胶囊bottom - 胶囊height - 状态栏height （胶囊实际bottom 为距离导航栏底部的长度）
      bottom: menuBtnPosi.bottom - menuBtnPosi.height - res.statusBarHeight,
    };
    // 导航栏高度 = 胶囊bottom + 胶囊实际bottom
    const navbarHeight = menuBtnPosi.bottom + btnPosi.bottom;

    this.setData({
      companyTitle: this.properties.identify.customerName || '',
      // companyIcon: +this.properties.identify.customerType === 1 ? '/assets/img/home_person_loged.svg' : '/assets/img/home_company.svg',
      certStatus: this.properties.identify.certStatus,
      customerType: this.properties.identify.customerType,
      statusBarHeight: res.statusBarHeight,
      navbarHeight,
      isLogin: app.globalData.isLogin,
    });
  },
  methods: {
    changeIdentify(data) {
      const app = getApp();
      console.log('app.globalData.isLogin--》', app.globalData.isLogin);
      this.setData({
        isLogin: app.globalData.isLogin,
        companyTitle: data.customerName || '',
        customerType: data.customerType,
        certStatus: data.certStatus,
      });
    },
    goBack() {
      this.triggerEvent('goBackPage');
    },
    goHome() {
      wx.navigateTo({
        path: '/pages/index/index',
      });
    },
    gotoLogin() {
      this.triggerEvent('goLogin');
    },
    changeCompany() {
      this.triggerEvent('goChangeCompany');
    },
  },
});
