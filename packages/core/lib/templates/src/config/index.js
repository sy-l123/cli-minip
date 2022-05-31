/**
 * 包含 通用环境
 * 打包时环境，baseEnv 一些 debug 组件
 * env 运行时 env
 * host 运行时 host
 */
import { env as baseEnv } from './env';
import { envList } from './host';
import { key } from './localKey';
import { getHc, hc } from '../utils/base';

const prdEnv = 'cn';
const localEnvKey = key.env;

console.log('local env setting');

// 获取本地环境及host
const getEnv = () => {
  let localEnv = baseEnv;
  if (localEnv !== prdEnv) {
    localEnv = getHc(localEnvKey);
    console.log('localEnv', localEnv);
    if (!localEnv) localEnv = baseEnv;
  }
  const host = envList.find((e) => e.name === localEnv);
  hc(localEnvKey, localEnv); // 确认后缓存
  return {
    env: localEnv,
    host,
  };
};

const { env, host } = getEnv();

export {
  baseEnv, // 本地 env
  env, // 运行 env
  host, // 运行 host
};
