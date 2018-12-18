<template>
  <div class="cinemas">
    <mt-header title="影院">
      <mt-button class="iconfont icon-xialajiantouxiao" slot="left"
        @click="$router.push('/city')">{{curCity}}</mt-button>
      <mt-button class="iconfont icon-sousuo" slot="right"
        @click="isSearchShow=true"></mt-button>
    </mt-header>

    <mt-search
      v-model="keyValue"
      cancel-text="取消"
      placeholder="搜索">
    </mt-search>

    <div class="cinemas-list" v-show="isCinemasShow">
      <mt-cell
        v-for="(item,index) in cinemas"
        :key="index"
        :title="item.name"
        :label="item.address"
        is-link>
      </mt-cell>
    </div>

    <div class="cinemas-list" v-show="!isCinemasShow">
      <mt-cell
        v-for="(item,index) in searchCinemas"
        :key="index"
        :title="item.name"
        :label="item.address"
        is-link>
      </mt-cell>
    </div>
  </div>
</template>

<script>
import { Cell, Header, Button, Search, Indicator } from 'mint-ui';
import { mapState } from 'vuex';

export default {
  name: 'cinemas',
  data() {
    return {
      cinemas: [], // 当前城市所有影院
      keyValue: '', // 影院关键字
    };
  },
  computed: {
    ...mapState([
      'curCity', // 当前城市
      'curCityId', // 当前城市ID
    ]),
    // 是否显示默认影院列表
    isCinemasShow() {
      if (this.keyValue) return false;
      return true;
    },
    // 城市搜索结果
    searchCinemas() {
      const arr = [];
      const keyWord = this.keyValue;
      this.cinemas.forEach((item) => {
        if (item.name.indexOf(keyWord) !== -1) {
          arr.push(item);
        }
      });
      return arr;
    },
  },
  components: {
    'mt-cell': Cell,
    'mt-header': Header,
    'mt-button': Button,
    'mt-search': Search,
  },
  created() {
    // 获取当前城市所有影院数据
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle',
    });
    const cityId = this.curCityId;
    this.$axios.get(this.$URL.cinemasUrl, {
      params: { cityId },
    }).then((response) => {
      if (response.data.code === 0) {
        this.cinemas = response.data.data.cinemas;
      }
      Indicator.close();
    });
  },

};
</script>

<style lang="scss">
.cinemas{
  flex:1;
  overflow: hidden;
  position: relative;
  .mint-header{
    height: 44px;
    line-height: 44px;
    font-size: 18px;
    background: #fff;
    color: #000;
    div{
      .icon-xialajiantouxiao{
        font-size: 14px;
        color: #666;
      }
    }
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
  .cinemas-list{
    height: 100vh;
    overflow: auto;
    .mint-cell {
      min-height: 0.75rem;
    }
  }
}
</style>
