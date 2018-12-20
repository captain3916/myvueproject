<template>
  <div id="app">
    <transition
      enter-active-class="animated bounceInUp"
      leave-active-class="animated bounceOutDown"
      mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  methods: {
    ...mapActions([
      'getCity',
    ]),
  },
  mounted() {
    // 获取当前城市
    this.getCity();
  },
};
</script>

<style>
@import '../static/css/move-base.css';
html,body,#app{
  width: 100%;
  height: 100%;
  font-size: 26.67vw;
}
.bounceInup{
  animation-duration: 1500ms;
}
.bounceOutDown{
  animation-duration: 1500ms;
}
</style>
