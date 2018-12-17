<template>
  <div class="cinemas">
    <mt-header title="影院">
      <mt-button class="iconfont icon-xiangzuo" slot="left"></mt-button>
      <mt-button class="iconfont icon-sousuo" slot="right"></mt-button>
    </mt-header>
    <mt-cell title="标题" label="描述信息" is-link></mt-cell>
  </div>
</template>

<script>
import { Cell, Header, Button } from 'mint-ui';

export default {
  name: 'cinemas',
  components: {
    'mt-cell': Cell,
    'mt-header': Header,
    'mt-button': Button,
  },
};
</script>

<style lang="scss">
</style>
