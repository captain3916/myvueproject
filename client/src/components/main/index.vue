<template>
  <div class="main">
    <keep-alive>
      <transition
      mode="out-in"
      enter-active-class="bounceInUp"
      leave-active-class="bounceOutDown">
        <router-view></router-view>
      </transition>
    </keep-alive>
    <Nav></Nav>
  </div>
</template>

<script>
import Nav from '../../common/NavBar/Nav';

export default {
  name: 'AppMain',
  components: {
    Nav,
  },
};
</script>

<style>
.main{
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}
</style>
