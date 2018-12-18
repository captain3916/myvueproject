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
export default {
  name: 'App',
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
  animation-duration: 2000ms;
}
.bounceOutDown{
  animation-duration: 2000ms;
}
</style>
