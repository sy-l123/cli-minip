/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
const operate = {
  /**
   * 生成一个唯一值
   * @author ChenWanJin
   * @date 2020/3/20
   * @returns String
   */
  getUniqueId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },
};
export default operate;
