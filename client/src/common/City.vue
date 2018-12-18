<template>
    <router-link
        :to="{name: 'city'}"
        class="city-fixed"
        tag="div">
      <span>{{curCity}}</span>
      <i class="iconfont icon-xialajiantouxiao"></i>
    </router-link>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'City',
    computed: {
        ...mapState([
            'curCity',
        ]),
    },
    methods: {
        ...mapActions([
            'getCity',
        ]),
    },
    created() {
        if (!this.curCity) {
            this.getCity();
        }
    },
};
</script>

<style lang="scss">
.city-fixed {
  position: absolute;
  top: 18px;
  left: 7px;
  color: #fff;
  z-index: 10;
  font-size: 10px;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
  text-align: center;
  padding: 0 5px;
  background: rgba(0, 0, 0, 0.2);
}
</style>
