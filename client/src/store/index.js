import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions'; // 异步方法

Vue.use(Vuex);

// 状态(数据)
const state = {
  curCity: '', // 当前城市
  curCityId: 0, // 当前城市Id
  userName: localStorage.getItem('userName'),
};

// 同步方法
const mutations = {
  /**
   * 提交城市
   * @param {Object} statedata 就是当前 store实例的 state 属性
   * @param {String} palyload 参数
   */
  /* eslint no-param-reassign: ["error", { "props": false }] */
  addCity(statedata, palyload) {
    const leg = palyload.length;
    // 如果城市以‘市’结尾，则去掉市字
    if (palyload[leg - 1] === '市') {
      statedata.curCity = palyload.slice(0, leg - 1);
    } else {
      statedata.curCity = palyload;
    }
  },
  addCityId(statedata, palyload) {
    statedata.curCityId = palyload;
  },
  // 登录,提交用户名
  addUserName(statedata, playload) {
    statedata.userName = playload;
  },
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
