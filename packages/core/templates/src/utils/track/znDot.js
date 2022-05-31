/* eslint-disable */

import { ZNDOT } from '../../config/localKey';
import {
  httpPOST,
} from '../request';
import {
  collectLogApi,
} from '../../api/index';

const app = getApp();

function Base64() {
  // private property
  const _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  // public method for encoding
  this.encode = function (input) {
    let output = '';
    let chr1; let chr2; let chr3; let enc1; let enc2; let enc3; let
      enc4;
    let i = 0;
    const tempInput = _utf8_encode(input);
    while (i < tempInput.length) {
      chr1 = tempInput.charCodeAt(i++);
      chr2 = tempInput.charCodeAt(i++);
      chr3 = tempInput.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output
              + _keyStr.charAt(enc1) + _keyStr.charAt(enc2)
              + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  };

  // public method for decoding
  this.decode = function (input) {
    let output = '';
    let chr1; let chr2; let
      chr3;
    let enc1; let enc2; let enc3; let
      enc4;
    let i = 0;
    const tempInput = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    while (i < tempInput.length) {
      enc1 = _keyStr.indexOf(tempInput.charAt(i++));
      enc2 = _keyStr.indexOf(tempInput.charAt(i++));
      enc3 = _keyStr.indexOf(tempInput.charAt(i++));
      enc4 = _keyStr.indexOf(tempInput.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output += String.fromCharCode(chr1);
      if (enc3 !== 64) {
        output += String.fromCharCode(chr2);
      }
      if (enc4 !== 64) {
        output += String.fromCharCode(chr3);
      }
    }
    output = _utf8_decode(output);
    return output;
  };

  // private method for UTF-8 encoding
  // eslint-disable-next-line camelcase
  var _utf8_encode = function (string) {
    string = string.replace(/\r\n/g, '\n');
    let utftext = '';
    for (let n = 0; n < string.length; n++) {
      const c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  };
    // private method for UTF-8 decoding
    // eslint-disable-next-line camelcase
  var _utf8_decode = function (utftext) {
    let string = '';
    let i = 0;
    let c1; let c2; let c3;
    let c = c1 = c2 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  };
}

const base = new Base64();
let data = [];
// MARK: 变量命名格式需要统一修改
export default class ZnDot {
  constructor(pagePath, pageTitle) {
    const {
      openId, channelCode, tokenId, appId, version
    } = app.globalData;
    const {
      brand, model, pixelRatio, windowWidth, windowHeight, system, latitude, longitude
    } = app.globalConfig.systemInfo;

    // 手机信息
    this.os = system; // 系统版本号
    this.dev = model; // String， 机型 & 电脑型号
    this.px = pixelRatio; // 分辨率
    this.win_width = windowWidth;
    this.win_height = windowHeight;
    this.terminal_type = 'wx';
    this.brand = brand;

    this.version = version;

    // 小程序层级信息+用户信息
    this.appid = appId;
    this.openid = openId; // String  用户 wx id
    this.sid = tokenId && base.encode(tokenId); // String，session id Token
    // 定位
    this.la = latitude; // double， 纬度
    this.lo = longitude; // double，经度
    // 用户操作数据
    this.params = {};
    this.errors = [];
    this.ts = new Date().getTime(); // 发送的时间戳
    this.channel_code = channelCode; // 渠道号
    this.enter_time = ''; // 停留时间（离开/进入时间）
    this.leave_time = '';
    this.referrer = ''; // 来源url、referrer,上一跳url、referrer （referrer）
    this.page_path = pagePath; // 页面url
    this.page_title = pageTitle; // 页面标题
  }

  enterAppScene(eventId, params) {
    const obj = {
      appid: this.appid,
      uid: this.uid,
      openid: this.openid,
      version: this.version,
      brand: this.brand,
      la: this.la,
      lo: this.lo,
      os: this.os,
      dev: this.dev,
      sid: this.sid,
      ts: this.ts,
      channel_code: this.channel_code,
      referrer: this.referrer,
      px: this.px,
      win_width: this.win_width,
      win_height: this.win_height,
      enter_time: this.enter_time,
      leave_time: this.leave_time,
      terminal_type: this.terminal_type,
      errors: this.errors,
      event_type: 'mp_launch',
      params: {
        event_id: eventId || '',
        channel_code: this.channel_code,
        ts: this.ts,
        ...params,
      },
    };
    this.addData(obj);
  }
  
  pageEnter(eventId, params, pageTitle, pagePath, enPageTitle, referrer) {
    const obj = {
      appid: this.appid,
      uid: this.uid,
      openid: this.openid,
      version: this.version,
      brand: this.brand,
      la: this.la,
      lo: this.lo,
      os: this.os,
      dev: this.dev,
      sid: this.sid,
      ts: this.ts,
      channel_code: this.channel_code,
      page_path: pagePath,
      page_title: pageTitle,
      en_page_title: enPageTitle,
      referrer: this.referrer,
      px: this.px,
      win_width: this.win_width,
      win_height: this.win_height,
      enter_time: this.enter_time,
      leave_time: this.leave_time,
      terminal_type: this.terminal_type,
      errors: this.errors,
      event_type: 'mp_view_screen',
      params: {
        event_id: eventId,
        channel_code: this.channel_code,
        page_path: pagePath,
        page_title: pageTitle,
        en_page_title: enPageTitle,
        referrer,
        ts: this.ts,
        ...params,
      },
    };
    this.addData(obj);
  }
  // pageEnter('home', {}, '首页', '/pages/index/index', '');
  pageLeave(eventId, params, pageTitle, pagePath, pageEnterTime, enPageTitle, referrer) {
    // getCurrentPages
    const obj = {
      appid: this.appid,
      uid: this.uid,
      openid: this.openid,
      version: this.version,
      brand: this.brand,
      la: this.la,
      lo: this.lo,
      os: this.os,
      dev: this.dev,
      sid: this.sid,
      ts: new Date().getTime(),
      channel_code: this.channel_code,
      page_path: pagePath,
      en_page_title: enPageTitle,
      page_title: pageTitle,
      referrer,
      px: this.px,
      win_width: this.win_width,
      win_height: this.win_height,
      enter_time: this.enter_time,
      leave_time: this.leave_time,
      terminal_type: this.terminal_type,
      errors: this.errors,
      event_type: 'mp_page_leave',
      params: {
        event_id: eventId,
        channel_code: this.channel_code,
        page_path: pagePath,
        page_title: pageTitle,
        en_page_title: enPageTitle,
        page_duration: this.ts - pageEnterTime,
        ts: this.ts,
        ...params,
      },
    };
    this.addData(obj);
  }

  leaveAppScene(eventId, params) {
    const obj = {
      appid: this.appid,
      uid: this.uid,
      openid: this.openid,
      version: this.version,
      brand: this.brand,
      la: this.la,
      lo: this.lo,
      os: this.os,
      dev: this.dev,
      sid: this.sid,
      ts: this.ts,
      channel_code: this.channel_code,
      referrer: this.referrer,
      px: this.px,
      win_width: this.win_width,
      win_height: this.win_height,
      enter_time: this.enter_time,
      leave_time: this.leave_time,
      terminal_type: this.terminal_type,
      errors: this.errors,
      event_type: 'mp_hide',
      params: {
        event_id: eventId || '',
        channel_code: this.channel_code,
        ts: this.ts,
        ...params,
      },
    };
    this.addData(obj);
  }

  netReq() {
    console.log(`netReq>> ${this}`);
  }

  netRes() {
    console.log(`netRes ${this}`);
  }

  netBusErr() {
    console.log(`netBusErr ${this}`);
  }

  netHttpErr() {
    console.log(`netHttpErr ${this}`);
  }

  error() {
    console.log(`error ${this}`);
  }

  send() {
    console.log(`send >> ${this}`);
    let vm = this;
    const dotData =  wx.getStorageSync(ZNDOT);
    const collectLog = (params) => httpPOST({
      url: collectLogApi,
      params,
    });
    collectLog(dotData).then(result=>{
        vm.clear();
    });
  }

  clear() {
    console.log(`clear ${this}`);
    wx.setStorage(ZNDOT, []);
    data = [];
    return true;
  }

  event(eventId, pagePath, pageTitle, params) {
    const obj = {
      appid: this.appid,
      uid: this.uid,
      openid: this.openid,
      version: this.version,
      brand: this.brand,
      la: this.la,
      lo: this.lo,
      os: this.os,
      dev: this.dev,
      sid: this.sid,
      ts: new Date().getTime(),
      channel_code: this.channel_code,
      page_path: pagePath,
      page_title: pageTitle,
      referrer: this.referrer,
      px: this.px,
      win_width: this.win_width,
      win_height: this.win_height,
      enter_time: this.enter_time,
      leave_time: this.leave_time,
      terminal_type: this.terminal_type,
      errors: this.errors,
      event_type: 'mp_click',
      params: {
        event_id: eventId,
        channel_code: this.channel_code,
        page_path: pagePath,
        page_title: pageTitle,
        ts: new Date().getTime(),
        ...params,
      },
    };
    this.addData(obj);
  }

  addData(obj) {
    data.push(obj);
    wx.setStorageSync(ZNDOT, data);
  }
}
