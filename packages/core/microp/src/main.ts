import './public-path';
import cptHttp from 'cpt_web_request';
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import { createRouter, createWebHistory } from 'vue-router';
import * as ElIconModules from '@element-plus/icons-vue';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import apis from '@/apis';
import App from './App.vue';
import routes from './route';
import store from './store';
import directives from './directives';

const app = createApp(App)
  .use(ElementPlus, { locale })
  .use(cptHttp, { api: apis })
  .use(store)
  .use(directives);

// 统一注册Icon图标
Object.keys(ElIconModules).forEach((key) => {
  app.component(key, ElIconModules[key as keyof typeof ElIconModules]);
});

let router = null;

function render(props: any) {
  const { container, _app: { activeRule, name }, _setGlobalData } = props;

  router = createRouter({
    history: createWebHistory(activeRule),
    routes,
  });
  (window as any).zn_mainBus = _setGlobalData;
  router.beforeEach((to) => {
    console.log(`${name}: child-a router ==>`, to);
    setTimeout(() => {
      _setGlobalData.$emit('route-change', { [name]: to });
    }, 0);
    return true;
  });

  if (props.util && Object.keys(props.util).length) {
    Object.keys(props.util).forEach((key) => {
      app.config.globalProperties[`$${key}`] = props.util[key];
    });
  }

  app
    .use(router)
    .mount(container ? container.querySelector(`#${name}`) : `#${name}`);
}

// eslint-disable-next-line no-underscore-dangle
if (!(window as any).__POWERED_BY_QIANKUN__) {
  render({});
}

// 在微应用初始化的时候调用一次，之后的生命周期里不再调用
export async function bootstrap() {
  console.log('bootstrap');
}

// 在应用每次进入时调用
export async function mount(props: any) {
  console.log('mount', props);
  render(props);
}

// 应用每次 切出/卸载 均会调用
export async function unmount() {
  console.log('unmount');
  app.unmount();
  router = null;
}
