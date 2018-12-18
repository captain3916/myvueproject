import axios from 'axios';
import URL from '../router/apiRouter';

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
      store.dispatch('getCityId'); // 获取城市ID
    });
  },
  /**
   * 根据城市名称获取城市Id
   */
  getCityId(store) {
    /* eslint-disable */
    let cityName = store.state.curCity;
    return new Promise((reslove, reject) => {
      axios.get(URL.cityIdUrl, {
        params: {
          cityName,
        },
      }).then((response) => {
        if (response.data.code === 0) {
          store.commit('addCityId',response.data.city.cityId);
        } else {
          /* eslint-disable no-alert */
          alert(response.data.msg);
        }
      });
    })
  },
}
