import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import Auth from './utils/authToken'



/**
 * @author cailing12
 * @description 正式环境默认使用mock，正式项目记得注释后再打包
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('@/utils/static')
//   mockXHR()
// }

router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (Auth.getToken()) { //判断本地是否存在access_token
      next();
    } else {
      next({
        path: 'login',
        query: {
          redirect: to.fullPath
        }
      })

    }
  }
  else {
    next();
  }
  /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
  if (to.fullPath == "/login") {
    if (Auth.getToken()) {
      next({
        path: from.fullPath
      });
    } else {
      next();
    }
  }
});

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
