<template>
  <div class="myCard-div">
    <mt-header title="-卖座卡-">
      <mt-button class="iconfont icon-xiangzuo"
        slot="left"
        @click="$router.go(-1)"></mt-button>
    </mt-header>
    <div class="myCard">
      <img src="/static/images/card-bg.png">
      <p class="msg">你还没有卖座卡哦～</p>
      <div class="btn">我的卖座卡</div>
    </div>
  </div>
</template>

<script>
import { Header, Button } from 'mint-ui';

export default {
  name: 'card',
  components: {
    'mt-header': Header,
    'mt-button': Button,
  },
};
</script>

<style lang="scss">
 .myCard-div {
   display: flex;
   flex-direction: column;
   height: 100%;
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
