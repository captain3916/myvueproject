import Vue from 'vue';
import Router from 'vue-router';
import Store from '../store'; // 公共仓库

Vue.use(Router);

export default new Router({
  routes: [
    // 根页面里面的四个页面
    {
      path: '/',
      component: () => import('../components/main/index.vue'),
      children: [
        {
          path: 'films',
          component: () => import('../components/films/films.vue'),
          children: [
            // 正在热映
            {
              path: 'nowPlaying',
              name: 'nowPlaying',
              component: () => import('../components/films/nowPlaying/index.vue'),
            },
            // 即将上映
            {
              path: 'comingSoon',
              name: 'comingSoon',
              component: () => import('../components/films/comingSoon/index.vue'),
            },
            {
              path: '',
              redirect: '/films/nowPlaying',
            },
          ],
        },
        // 影院列表
        {
          path: 'cinemas',
          name: 'cinemas',
          component: () => import('../components/cinemas/cinemas.vue'),
        },
        // 个人中心
        {
          path: 'center',
          name: 'center',
          component: () => import('../components/me/Me.vue'),
        },
        // 9.9拼团
        {
          path: 'teamBuy',
          name: 'teamBuy',
          component: () => import('../components/teamBuy/teamBuy.vue'),
        },
        {
          path: '',
          redirect: '/films/nowPlaying',
        },
      ],
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/login/login.vue'),
    },
    // 注册
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/register/register.vue'),
    },
    // 卖座卡页面
    {
      path: '/card',
      name: 'card',
      component: () => import('../components/maizuoCard/Card.vue'),
      beforeEnter(to, from, next) { // 导航卫士,未登录不允许进入
        if (Store.getters.isLogin) next(); // 已经登录则允许进入
        else next({ name: 'login', query: { targetName: 'card' } });
      },
    },
    // 购物车页面
    {
      path: '/shopCart',
      name: 'shopCart',
      component: () => import('../components/shopCard/shopCart.vue'),
      beforeEnter(to, from, next) { // 导航卫士,未登录不允许进入
        if (Store.getters.isLogin) next(); // 已经登录则允许进入
        else next({ name: 'login', query: { targetName: 'shopCart' } });
      },
    },
    // 城市列表
    {
      path: '/city',
      name: 'city',
      component: () => import('../components/city/cityList.vue'),
    },
    // 电影详情页
    {
      path: '/film/:filmId',
      name: 'filmDetail',
      component: () => import('../components/filmDetail/filmDetail.vue'),
    },
    // 其它页面重定向
    {
      path: '*',
      redirect: '/films/nowPlaying',
    },
  ],
});
