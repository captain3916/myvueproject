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
        <label for="clearCard"><input type="checkBox" id="clearCard"> 清空</label>
      </div>
      <ul>
        <li
          v-for="(item,index) in userShopCard"
          :key="index"
          class="filmItem">
          <p>{{item.filmName}}</p>
          <p class="price">￥ {{item.filmNum*item.price}}</p>
          <button class="reduce" @click.stop="reduceFilm(item)">-</button>
          <span>{{item.filmNum}}</span>
          <button class="add" @click.stop="addDilm(item)">+</button>
        </li>
      </ul>
      <div class="total">
        <p>￥ {{totalPrice}}</p>
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
      })
      return num;
    },
  },
  methods: {
    ...mapMutations([
      'reduceFilm',
      'addDilm',
    ]),
  }
};
</script>

<style lang="scss">
 .myCard-div {
   display: flex;
   flex-direction: column;
   height: 100%;
 }

 .cardList{
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
        height: 0.4rem;
        padding: 0 0.1rem;
        justify-content: space-between;
        align-items: center;
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
