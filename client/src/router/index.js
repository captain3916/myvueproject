import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
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
    // 9.9拼团
    // {
    //   path: 'teamBuy',
    //   name: 'teamBuy',
    //   component: () => import('../components/teamBuy/teamBuy.vue'),
    // },
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
    // {
    //   path: '*',
    //   redirect: '/films/nowPlaying',
    // },
  ],
});
