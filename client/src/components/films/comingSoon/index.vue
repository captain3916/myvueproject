<template>
  <div class="comeingSoon-wrap">
    <ul>
      <li v-for="(item,index) in filmList"
        :key="index">
        <a>
          <div class="film-img">
            <img :src="item.poster" alt>
          </div>
          <div class="film-info">
            <div class="film-info-name info-col">
              <span class="name">{{item.name}}</span>
              <span class="item">{{item.item&&item.item.name}}</span>
            </div>
            <div class="film-info-grade info-col">
              <span class="label">观众评分</span>
              <span class="item">{{item.grade}}</span>
            </div>
            <div class="film-info-actors info-col">
              <span class="label">主演：{{getAutor(item.actors)}}</span>
            </div>
            <div class="film-info-detail info-col">
              <span class="label">{{item.nation}} | {{item.runtime}}分钟</span>
            </div>
          </div>
          <div class="file-buy" @click.stop="goToBuy(item)">预购</div>
        </a>
      </li>
    </ul>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade">
      <div class="descript">
        <span>减少</span>
        <span>张数</span>
        <span>增加</span>
      </div>
      <div class="buyInfo">
        <button class="reduce" @click.stop="reduceFilm(curFilm)">-</button>
        <span>{{getNum(curFilm.filmId)}}</span>
        <button class="add" @click.stop="addDilm(curFilm)">+</button>
      </div>
      <div class="sub" @click="popupVisible=false">确定</div>
    </mt-popup>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { Popup } from 'mint-ui';

export default {
  name: 'comingSoon',
  data() {
    return {
      filmList: [],
      totalPage: 0, // 总页数
      pageNum: 1, // 当前页码
      pageSize: 10, // 每页条数
      popupVisible: false, // 是否弹出电影购票弹窗
      curFilm: 0, // 当前要购票的是哪个电影
    };
  },
  components: {
    'mt-popup': Popup,
  },
  computed: {
    ...mapState([
      'userShopCard', // [{filmName,filmId,filmNum,price},...]
    ]),
  },
  methods: {
    ...mapMutations([
      'addDilm',
      'reduceFilm',
    ]),
    /**
     * 根据ID获取购车内对应商品的购买数量
     */
    getNum(id) {
      let num = 0;
      this.userShopCard.forEach((item) => {
        if (item.filmId === id) num = item.filmNum;
      });
      return num;
    },
    /**
     * 获取电影列表
     */
    getFilms() {
      this.$axios.get(this.$URL.filmsUrl, {
        params: {
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          type: 2,
        },
      })
      .then((response) => {
        if (response.data.code === 0) {
          this.totalPage = Math.ceil(response.data.data.total / this.pageSize);
          const films = response.data.data.films;
          for (let i = 0; i < films.length; i += 1) {
            films[i].price = Math.round((Math.random() * 30) + 35);
          }
          this.filmList.push(...films);
          // this.filmList = this.filmList.concat(response.data.data.films);
        } else {
          /* eslint-disable no-alert */
          alert(response.data.msg);
        }
      });
    },
    /**
     * 获取主演名字
     */
    getAutor(list) {
      if (list) {
        // console.log(list);
        return list.map(item => item.name).join(' ');
      }
      return '';
    },
    // 点击购票按钮
    goToBuy(film) {
      this.curFilm = film;
      this.popupVisible = true;
    },
  },
  created() {
    this.getFilms();
  },
};
</script>

<style lang="scss">
.comeingSoon-wrap {
  background: #fff;
  ul {
    margin-left: 15px;
    font-size: 12px;
    li {
      padding: 15px 15px 15px 0;
      height: 124px;
      position: relative;
      a {
        display: flex;
        align-items: center;
        .film-img {
          width: 66px;
          height: 94px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .film-info {
          width: calc(100% - 116px);
          padding: 0 10px;
          .info-col {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
          }
          .film-info-name {
            span.name {
              max-width: calc(100% - 25px);
              color: #191a1b;
              font-size: 16px;
              height: 22px;
              line-height: 22px;
              margin-right: 5px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              vertical-align: middle;
            }
            span.item {
              font-size: 12px;
              color: #fff;
              background-color: #d2d6dc;
              height: 14px;
              line-height: 14px;
              padding: 0 2px;
              border-radius: 2px;
              vertical-align: middle;
            }
          }
          .film-info-grade,
          .film-info-actors,
          .film-info-detail {
            span.label {
              font-size: 13px;
              margin-top: 4px;
              color: #797d82;
              vertical-align: middle;
            }
            span.item {
              color: #ffb232;
              font-size: 14px;
              vertical-align: middle;
            }
          }
        }
        .file-buy {
          font-size: 13px;
          line-height: 25px;
          height: 25px;
          width: 50px;
          color: #ff5f16;
          text-align: center;
          border-radius: 2px;
          position: relative;
          &::after{
            content: "";
            position: absolute;
            border: 1px solid #ff5f16;
            top: -50%;
            bottom: -50%;
            left: -50%;
            right: -50%;
            border-radius: 4px;
            -webkit-transform: scale(0.5);
            transform: scale(0.5);
          }
        }
      }
    }
    li::after {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      border-bottom: 1px solid #ededed;
      position: absolute;
      left: 0;
      bottom: -1px;
      transform: scaleY(0.5);
    }
  }
  .mint-popup{
    width: 80vw;
    font-size: 0.16rem;
    .descript{
      height: 0.4rem;
      font-size: 0.18rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: #ccc;
    }
    .buyInfo{
      height: 0.5rem;
      font-size: 0.18rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      button{
        width: 0.25rem;
        height: 0.25rem;
        font-size: 0.2rem;
        line-height: 0.25rem;
        border-radius: 50%;
        background: white;
        &.add{
          border: 1px solid #337ab7;
        }
        &.reduce{
          border: 1px solid #d9534f;
        }
      }
    }
    .sub{
      text-align: center;
      font-size: 0.2rem;
      height: 0.4rem;
      line-height: 0.4rem;
      background: #5cb85c;
      color: white;
    }

  }
}
</style>
