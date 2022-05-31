// 根据 obj 的参数请求wx 支付
const requestPayment = (obj) => new Promise((resolve, reject) => {
  // 调起微信支付
  wx.requestPayment({
    // 相关支付参数
    timeStamp: obj.timeStamp,
    nonceStr: obj.nonceStr,
    package: `prepay_id=${obj.prepayId}`,
    signType: obj.signType,
    paySign: obj.paySign,
    // 小程序微信支付成功的回调通知
    success() {
      resolve('success');
    },
    // 小程序支付失败的回调通知
    fail(res) {
      reject(res);
    },
  });
});

export default requestPayment;
