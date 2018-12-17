// import Vue from 'vue';
// import axios from 'axios';

// Vuex.store处理异步模块
export default {
  /**
   * 调用百度地图接口根据IP获取当前城市
   */
  getCity(store) {
    /* eslint-disable */
    let myCity = new BMap.LocalCity();
    myCity.get( result => {
      store.commit('addCity',result.name);
    });
  },
}
