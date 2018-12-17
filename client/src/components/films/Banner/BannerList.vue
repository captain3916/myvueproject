<template>
  <div class="banner-list">
    <mt-swipe :auto="3000">
      <mt-swipe-item>
        <img src="./images/pic-1.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="./images/pic-2.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="./images/pic-3.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="./images/pic-4.jpg" alt="">
      </mt-swipe-item>
    </mt-swipe>
</div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui';

export default {
  name: 'BannerList',
  components: {
    'mt-swipe': Swipe,
    'mt-swipe-item': SwipeItem,
  },
};
</script>

<style lang="scss">

.banner-list{
  width: 100%;
  height: 2.1rem;
  font-size: 0;
  .mint-swipe{
    .mint-swipe-items-wrap{
      div{
        img{
          width: 100%;
        }
      }
    }
  }
}

</style>
