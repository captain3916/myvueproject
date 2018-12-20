// Vuex.store提交状态更改 mutations模块
export default {
  /**
   * 提交城市
   * @param {Object} state 就是当前 store实例的 state 属性
   * @param {String} palyload 参数
   */
  /* eslint no-param-reassign: ["error", { "props": false }] */
  addCity(state, palyload) {
    const leg = palyload.length;
    // 如果城市以‘市’结尾，则去掉市字
    if (palyload[leg - 1] === '市') {
      state.curCity = palyload.slice(0, leg - 1);
    } else {
      state.curCity = palyload;
    }
  },
  addCityId(state, palyload) {
    state.curCityId = palyload;
  },
  // 登录,提交用户名
  addUserName(state, playload) {
    state.userName = playload;
  },
  // 添加电影到购物车
  addDilm(state, playload) {
    const filmId = playload.filmId;
    let index = -1;
    state.userShopCard.forEach((item, i) => {
      if (item.filmId === filmId) index = i;
    });
    if (index === -1) {
      state.userShopCard.push({
        filmId,
        filmName: playload.name,
        filmNum: 1,
        price: playload.price,
      });
    } else {
      state.userShopCard[index].filmNum += 1;
    }
    // 写入localStorage
    localStorage.setItem('shopCard', JSON.stringify(state.userShopCard));
  },
  // 从购物车删除|减少电影
  reduceFilm(state, playload) {
    const filmId = playload.filmId;
    let index = -1;
    state.userShopCard.forEach((item, i) => {
      if (item.filmId === filmId) index = i;
    });
    if (index !== -1) {
      if (state.userShopCard[index].filmNum >= 2) {
        state.userShopCard[index].filmNum -= 1;
      } else {
        state.userShopCard.splice(index, 1);
      }
    }
    // 写入localStorage
    localStorage.setItem('shopCard', JSON.stringify(state.userShopCard));
  },
};
