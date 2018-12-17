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
          <div class="file-buy">预购</div>
          <!-- <div class="file-buy">
            <button @click.stop="addDilm(item)">+</button>
            <input type="text" :value="getNum(item.filmId)">
            <button @click.stop="reduceFilm(item)">-</button>
          </div> -->
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'comingSoon',
  data() {
    return {
      filmList: [],
      totalPage: 0, // 总页数
      pageNum: 1, // 当前页码
      pageSize: 10, // 每页条数
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
          type: 2,
        },
      })
      .then((response) => {
        if (response.data.code === 0) {
          this.totalPage = Math.ceil(response.data.data.total / this.pageSize);
          const films = response.data.data.films;
          for (let i = 0; i < films.length; i += 1) {
            films[i].filmNum = 0;
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
          font-size: 0.16rem;
          height: 100%;
          width: 0.5rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          button{
            width: 100%;
            font-size: 0.16rem;
            height: 0.2rem;
            line-height: 0.2rem;
          }
          input{
            height: 0.25rem;
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
}
</style>
