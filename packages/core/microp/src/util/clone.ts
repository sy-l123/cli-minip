// ts 版本的深拷贝
const typeOf = (obj: any) => {
  const { toString } = Object.prototype;
  const map: any = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  return map[toString.call(obj)];
};

const deepClone = (value: any) => {
  // 获取传入拷贝函数的数据类型
  // eslint-disable-next-line no-undef
  const type = typeOf(value);
  // 定义一个返回any类型的数据
  let reData: any;
  // 递归遍历一个array类型数据，
  if (type === 'array') {
    reData = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < value.length; i++) {
      reData.push(deepClone(value[i]));
    }
  } else if (type === 'object') { // 递归遍历一个object类型数据
    reData = {};
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const i in value) {
      reData[i] = deepClone(value[i]);
    }
  } else {
    // 返回基本数据类型
    return value;
  }
  // 将any类型的数据return出去，作为deepClone的结果
  return reData;
};

export default deepClone;
