<template>
  <div class="myCard-div">
    <mt-header title="-电影订单-">
      <mt-button class="iconfont icon-xiangzuo"
        slot="left"
        @click="$router.go(-1)"></mt-button>
    </mt-header>
    <div v-if="!hasShoping" class="myCard">
      <img src="/static/images/buy.png">
      <p class="msg">去挑些喜欢的商品吧～</p>
      <div class="btn" @click="$router.push('/films/nowPlaying')">首页</div>
    </div>
    <div v-if="hasShoping" class="cardList">
      <div class="cardTitle">
        <p>已选商品</p>
        <label for="clearCard" @click="clearCart"><input type="checkBox" id="clearCard"> 清空</label>
      </div>
      <ul>
        <li
          v-for="(item,index) in userShopCard"
          :key="index"
          class="filmItem">
          <p class="name">{{item.filmName}}</p>
          <p class="price">￥ {{item.filmNum*item.price}}</p>
          <button class="reduce" @click.stop="reduceFilm(item)">-</button>
          <span>{{item.filmNum}}</span>
          <button class="add" @click.stop="addDilm(item)">+</button>
        </li>
      </ul>
      <div class="total">
        <p>合计: ￥ {{totalPrice}}</p>
        <button>去结算</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Header, Button } from 'mint-ui';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'shopCard',
  components: {
    'mt-header': Header,
    'mt-button': Button,
  },
  computed: {
    ...mapState([
      'userShopCard',
    ]),
    // 购物车是否有商品
    hasShoping() {
      if (this.userShopCard.length) return true;
      return false;
    },
    // 所有商品总价
    totalPrice() {
      let num = 0;
      this.userShopCard.forEach((item) => {
        num += item.price * item.filmNum;
      });
      return num;
    },
  },
  methods: {
    ...mapMutations([
      'reduceFilm',
      'addDilm',
      'clearCart',
    ]),
  },
};
</script>

<style lang="scss">
.myCard-div {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.cardList{
  flex: 1;
  font-size: 0.16rem;
  .cardTitle,.total{
    background: #ddd;
    padding: 0 0.1rem;
    height: 0.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.17rem
  }
  .total{
    padding: 0;
    font-size: 0.18rem;
    position: absolute;
    width: 100%;
    bottom: 0;
    p{
    padding: 0 0.1rem;
    color: white;
    background: #444;
    height: 100%;
    line-height: 0.4rem;
    flex: 1;
    }
    button{
    height: 100%;
    background: #38ca73;
    color: white;
    width: 30%;
    line-height: 0.4rem;
    }
  }
  ul{
    .filmItem{
      display: flex;
      height: 0.5rem;
      padding: 0 0.1rem;
      justify-content: space-between;
      align-items: center;
      position: relative;
      p.name{
        width: 1.9rem;
      }
      p.price{
        width: 0.5rem;
      }
      button{
        width: 0.25rem;
        height: 0.25rem;
        font-size: 0.2rem;
        line-height: 0.25rem;
        border-radius: 50%;
        background: white;
        &.add{
          border: 1px solid #337ab7;
        }
        &.reduce{
          border: 1px solid #d9534f;
        }
      }
      &::after{
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        color: #ccc;
        border-bottom: 1px solid #ccc;
        position: absolute;
        left: 0;
        bottom: -1px;
        transform: translateY(0.5);
      }
    }

  }
}

.myCard {
  flex: 1;
  padding-top: 28vh;
  img {
    width: 0.95rem;
    height: 0.95rem;
    display: block;
    margin: 0 auto;
  }
  .msg {
    margin: 0.11rem 0 0.2rem;
    font-size: 0.14rem;
    width: 100%;
    text-align: center;
    color: #bdc0c5;
  }
  .btn {
    border: 1px solid #ff5f16;
    color: #ff5f16;
    border-radius: 0.03rem;
    width: 1.5rem;
    height: 0.33rem;
    line-height: 0.33rem;
    text-align: center;
    font-size: 0.14rem;
    margin: 0 auto;
  }
}
</style>
