# 微前端 -- 子应用脚手架 vue3 + ts

### 路由跳转

```javascript
this.$router.push({
  path: '',
  query: {},
});
```

---

日期：01/04

- [x] 新增本地 mock 调试

备注: 
1. 更新主应用分支`feat/base`，并`重启`
2. 子项目 `npm install cpt_web_request`，须切换为公司源
3. 因为后端接口**字段未完全确定**，`res`返回完整 `data`，待确定后`update`

```javascript
import { http } from 'cpt_web_request';

http.get(
  '/mock/86/customer/detail', {},
).then((res: any) => {
  console.log(res);
});
```
