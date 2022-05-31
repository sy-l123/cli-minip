Page({
  data: {
    pageTitle: '设备详情',
    showFanhui: true,
    fade: 'fadeOut',
  },
  onLoad() {},
  // 返回上一页
  goBackPage() {
    wx.navigateBack(-1);
  },
});
