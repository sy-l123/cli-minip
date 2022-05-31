import utils from './index';
import { USERINFO, OPENID, RTICK, TOKEN } from '../config/localKey';
import { getSessionInfoApi } from '../api/index';

const wxLogin = utils.promisify(wx.login);
const wxRequest = utils.promisify(wx.request);

export const goQuickLogin = async (globalData) => new Promise((resolve, reject) => {
  wxLogin().then((codeRes) => {
    if (codeRes.errMsg === 'login:ok') {
      login({
        code: codeRes.code,
      }, globalData).then((res) => {
        const userInfo = (res && res.data && res.data.data) || {};
        console.log('login userInfo->', res);
        // 缓存用户信息
        let user = {};
        if (!utils.isEmptyObject(userInfo)) {
          user = {
            openId: userInfo.openId,
            phone: userInfo.phone,
            tokenId: userInfo.token,
          };
          utils.hc(USERINFO, JSON.stringify(user));
          utils.hc(OPENID, userInfo.openId);
          utils.hc(TOKEN, userInfo.token);
        }
        resolve(user);
      }).catch(() => {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({});
      });
    } else {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({});
    }
  });
});

/**
 * 获取用户信息
 * @author zhangming
 * @date 2020/7/10
 * @param {Object} params
 * @param {String} params.encryptedData - 包括敏感数据在内的完整用户信息的加密数据
 * @param {String} params.iv - 加密算法的初始向量，从wx.getPhoneNumber中获取
 * @returns Promise
 */
const login = (params, globalData) => wxRequest({
  url: getSessionInfoApi,
  dataType: 'json',
  method: 'POST',
  data: {
    appId: globalData.appId,
    // dealType: 1,
    // source: '8',
    openId: globalData.openId,
    ...params,
  },
  header: {
    'REQUEST-SOURCE': 8,
    'X-Auth-Token': globalData.tokenId,
    // 'channel-code': globalData.channelCode,
    'X-Auth-AppId': '10002',
    rtick: utils.getHc(RTICK),
  },
});
