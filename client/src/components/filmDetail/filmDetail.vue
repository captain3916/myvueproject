<template>
  <div class="film">
    <div class="detail-top">
      <div class="film-poster"
        :style="{'background-image': 'url('+film.poster+')'}">
        <!-- <img :src="film.poster" alt /> -->
        <mt-button class="iconfont icon-xiangzuo" slot="left"
        @click="$router.go(-1)"></mt-button>
      </div>

      <div class="film-detail">
        <div class="col">
          <div class="film-name">
            <span class="name">{{film.name}}</span>
            <span class="item">{{film.filmType && film.filmType.name}}</span>
          </div>
          <div class="film-grade">
            <span class="grade">{{film.grade}}</span>
            <span class="grade-text">分</span>
          </div>
        </div>

        <div class="film-category grey-text">{{film.category}}</div>
        <div class="film-premiere-time grey-text">{{showTime}}上映</div>
        <div class="film-nation-runtime grey-text">{{film.nation}} | {{film.runtime}}分钟</div>
        <div class="film-synopsis grey-text">{{film.synopsis}}</div>
        <div class="toggle">
          <i class="iconfont icon-xiala"></i>
        </div>
      </div>

      <div class="actors">
        <div class="actors-title-bar">
          <span class="actors-title-text">演职人员</span>
        </div>
        <div class="actor-list">
          <ul>
            <li v-for="(item,index) in film.actors" :key="index">
              <img :src="item.avatarAddress" />
              <p>{{item.name}}</p>
              <p>{{item.role}}</p>
            </li>
          </ul>
        </div>
      </div>

      <!-- <mt-popup
        v-model="popupVisible"
        popup-transition="popup-fade">
      </mt-popup> -->

    </div>

    <div class="detail-Bottom">
      <button @click="popupVisible=!popupVisible">选座购票</button>
    </div>

  </div>
</template>

<script>
import { Popup, Button } from 'mint-ui';

export default {
  name: 'FilmDetail',

  data() {
    return {
      filmId: this.$route.params.filmId,
      // popupVisible: false,
      film: {},
    };
  },
  computed: {
    // 影片上映时间
    showTime() {
      const str = new Date(this.film.premiereAt * 1000).toLocaleDateString();
      return str.split('/').join('-');
    },
  },
  components: {
    'mt-popup': Popup,
    'mt-button': Button,
  },
  methods: {
  },

  created() {
    // 通过ID查询影片详细信息
    this.$axios.get(this.$URL.filmItemUrl, { params: { filmId: this.filmId } })
    .then((response) => {
      this.film = response.data.data;
    });
  },

};
</script>

<style lang="scss">
.film {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .detail-top{
    flex: 1;
    overflow: auto;
    background-color: #ddd;
    .film-poster {
      height: 2.1rem;
      overflow: hidden;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      .mint-button--normal{
        position: fixed;
        left: 0.1rem;
        top: 0.1rem;
        border-radius: 50%;
        padding: 0 0.09rem 0 0.14rem;
        background: rgba(255,255,255,0.5);
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
        height: 0.6rem;
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

    .actors{
      width: 100%;
      height: 1.95rem;
      margin-top: 0.1rem;
      background: #fff;
      overflow: hidden;
      .actors-title-bar{
        width: 100vw;
        padding: 0.15rem;
        font-size: 0.16rem;
        line-height: 0.2rem;
        color: #191a1b;
      }
      .actor-list{
        font-size: 0.13rem;
        // width: 300vw;
        position: relative;
        overflow-x: auto;
        height: 1.45rem;
        &:before{
          content: "";
          display: table;
        }
        &:after{
          content: "";
          display: table;
        }
        ul{
          position: absolute;
          display: flex;

          li{
            width: 0.85rem;
            margin-right: 0.1rem;
            img{
              width: 0.85rem;
              height: 0.85rem;
            }
            p{
              margin-top: 0.05rem;
              font-size: 0.12rem;
              text-align: center;
              color: #191a1b;
              overflow: hidden;
              text-overflow: hidden;
              white-space: nowrap;
              &:last-child{
                color: #797d82;
              }
            }
          }
        }
      }
    }
    .gobtn {
      font-size: 0.16rem;
    }
  }
  .detail-Bottom{
    height: 49px;
    flex-shrink: 0;
    display: flex;
    button{
      flex: 1;
      height: 100%;
      color: #fff;
      background: #ff5f16;
      font-size: 0.16rem;
      line-height: 49px;
    }
  }


}
</style>
