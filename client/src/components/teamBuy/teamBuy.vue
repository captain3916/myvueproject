<template>
  <div class="teamBuyPage" @scroll="isGetMore">
    <ul class="proContent">
      <li v-for="(item,index) in list" :key="index">
        <img class="ban" :src="item.activeBannerUrl" />
        <div class="detail">
          <h2>{{item.masterTitle}}</h2>
          <p>{{item.slaveTitle}}</p>
          <div class="priceAndbuy">
            <div class="priceanduser">
              <div class="price">
                <p class="nowPrice"><span>￥</span>{{item.price/100}}</p>
                <p class="originPrice">原价{{item.marketPrice/100}}</p>
              </div>
              <div class="user">
                <div v-for="(user,i) in item.userList" :key="i">
                  <img :src="user.icon">
                </div>
              </div>
            </div>
            <button>去拼单</button>
          </div>
        </div>
      </li>
    </ul>
    <mt-popup
      v-model="isNoMore">
    没有更多了！
    </mt-popup>
  </div>
</template>

<script>
import { Indicator, Popup } from 'mint-ui';

export default {
  name: 'teamBuy',
  data() {
    return {
      pageSize: 3,
      curPage: 1,
      totalPage: 0,
      list: [],
      isNoMore: false,
    };
  },
  components: {
    'mt-popup': Popup,
  },
  methods: {
    // 获取拼团数据
    getTeamBuyList() {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle',
      });
      this.$axios.get(this.$URL.teamBuyUrl, {
        params: {
          pageSize: this.pageSize,
          pageNum: this.curPage,
        },
      }).then((response) => {
        Indicator.close();
        if (response.data.code === 0) {
          // 数据请求回来了
          this.totalPage = Math.ceil(response.data.data.total / this.pageSize);
          this.list.push(...response.data.data.list);
        } else {
          /* eslint-disable no-alert */
          alert(response.data.msg);
        }
      });
    },

    // 是否需要加载更多
    isGetMore(arg) {
      const conH = arg.target.offsetHeight; // 容器高度
      const totalH = document.querySelector('.proContent').offsetHeight; // 里面子元素的高度
      if (arg.target.scrollTop >= totalH - conH) {
        this.curPage += 1;
        if (this.curPage > this.totalPage) {
          console.log('没有更多了!');
          this.isNoMore = true;
          return;
        }
        this.getTeamBuyList();
      }
    },
  },
  created() {
    this.getTeamBuyList();
  },
};
</script>

<style lang="scss">
.teamBuyPage{
  flex: 1;
  overflow: auto;
  background-color: #ddd;
  ul.proContent{
    width: 100%;
    font-size: 0.16rem;
    li{
      width: 100vw;
      display: flex;
      flex-direction: column;
      padding-bottom: 0.1rem;
      img.ban{
        width: 100%;
      }
      div.detail{
        padding: 0.15rem;
        padding-bottom: 0;
        display: flex;
        background-color: #fff;
        flex-direction: column;
        h2{
          font-size: 0.15rem;
          height: 0.21rem;
          line-height: 0.21rem;
          color: #191a1b;
        }
        p{
          font-size: 0.13rem;
          color: #797d82;
          line-height: 0.19rem;
        }
        div.priceAndbuy{
          display: flex;
          justify-content: space-between;
          div.priceanduser{
            flex: 1;
            display: flex;
            justify-content: space-between;
            div.price{
              display: flex;
              align-items: flex-end;
              p.nowPrice{
                font-size: 0.2rem;
                line-height: 0.2rem;
                color: #c03131;
                span{
                  font-size: 0.16rem;
                }
              }
              p.originPrice{
                margin-left: 3px;
                color: #bdc0c5;
                text-decoration: line-through;
              }
            }
            div.user{
              display: flex;
              div{
                width: 0.3rem;
                height: 0.3rem;
                border-radius: 0.23rem;
                overflow: hidden;
                border: 1px solid #fff;
                &:first-child{
                  margin-right: -0.15rem;
                  z-index: 1;
                }
                img{
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
          button{
            background-color: rgb(192,49,49);
            color: #fff;
            width: 0.9rem;
            height: 0.33rem;
            font-size: 0.14rem;
            border-radius: 0.03rem;
            margin-left: 0.15rem;
          }
        }

      }
    }
  }
  .mint-popup{
    font-size: 0.2rem;
    text-align: center;
    width: 100%;
    height: 0.6rem;
    line-height: 0.6rem;
    color: #c03131;
  }
}
</style>
