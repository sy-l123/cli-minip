/* eslint-disable no-param-reassign */
import operate from './operate';
import {
  promisify,
} from './promisify';
import {
  getHc,
  hc,
} from './base';

const event = require('./event').default;

/**
 * 判断字符串是否为空
 */
function isEmpty(obj) {
  if (typeof obj === 'undefined' || obj === null || obj === '' || JSON.stringify(obj) === '{}' || JSON.stringify(obj) === '[]') {
    return true;
  }
  return false;
}
/**
 * 判断字典是否为空
 */
function isEmptyObject(obj) {
  /* eslint-disable */
  for (let {} in obj) {
    return false;
  }
  /* eslint-enable */
  return true;
}

// 防抖函数
function betterThrottle(fn, interval = 100) {
  let timeout = null;
  let lastTime = 0;

  // eslint-disable-next-line func-names
  return function (...args) {
    clearTimeout(timeout);
    const now = Date.now();
    const _interval = now - lastTime;

    if (_interval >= interval) {
      lastTime = now;
      fn.apply(this, args);
    } else {
      const _lastTime = lastTime;
      timeout = setTimeout(() => {
        if (_lastTime === lastTime) {
          lastTime = Date.now();
          fn.apply(this, args);
        }
      }, interval - _interval);
    }
  };
}

function throttle(delay, action) { // 函数节流器，定义函数执行间隔，按频率触发函数
  let last = 0;

  // eslint-disable-next-line func-names
  return function () {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    const curr = +new Date();

    if (curr - last > delay) {
      action.apply(this, args);
      last = curr;
    }
  };
}

// eslint-disable-next-line consistent-return
function formatMoney(s) {
  try {
    // eslint-disable-next-line no-param-reassign
    s = `${parseFloat((`${s}`).replace(/[^\d\.]/g, '')).toFixed(2)}`;
    const l = s.split('.')[0].split('').reverse();
    const r = s.split('.')[1];
    let t = '';
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
    }
    return [t.split('').reverse().join(''), r];
  } catch (error) {
    return [];
  }
}

export default {
  operate,
  promisify,
  getHc,
  hc,
  isEmpty,
  isEmptyObject,
  event,
  throttle,
  betterThrottle,
  formatMoney,
};
