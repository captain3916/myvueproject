<template>
  <div class="teamBuyPage">
    <ul class="proContent">
      <li>
        <img class="ban" src="https://mall.s.maizuo.com/8b9cc12ffbe5a6f82683afc315aedcf8.jpg" />
        <div class="detail">
          <h2>三峡清江椪柑 3斤装</h2>
          <p>优选果园新鲜采摘 果肉金黄剔透 鲜嫩多汁 清甜爽口 入口化渣</p>
          <div class="priceAndbuy">
            <div class="priceanduser">
              <div class="price">
                <p class="nowPrice"><span>￥</span>1350.0</p>
                <p class="originPrice">原价1690.0</p>
              </div>
              <div class="user">
                <div>
                  <img src="https://mall.s.maizuo.com/46b0e6b2d802852da925ee3e52baaf7b.jpg">
                </div>
                <div>
                  <img src="https://mall.s.maizuo.com/b04a0b9f27f05f18e7dfa8b60e5f9f55.jpg">
                </div>
              </div>
            </div>
            <button>去拼单</button>
          </div>
        </div>
      </li>
      <li>
        <img class="ban" src="https://mall.s.maizuo.com/8b9cc12ffbe5a6f82683afc315aedcf8.jpg" />
        <div class="detail">
          <h2>三峡清江椪柑 3斤装</h2>
          <p>优选果园新鲜采摘 果肉金黄剔透 鲜嫩多汁 清甜爽口 入口化渣</p>
          <div class="priceAndbuy">
            <div class="priceanduser">
              <div class="price">
                <p class="nowPrice"><span>￥</span>1350.0</p>
                <p class="originPrice">原价1690.0</p>
              </div>
              <div class="user">
                <div>
                  <img src="https://mall.s.maizuo.com/46b0e6b2d802852da925ee3e52baaf7b.jpg">
                </div>
                <div>
                  <img src="https://mall.s.maizuo.com/b04a0b9f27f05f18e7dfa8b60e5f9f55.jpg">
                </div>
              </div>
            </div>
            <button>去拼单</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

// {
//   "activeCode" : "JZnr0Wth",
//   "masterTitle" : "三峡清江椪柑 3斤装",
//   "slaveTitle" : "优选果园新鲜采摘 果肉金黄剔透 鲜嫩多汁 清甜爽口 入口化渣",
//   "activeBannerUrl" : "https://mall.s.maizuo.com/8b9cc12ffbe5a6f82683afc315aedcf8.jpg",
//   "price" : 1350.0,
//   "marketPrice" : 1690.0,
//   "productId" : 34834182.0,
//   "relatedProductId" : 34833100.0,
//   "isSub" : 0.0,
//   "onlineStatus" : 1.0,
//   "userList" : [
//       {
//           "icon" : "https://mall.s.maizuo.com/46b0e6b2d802852da925ee3e52baaf7b.jpg",
//           "nickName" : "13925****61"
//       },
//       {
//           "icon" : "https://mall.s.maizuo.com/b04a0b9f27f05f18e7dfa8b60e5f9f55.jpg",
//           "nickName" : "15556****42"
//       }
//   ],
//   "maxAvailableInventory" : 899996.0,
//   "hasVideo" : 0.0,
//   "labels" : {
//       "buyerShow" : ""
//   }
// }

<script>
export default {
  name: 'teamBuy',
  data() {
    return {
      msg: '我是9.9拼团页面',
    };
  },
  mounted() {
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
}
</style>
