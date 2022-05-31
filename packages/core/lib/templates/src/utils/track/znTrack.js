import ZnDot from './znDot';
import monitor from '../tingyun-mp-agent';

// 统一入口
export default class ZnTrack {
  constructor(type) {
    this.type = type;
  }

  event(eventId, pagePath, pageTitle, params) {
    switch (this.type) {
      // case 'sensor': {
      //   new Sensor().event(eventId, params);
      //   break;
      // }
      case 'znDot': {
        new ZnDot().event(eventId, pagePath, pageTitle, params);
        break;
      }
      default: {
        break;
      }
    }
  }

  pageEnter(eventId, params, pageTitle, pagePath, enPageTitle, referrer) {
    switch (this.type) {
      // case 'sensor': {
      //   new Sensor().pageEnter(eventId, params);
      //   break;
      // }
      case 'znDot': {
        new ZnDot().pageEnter(eventId, params, pageTitle, pagePath, enPageTitle, referrer);
        break;
      }
      default: {
        break;
      }
    }
  }

  pageLeave(eventId, params, pageTitle, pagePath, pageEnterTime, enPageTitle, referrer) {
    switch (this.type) {
      // case 'sensor': {
      //   new Sensor().pageLeave(eventId, params, pageEnterTime);
      //   break;
      // }
      case 'znDot': {
        new ZnDot().pageLeave(eventId, params, pageTitle, pagePath, pageEnterTime, enPageTitle, referrer);
        break;
      }
      default: {
        break;
      }
    }
  }

  send() {
    switch (this.type) {
      // case 'sensor': {
      //   new Sensor().send();
      //   break;
      // }
      case 'znDot': {
        new ZnDot().send();
        break;
      }
      default: {
        break;
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  initSensor() {
    // new Sensor().init();
  }

  // eslint-disable-next-line class-methods-use-this
  initTingyun() {
    monitor.config({
      beacon: 'https://beacon-mp.tingyun.com',
      key: 'zPXXwZD-bys',
      id: 'G6LPG1Dhqgo',
      sampleRate: 1,
    });
  }

  enterAppScene(eventId, params) {
    switch (this.type) {
      case 'znDot': {
        new ZnDot().enterAppScene(eventId, params);
        break;
      }
      default: {
        break;
      }
    }
  }

  leaveAppScene(eventId, params) {
    switch (this.type) {
      case 'znDot': {
        new ZnDot().leaveAppScene(eventId, params);
        break;
      }
      default: {
        break;
      }
    }
  }
}
