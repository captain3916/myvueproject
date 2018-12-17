import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions'; // 异步方法

Vue.use(Vuex);

// 状态(数据)
const state = {
  curCity: '', // 当前城市
};

// 同步方法
const mutations = {
  /**
   * 增加城市
   * @param {Object} statedata 就是当前 store实例的 state 属性
   * @param {String} palyload 参数
   */
  /* eslint no-param-reassign: ["error", { "props": false }] */
  addCity(statedata, palyload) {
    statedata.curCity = palyload;
  },
};

// 计算
const getters = {

};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
