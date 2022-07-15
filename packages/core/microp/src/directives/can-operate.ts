/**
 * author yangpeiyu
 * [按钮根据编码是否展示]
 */
export default {
  // 指令绑定元素挂载前
  beforeMount(el: any) {
    // console.log(el);
  },
  // 指令绑定元素挂载后
  mounted(el: any, binding: any) {
    const eleString = localStorage.getItem('elements');
    let eles;
    const { code } = binding.value;
    if (eleString) {
      eles = JSON.parse(eleString);
    }
    const index = eles.findIndex((item: any) => item.resourceCode === code);
    if (index < 0) {
      // eslint-disable-next-line no-param-reassign
      el.style.display = 'none';
    }
  },
  // 指令绑定元素因为数据修改触发修改前
  beforeUpdate(el: any) {
    // console.log(el);
  },
  // 指令绑定元素因为数据修改触发修改后
  updated(el: any) {
    // console.log(el);
  },
  // 指令绑定元素销毁前
  beforeUnmount(el: any) {
    // console.log(el);
  },
  // 指令绑定元素销毁后
  unmounted(el: any) {
    // console.log(el);
  },
};
