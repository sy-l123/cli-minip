/**
 * 微信基础能力封装
 */
const hc = (key, value) => {
  try {
    wx.setStorageSync(key, value);
    return true;
  } catch (e) {
    console.error(`缓存失败 ==> key: [${key}] value: ${value}`);
    return false;
  }
};

const getHc = (key) => {
  try {
    return wx.getStorageSync(key);
  } catch (e) {
    console.error(`获取缓存失败 ==> key: [${key}]`);
    return null;
  }
};

export {
  hc,
  getHc,
};
