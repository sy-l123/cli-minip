/* eslint-disable no-param-reassign */
import utils from './index';
import { RTICK, CITY, OPENID, TOKEN, PAGESRELOAD } from '../config/localKey';

// eslint-disable-next-line no-void
const noop = () => void (0);
const App = getApp() || {};
// const userInfo = utils.getHc(USERINFO) ? JSON.parse(utils.getHc(USERINFO)) : {};

/**
 * @msg: post请求
 * @param {Object} baseOptions 请求携带的参数
 * @return: {Object} wx.request的返回值
 */
function requestWithPost(baseOptions = {}) {
  // 要注意 method 的 value 必须为大写(例如：POST)
  return requestWithSession({ ...baseOptions, method: 'POST' });
}

/**
 * @msg: get请求
 * @param {Object} baseOptions 请求携带的参数
 * @return: {Object} wx.request的返回值
 */
function requestWithGET(baseOptions = {}) {
  // 要注意 method 的 value 必须为大写(例如：GET)
  return requestWithSession({ ...baseOptions, method: 'GET' });
}

function requestWithSession(options) {
  const requestHeader = {
    'X-Auth-Token': utils.getHc(TOKEN) || '',
    'channel-code': App.globalData.channelCode,
    'X-Auth-AppId': '10002',
    rtick: utils.getHc(RTICK),
  };
  if (options.method === 'POST') {
    requestHeader['content-type'] = 'application/json';
  }
  if (options.ticket) {
    requestHeader['x-ticket'] = options.ticket;
    requestHeader['x-ticket-id'] = '1110002';
  }
  // 处理参数data
  const location = utils.getHc(CITY) && JSON.parse(utils.getHc(CITY));
  const params = options.params || {};
  let requestData = {
    openId: utils.getHc(OPENID),
    extId: utils.getHc(OPENID),
    cityCode: location.regionId,
    ...params,
  } || '';
  // 移除特定接口不需要公共入参
  const rmCommonParams = options.rmCommonParams || {};
  if (rmCommonParams && rmCommonParams.length > 0) {
    rmCommonParams.forEach((item) => {
      delete requestData[item];
    });
  }

  // 埋点接口去除多余处理
  if (options.url && options.url.indexOf('/collectLog') > -1) {
    requestData = params;
  }
  options.data = requestData;
  delete options.params;

  // 先提前把方法 取出来
  // eslint-disable-next-line object-curly-newline
  const { success, fail, complete, showError = true } = options;
  // 直接取出 data
  const callSuccess = (data, statusCode, header) => {
    // 拦截data
    setTimeout(() => {
      wx.hideLoading();
    }, 300);
    if (data) {
      const reponseType1 = data.errCode && data.errCode !== 0;
      const reponseType2 = data.meta && !data.meta.success;

      if (reponseType1 || reponseType2) {
        // errorlog.getErrorInfo(requestData, data);
      }

      // utils.hc(RTICK, utils.operate.getUniqueId());

      if (data.errCode === undefined) {
        data = {
          errCode: (data.meta && data.meta.code) || '',
          success: (data.meta && data.meta.success) || '',
          message: (data.meta && data.meta.message) || '',
          ...data,
        };
        // getInvocationOrderDetail  兼容这个接口，待下次需求中需要优化
        // signStatusUpdate  格式一样，但是未用的数据参数,但是逻辑用的是response.data，所以这块还得兼容
        // signUrlGetSublet
      } else if (+data.errCode === 0) {
        // 不处理
      } else if (data.errCode === 'A030030') {
        App.globalData.isLogin = false;
        console.log('app.globalData.isLogin-------');
        wx.showToast({
          title: data.message ? data.message : `错误码：${data.errCode}`,
          icon: 'none',
          duration: 3000,
        });
        // if (App.globalData.isLogin) {
        //   App.globalData.isLogin = false;
        //   console.log('app.globalData.isLogin-------');
        //   wx.showToast({
        //     title: data.message ? data.message : `错误码：${data.errCode}`,
        //     icon: 'none',
        //     duration: 3000,
        //   });
        //   // 刷新所有页面
        //   try {
        //     utils.event.emit(PAGESRELOAD);
        //   } catch (err) {
        //     console.log(err);
        //   }
        // }
      } else if (+data.errCode !== 0 && showError) {
        wx.showToast({
          title: data.message ? data.message : `错误码：${data.errCode}`,
          icon: 'none',
          duration: 3000,
        });
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (showError) {
        wx.showToast({
          message: data.message || '系统异常',
          icon: 'none',
          duration: 3000,
        });
      }
    }

    success && success({ data, statusCode, header });
    complete && complete({ data, statusCode, header });
  };

  const callFail = (error) => {
    // errorlog.getErrorInfo(param, err);
    console.log('【error】', error);
    setTimeout(() => {
      wx.hideLoading();
    }, 300);
    if (error && error.data === 'request failed') {
      wx.showToast({
        message: '请求超时',
        icon: 'none',
        duration: 3000,
      });
    } else if (error && error.errCode === '10001') {
      // 鉴权信息失效，重新登录 -- 跳转登录
      // let redirectUrl = '';
      // const page = getCurrentPages();
      // const route = page[page.length - 1].route;
      // const options = page[page.length - 1].options;
      // if (!Object.keys(options).length) {
      //   redirectUrl = '/' + route;
      // } else {
      //   let str = '';
      //   for (const key in options) {
      //     if (options.hasOwnProperty(key)) {
      //       const element = options[key];
      //       str += `${key}=${element}&`;
      //     }
      //   }
      //   str = str.substring(0, str.length - 1);
      //   redirectUrl = encodeURIComponent(`/${route}?${str}`);
      // }
      // wx.navigateTo({
      //   url: '/pages/login/login?redirect=' + redirectUrl
      // });
    } else if (showError) {
      wx.showToast({
        message: JSON.stringify(error) || '【error】',
        icon: 'none',
        duration: 3000,
      });
    }
    fail && fail(error);
    complete && complete(error);
  };

  return wx.request(Object.assign({}, options, {
    header: requestHeader,
    success({ data, statusCode, header = {} }) {
      header.requestUrl = options.url || '';
      callSuccess(data, statusCode, header);
    },
    fail: callFail,
    complete: noop,
  }));
}

const httpPOST = utils.promisify(requestWithPost);
const httpGET = utils.promisify(requestWithGET);

export {
  httpPOST,
  httpGET,
};
