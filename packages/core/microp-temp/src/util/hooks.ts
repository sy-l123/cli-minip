import { onMounted, Ref, ref } from 'vue';
import { get } from 'cpt_web_request';
import apis from '@/apis';

// 获取字典枚举
const useOpts = (keys: string[]): Ref<any> => {
  const opts = ref([]);
  const getOpts = () => {
    const promiseArr = keys.map((key) => get<any>(apis.dictionaryTableApi, { key }).catch(() => ({})));
    Promise.all(promiseArr).then((res) => {
      const data: any = [];
      res.forEach((e, i) => {
        if (e[keys[i]]) {
          data.push(e[keys[i]]);
        } else {
          data.push([]);
        }
      });
      opts.value = data;
    });
  };
  onMounted(() => {
    getOpts();
  });
  return opts;
};

export default useOpts;
