<template>
  <div class="mint-indexlist city-index">
    <ul class="mint-indexlist-content">
      <div class="recommend-city">
        <div class="gprs-city">
          <div class="city-index-title">GPS定位你所在的城市</div>
          <ul class="city-index-detail clearfix">
            <li>
              <div>定位失败</div>
            </li>
          </ul>
        </div>
        <div class="hot-city">
          <div class="city-index-title">热门城市</div>
          <ul class="city-index-detail">
            <li v-for="(item,index) in hotCitys" :key="index">
              <div @click="changeCity(item)">{{item.name}}</div>
            </li>
          </ul>
        </div>
      </div>
      <li class="mint-indexsection city-index-section">
        <p class="mint-indexsection-index">A</p>
        <ul>
          <li>鞍山</li>
          <li>安庆</li>
          <li>安阳</li>
          <li>安顺</li>
          <li>安康</li>
        </ul>
      </li>
      <li class="mint-indexsection city-index-section">
        <p class="mint-indexsection-index">A</p>
        <ul>
          <li>鞍山</li>
          <li>安庆</li>
          <li>安阳</li>
          <li>安顺</li>
          <li>安康</li>
        </ul>
      </li>
      <li class="mint-indexsection city-index-section">
        <p class="mint-indexsection-index">A</p>
        <ul>
          <li>鞍山</li>
          <li>安庆</li>
          <li>安阳</li>
          <li>安顺</li>
          <li>安康</li>
        </ul>
      </li>
      <li class="mint-indexsection city-index-section">
        <p class="mint-indexsection-index">A</p>
        <ul>
          <li>鞍山</li>
          <li>安庆</li>
          <li>安阳</li>
          <li>安顺</li>
          <li>安康</li>
        </ul>
      </li>
      <li class="mint-indexsection city-index-section">
        <p class="mint-indexsection-index">A</p>
        <ul>
          <li>鞍山</li>
          <li>安庆</li>
          <li>安阳</li>
          <li>安顺</li>
          <li>安康</li>
        </ul>
      </li>
      <li class="mint-indexsection city-index-section">
        <p class="mint-indexsection-index">A</p>
        <ul>
          <li>鞍山</li>
          <li>安庆</li>
          <li>安阳</li>
          <li>安顺</li>
          <li>安康</li>
        </ul>
      </li>
    </ul>
    <div class="mint-indexlist-nav">
      <ul>
        <li>A</li>
        <li>B</li>
        <li>C</li>
        <li>D</li>
        <li>E</li>
        <li>F</li>
        <li>G</li>
        <li>H</li>
        <li>J</li>
        <li>K</li>
        <li>L</li>
        <li>M</li>
        <li>N</li>
        <li>P</li>
        <li>Q</li>
        <li>R</li>
        <li>S</li>
        <li>T</li>
        <li>W</li>
        <li>X</li>
        <li>Y</li>
        <li>Z</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'CityList',
  data() {
    return {
      cityList: [],
    };
  },
  computed: {
    // 获取热门城市
    hotCitys() {
      return this.cityList.filter(item => item.isHot === 1);
    },
  },
  methods: {
    ...mapMutations([
      'addCity',
      'addCityId',
    ]),
    /**
     * 更改当前城市
     * @param {Object} item 就是当前城市对象
     */
    changeCity(item) {
      this.addCity(item.name);
      this.addCityId(item.cityId);
      this.$router.go(-1);
    },
  },
  created() {
    /**
     * 获取所有城市
     */
    this.$axios.get(this.$URL.citysUrl).then((response) => {
      if (response.data.code === 0) {
        this.cityList = response.data.data.citys;
      } else {
        /* eslint-disable no-alert */
        alert(response.data.msg);
      }
    });
  },

};
</script>

<style lang="scss">
.mint-indexlist {
  position: absolute;
  top: 94px;
  width: 100%;
  overflow: hidden;
  height: calc(100vh - 94px);
  .mint-indexlist-content {
    width: calc(100% - 17px);
    height: 100vh;
    font-size: 14px;
    overflow: auto;
    .recommend-city {
      background-color: #fff;
      padding-left: 15px;
      padding-top: 15px;
    }
  }
  .mint-indexlist-nav {
    position: absolute;
    top: 0;
    right: 0;
    width: 17px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    height: 100%;
    ul {
      display: flex;
      flex-direction: column;
      li {
        font-size: 12px;
        padding: 0 2px;
        color: #191a1b;
      }
    }
  }
}

.city-index {
  .city-index-title {
    font-size: 13px;
    color: #797d82;
    margin-bottom: 10px;
  }
  .city-index-detail {
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    li {
      width: calc((100vw - 33px) / 3);
      padding-bottom: 15px;
      text-align: center;
      div {
        height: 30px;
        background-color: #f4f4f4;
        line-height: 30px;
        border-radius: 3px;
        box-sizing: border-box;
        margin: 0 7.5px;
        font-size: 14px;
        color: #191a1b;
      }
    }
  }
}

.mint-indexsection {
  p.mint-indexsection-index {
    background-color: #f4f4f4;
    color: #797d82;
    padding-left: 15px;
    height: 30px;
    line-height: 30px;
  }
  ul {
    padding-left: 15px;
    li {
      color: #191a1b;
      position: relative;
      height: 48px;
      width: calc((100vw - 33px) / 3);
      text-align: center;
      float: left;
      font-size: 14px;
      line-height: 48px;
    }
    li::after {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      border-bottom: 1px solid #ededed;
      color: #ededed;
      position: absolute;
      left: 0;
      bottom: -1px;
      transform: scaleY(0.5);
    }
  }
  ul::before,
  ul::after {
    content: "";
    display: table;
  }
  ul::after {
    clear: both;
  }
}
</style>
