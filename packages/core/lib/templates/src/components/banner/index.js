import utils from '../../utils/index';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    banners: {
      type: Array,
      value: [],
      observer(newVal, oldVal) {
        // 第一次初始化 不需要走该刷新方法
        if (!utils.isEmpty(oldVal) && !utils.isEmpty(newVal) && oldVal !== newVal) {
          this.initComponent(newVal);
        }
      },
    },

    bg: {
      type: Object,
      value: {},
    },
    spaceImage: {
      type: String,
      value: '',
    },
    cityName: {
      type: String,
      value: '',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    navbarHeight: 0,
    swiperCurrent: 0,
    statusBarHeight: 0,
    vidoeSrc: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 初始化
    initComponent(banners) {
      this.setData({
        banners,
      });
    },
    // banner 滚动
    swiperChange(e) {
      this.setData({
        swiperCurrent: e.detail.current,
      });
    },
    // banner点击事件
    bannderClick(e) {
      const item = e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.imgbean;
      this.triggerEvent('goToCarousel', item);
    },
    navigateToCity() {
      this.triggerEvent('goToCityList');
    },
    // /** 播放视屏 */
    videoPlay(e) {
      // 执行全屏方法
      const src = e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.src;
      this.setData({
        fullScreen: true,
        vidoeSrc: src,
      }, () => {
        const videoContext = wx.createVideoContext('myVideoFull', this);
        videoContext.requestFullScreen();
        videoContext.play();
      });
    },

    // /** 关闭视屏 */
    // closeVideo() {
    //   // 执行退出全屏方法
    //   const videoContext = wx.createVideoContext('myVideo', this);
    //   videoContext.exitFullScreen();
    // },
    // /** 视屏进入、退出全屏 */
    fullScreen(e) {
      const isFull = e.detail.fullScreen;
      // 视屏全屏时显示加载video，非全屏时，不显示加载video
      this.setData({
        fullScreen: isFull,
      });
    },
  },
  /**
   * 生命周期
   */
  attached() {
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

    // 在组件实例进入页面节点树时执行
    const { banners } = this.properties;
    this.initComponent(banners);
    this.setData({
      statusBarHeight: res.statusBarHeight,
      navbarHeight,
    });
  },

  detached() {
    // 在组件实例被从页面节点树移除时执行
  },
});
