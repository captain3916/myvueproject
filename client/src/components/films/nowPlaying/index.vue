<template>
  <div class="nowPlayingList-wrap">
    <ul>
      <li v-for="(item,index) in filmList"
        :key="index">
        <router-link :to="'/film/' + item.filmId">
          <div class="film-img">
            <img :src="item.poster" alt>
          </div>
          <div class="film-info">
            <div class="film-info-name info-col">
              <span class="name">{{item.name}}</span>
              <span class="item">{{item.item.name}}</span>
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
          <div class="file-buy">购票</div>
        </router-link>
      </li>
    </ul>
    <div class="loadMore" @click="loadMore">{{loadMsg}}</div>
  </div>
</template>

<script>
export default {
  name: 'noPlayfilm',
  data() {
    return {
      loadMsg: '点击加载下一页',
      filmList: [],
      totalPage: 0, // 总页数
      pageNum: 1, // 当前页码
      pageSize: 6, // 每页条数
    };
  },
  methods: {
    /**
     * 获取电影列表
     */
    getFilms() {
      this.$axios.get(this.$URL.filmsUrl, {
        params: {
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          type: 1,
        },
      })
      .then((response) => {
        if (response.data.code === 0) {
          this.totalPage = Math.ceil(response.data.data.total / this.pageSize);
          this.filmList.push(...response.data.data.films);
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
    loadMore() {
      if (this.pageNum >= this.totalPage) {
        this.loadMsg = '别拉了，我是有底线的！';
        return;
      }
      this.pageNum += 1;
      this.getFilms();
    },
  },
  created() {
    this.getFilms();
  },
};
</script>

<style lang="scss">
.nowPlayingList-wrap {
  background: #fff;
  div.loadMore{
    width: 100%;
    height: 0.25rem;
    line-height: 0.25rem;
    text-align: center;
    font-size: 0.18rem;
    color: #ccc;
  }
  ul {
    margin-left: 0.15rem;
    font-size: 0.12rem;
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
        }
        .file-buy::after {
          content: "";
          position: absolute;
          border: 1px solid #ff5f16;
          top: -50%;
          bottom: -50%;
          left: -50%;
          right: -50%;
          border-radius: 4px;
          transform: scale(0.5);
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
}
</style>
