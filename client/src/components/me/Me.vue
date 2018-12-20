<template>
  <div class="center-view">
    <header class="center-header">
      <div class="tou">
        <i class="iconfont icon-filedicon_my_green_"></i>
      </div>
      <h2>
        <router-link :to="isLogin ? '': '/login'">{{user}}</router-link>
      </h2>
      <span v-if="isLogin" @click="outLogin">退出</span>
    </header>
    <main class="center-main">
      <div class="dingdan">
        <h3 @click="$router.push('/shopCart')">
          <i class="iconfont icon-dingdan" style="color: orange;"></i>
          <span>电影订单</span>
        </h3>
        <h3>
          <i class="iconfont icon-pintuandingdan" style="color: greenyellow;;"></i>
          <span>拼团订单</span>
        </h3>
      </div>
      <div class="ul">
        <router-link tag="div" class="card" to="/user/card">
          <router-link class="list" to="/card">
            <i style="color: rgb(245, 89, 89);" class="iconfont icon-qia01"></i>
            <span>卖座卡</span>
          </router-link>
          <div class="list1">
            <i class="iconfont icon-20151209tubiaolianxizhuanhuan09-copy"></i>
          </div>
        </router-link>
        <div class="balace">
          <div class="list">
            <i style="color: red;" class="iconfont icon-yue"></i>
            <span>余额</span>
          </div>
          <div class="list1">
            <p>￥0</p>
            <i class="iconfont icon-20151209tubiaolianxizhuanhuan09-copy"></i>
          </div>
        </div>
        <div class="set">
          <div class="list">
            <i style="color: rgb(15, 235, 52);" class="iconfont icon-shezhi2"></i>
            <span>设置</span>
          </div>
          <div class="list1">
            <i class="iconfont icon-20151209tubiaolianxizhuanhuan09-copy"></i>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Center',
  data() {
    return {

    };
  },
  computed: {
    ...mapState([
      'userName',
    ]),
    ...mapGetters([
      'isLogin', // 是否处于登录状态
    ]),
    // 页面上是要显示用户手机号还是立即登录按钮
    user() {
      if (this.userName) return this.userName;
      return '立即登录';
    },
  },
  methods: {
    ...mapMutations([
      'addUserName',
    ]),
    outLogin() {
      localStorage.removeItem('userName');
      this.addUserName('');
    },
  },

};
</script>

<style lang="scss">
.center-view {
  flex: 1;
}

.center-header {
  height: 2rem;
  background: url('/static/images/266643.jpg') no-repeat;
  background-size: 100%;
  display: flex;
  align-items: center;
  .tou {
    height: 0.67rem;
    width: 0.67rem;
    border: 0.02rem solid white;
    background: #ccc;
    border-radius: 50%;
    margin-left: 0.2rem;
    .iconfont {
      font-size: 0.6rem;
      color: white;
    }
  }
  h2 {
    font-size: 0.24rem;
    margin: 0 0.4rem 0 0.15rem;
    a {
      color: white;
    }
  }
  span{
    font-size: 0.16rem;
    color: #fff;
    height: 0.25rem;
    line-height: 0.25rem;
  }
}
.center-main {
  flex: 1;
  display: flex;
  background: #f4f4f4;
  flex-direction: column;
  .dingdan {
    display: flex;
    height: 0.8rem;
    h3 {
      background: white;
      flex: 1;
      display: flex;
      flex-direction: column;
      text-align: center;
      i {
        font-size: 0.26rem;
        margin: 0.08rem 0;
      }
      span {
        font-size: 0.2rem;
        color: #ccc;
      }
    }
  }
  .ul {
    display: flex;
    flex: 1;
    border-top: 0.1rem solid #f4f4f4;
    flex-direction: column;
    .card,
    .balace,
    .set {
      padding: 0 0.15rem;
      background: white;
      height: 0.50rem;
      border-bottom: 0.01rem solid #f4f4f4;
      display: flex;
      .list {
        flex: 1;
        display: flex;
        align-items: center;
        i {
          font-size: 0.2rem;
        }
        span {
          font-size: 0.2rem;
          margin-left: 0.1rem;
        }
      }
      .list1 {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        i {
          font-size: 0.14rem;
        }
        p {
          font-size: 0.16rem;
          color: #444;
        }
      }
    }
  }
}
</style>
