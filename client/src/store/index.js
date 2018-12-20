import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'; // 同步更改state数据方法
import actions from './actions'; // 异步方法

Vue.use(Vuex);

// 状态(数据)
const state = {
  // 当前城市
  curCity: '',
  // 当前城市Id
  curCityId: 0,
  // 用户名
  userName: localStorage.getItem('userName'),
  // 用户购物车信息 [{filmName,filmId,filmNum,price},...]
  userShopCard: localStorage.getItem('shopCard') ? JSON.parse(localStorage.getItem('shopCard')) : [],
};

// 计算
const getters = {
  // 是否处于登录状态
  isLogin(statedata) {
    if (statedata.userName) return true;
    return false;
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
