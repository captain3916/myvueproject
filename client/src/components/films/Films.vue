<template>
  <div class="films-content">
    <!-- 城市定位 -->
    <City></City>
    <!-- /城市定位 -->
    <!-- 上方轮播图 -->
    <BannerList></BannerList>
    <!-- /上方轮播图 -->
    <!-- 上方导航 -->
    <div class="tables-bar-wrapper">
      <ul>
        <li :class="{active : curTab === 'nowPlayling'}"
          @click="ToNowPlaying">
          <span>正在热映</span>
        </li>
        <li :class="{active : curTab === 'comingSoon'}"
          @click="ToComingSoon">
          <span>即将上映</span>
        </li>
        <div :style="getStyle">
          <span></span>
        </div>
      </ul>
    </div>
    <!-- /上方导航 -->
    <!-- 影片列表 -->
    <transition
      mode="out-in"
      enter-active-class="fadeInRight"
      leave-active-class="fadeOutLeft">
      <router-view></router-view>
    </transition>
    <!-- /影片列表 -->
  </div>
</template>

<script>
import BannerList from './Banner/BannerList';
import City from '../../common/City';

export default {
  name: 'Films',
  data() {
    return {
      curTab: 'nowPlayling',
    };
  },
  computed: {
    getStyle() {
      if (this.curTab === 'nowPlayling') {
        return { transform: 'translate3d(0%, 0px, 0px)' };
      }
      return { transform: 'translate3d(100%, 0px, 0px)' };
    },
  },
  methods: {
    ToNowPlaying() {
      this.curTab = 'nowPlayling';
      this.$router.push('/films/nowPlaying');
    },
    ToComingSoon() {
      this.curTab = 'comingSoon';
      this.$router.push('/films/comingSoon');
    },
  },
  components: {
    BannerList,
    City,
  },
};
</script>

<style lang="scss">
.films-content{
  flex: 1;
  overflow: auto;
  position: relative;
}

.tables-bar-wrapper {
  width: 100%;
  height: 49px;
  position: sticky;
  top: 0;
  background-color: white;
  font-size: 14px;
  z-index: 100;
  ul {
    height: 100%;
    display: flex;
    align-items: center;
    li {
      height: 100%;
      width: 50%;
      text-align: center;
      position: relative;
      span {
        height: 100%;
        display: block;
        line-height: 49px;
      }
    }
    li.active {
      color: #ff5f16;
    }
    div {
      position: absolute;
      width: 50%;
      bottom: 0px;
      transform: translate3d(100%, 0px, 0px);
      transition: all 0.2s;
      span {
        width: 56px;
        border-bottom: 2px solid #ff5f16;
        border-radius: 20px;
        display: block;
        margin: auto;
      }
    }
  }
  &::after{
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #ededed;
    position: absolute;
    bottom: -1px;
    left: 0px;
    transform: scaleY(0.5);
  }
}

.fadeInRight{
  animation-duration: 500ms;
}
.fadeOutLeft{
  animation-duration: 500ms;
}
</style>
