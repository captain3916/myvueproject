<template>
  <div class="film-detail">
    <div class="film-poster">
      <img
        src="https://pic.maizuo.com/usr/movie/f713d0f85512087679ac951e8565d187.jpg?x-oss-process=image/quality,Q_70"
        alt
      >
    </div>

    <div class="film-detail">
      <div class="col">
        <div class="film-name">
          <span class="name">{{filmName}}</span>
          <span class="item">3D</span>
        </div>
        <div class="film-grade">
          <span class="grade">7.2</span>
          <span class="grade-text">分</span>
        </div>
      </div>

      <div class="film-category grey-text">动作 | 奇幻 | 冒险</div>
      <div class="film-premiere-time grey-text">2018-12-07上映</div>
      <div class="film-nation-runtime grey-text">美国 澳大利亚 | 143分钟</div>
      <div
        class="film-synopsis grey-text"
      >本片由杰森·莫玛领衔主演，讲述半人半亚特兰蒂斯血统的亚瑟·库瑞踏上永生难忘的征途——他不但需要直面自己的特殊身世，更不得不面对生而为王的考验：自己究竟能否配得上“海王”之名。</div>
      <div class="toggle">
        <i class="iconfont icon-xiala"></i>
      </div>
    </div>

    <a class="gobtn goBack" @click="goBack">返回</a>
    <router-link class="gobtn" to="/film/9898">我要看猫王</router-link>
  </div>
</template>

<script>
export default {
  name: 'FilmDetail',

  data() {
    return {
      filmName: '',
    };
  },
  // watch: {
  //   $route() {
  //     this.getFilmName();
  //     console.log('参数发生了变化');
  //   }
  // },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getFilmName() {
      setTimeout(() => {
        if (this.$route.params.filmId === '4469') {
          this.filmName = '海王';
        } else {
          this.filmName = '猫王';
        }
      }, 1000);
    },
  },
  created() {
    this.getFilmName();
  },
  beforeRouteEnter(to, from, next) {
    console.log('组件内前置守卫');
    next();
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to, from, next) {
    console.log('组件更新守卫');
    this.getFilmName();
    next();
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    console.log('组件内后置守卫');
    next();
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  },
};
</script>

<style lang="scss">
.film-detail {
  flex: 1;
  overflow-y: auto;

  .film-poster {
    height: 2.1rem;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .film-detail {
    padding: 0.15rem;
    padding-top: 0.12rem;
    background-color: #fff;

    .col {
      display: flex;
      align-items: center;
    }

    .film-name {
      flex: 1;
      display: flex;
      align-items: center;

      .name {
        color: #191a1b;
        font-size: 0.18rem;
        height: 0.24rem;
        line-height: 0.24rem;
        margin-right: 0.08rem;
      }

      .item {
        font-size: 0.12rem;
        color: #fff;
        background-color: #d2d6dc;
        height: 0.14rem;
        line-height: 0.14rem;
        padding: 0 0.02rem;
        border-radius: 0.02rem;
        display: inline-block;
      }
    }

    .film-grade {
      flex-shrink: 0;
      width: 1rem;
      text-align: right;
      color: #ffb232;
      font-size: 0.12rem;

      .grade {
        font-size: 0.18rem;
        font-style: italic;
      }
    }

    .grey-text {
      font-size: 0.13rem;
      line-height: 0.2rem;
      color: #797d82;
      margin-top: 0.04rem;
    }

    .film-synopsis {
      margin-top: 0.08rem;
      overflow: hidden;
      &.hide {
        height: 0.4rem;
      }
    }

    .toggle {
      text-align: center;
      &.hide {
        i {
          transform: translate(180deg);
        }
      }
    }
  }
  .gobtn {
    font-size: 0.16rem;
  }
}
</style>
