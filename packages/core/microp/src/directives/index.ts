import canOperate from '@/directives/can-operate';
// 自定义指令
const directives = {
  canOperate,
};

export default {
  install(Vue: any) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key]);
    });
  },
};
