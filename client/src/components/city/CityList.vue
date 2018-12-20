<template>
  <div class="mint-indexlist city-index">
    <mt-header title="-当前城市-">
      <mt-button class="iconfont icon-xiangzuo"
        slot="left"
        @click="$router.go(-1)"></mt-button>
    </mt-header>

    <mt-search
      v-model="keyValue"
      cancel-text="取消"
      placeholder="请输入城市名称或拼音">
    </mt-search>

    <ul class="mint-indexlist-content"
      v-if="isCityShow">
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
      <li class="mint-indexsection city-index-section"
        v-for="(item,index) in citySort"
        :key="index">
        <p class="mint-indexsection-index">{{item.letter}}</p>
        <ul>
          <li v-for="(it,i) in item.list"
           :key="i"
           @click="changeCity(it)">
           {{it.name}}
          </li>
        </ul>
      </li>
    </ul>
    <div class="mint-indexlist-nav" v-if="isCityShow">
      <ul>
        <li v-for="(item,index) in firstLetter" :key="index">
          {{item}}
        </li>
      </ul>
    </div>
    <div v-if="!isCityShow">
      <mt-cell
        v-for="(item,index) in searchCity"
        :key="index"
        :title="item.name"
        @click.native="changeCity(item)">
      </mt-cell>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { Search, Header, Button, Cell, Indicator } from 'mint-ui';

export default {
  name: 'CityList',
  data() {
    return {
      cityList: [],
      keyValue: '',

    };
  },
  computed: {
    // 获取热门城市
    hotCitys() {
      return this.cityList.filter(item => item.isHot === 1);
    },
    // 城市首字母拼音
    firstLetter() {
      const arr = [];
      this.cityList.forEach((item) => {
        const st = item.pinyin.charAt(0).toUpperCase();
        if (arr.indexOf(st) === -1) arr.push(st);
      });
      return arr.sort();
    },

    // 城市按字母排序
    citySort() {
      /* eslint-disable arrow-body-style */
      const letOrd = this.firstLetter;
      const arr = letOrd.map((item) => { return { letter: item, list: [] }; });
      this.cityList.forEach((item) => {
        const st = item.pinyin.charAt(0).toUpperCase();
        const i = letOrd.indexOf(st);
        arr[i].list.push(item);
      });
      return arr;
    },
    // 是否显示所有城市列表
    isCityShow() {
      if (this.keyValue) return false;
      return true;
    },
    // 城市搜索结果
    searchCity() {
      const arr = [];
      const keyWord = this.keyValue;
      this.cityList.forEach((item) => {
        if (item.name.indexOf(keyWord) !== -1 || item.pinyin.indexOf(keyWord) !== -1) {
          arr.push(item);
        }
      });
      return arr;
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
  components: {
    'mt-header': Header,
    'mt-button': Button,
    'mt-search': Search,
    'mt-cell': Cell,
  },
  created() {
    /**
     * 获取所有城市
     */
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle',
    });
    this.$axios.get(this.$URL.citysUrl).then((response) => {
      if (response.data.code === 0) {
        this.cityList = response.data.data.citys;
        Indicator.close();
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
  width: 100%;
  overflow: hidden;
  .mint-header{
    z-index: 100;
    background-color: #fff;
    color: #000;
    font-size: 0.17rem;
  }
  .mint-search{
    height: 0.52rem;
    .mint-searchbar {
      background-color: #f4f4f4;
      a{
        font-size: 0.14rem;
        color: #000;
      }
    }
  }
  .mint-indexlist-content {
    width: calc(100% - 17px);
    height: 100vh;
    font-size: 14px;
    overflow: auto;
    .recommend-city {
      background-color: #fff;
      padding-left: 0.15rem;
      padding-top: 0.15rem;
    }
  }
  .mint-indexlist-nav {
    position: absolute;
    top: 0;
    right: 0;
    width: 0.17rem;
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
    margin-bottom: 0.1rem;
  }
  .city-index-detail {
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    li {
      width: calc((100vw - 33px) / 3);
      padding-bottom: 0.15rem;
      text-align: center;
      div {
        height: 0.3rem;
        background-color: #f4f4f4;
        line-height: 0.3rem;
        border-radius: 0.03rme;
        box-sizing: border-box;
        margin: 0 0.075rem;
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
    padding-left: 0.15rem;
    height: 0.3rem;
    line-height: 0.13rem;
  }
  ul {
    padding-left: 0.15rem;
    li {
      color: #191a1b;
      position: relative;
      height: 0.48rem;
      width: calc((100vw - 0.33rem) / 3);
      text-align: center;
      float: left;
      font-size: 14px;
      line-height: 0.48rem;
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
