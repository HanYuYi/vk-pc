<template>
  <div class="pt_game" :class="{'inner_page': showMaintainPage}">
    <div class="wrapper" v-if="showMaintainPage">
      <MaintainPage :time="maintainTime" :content="maintainText"></MaintainPage>
    </div>
    <div class="third_game_jump pt_real" v-show="showMain">
      <div class="pt_game_banner">
        <div class="banner_tit"></div>
        <div class="pool">
          <span><em>累计奖池:</em>¥{{formatNumberSplit(poolReward)}}</span></div>
      </div>
      <div class="pt_game_main_content">
      <!--类型-->
        <div class="content_header_box">
          <div class="content_header">
            <div class="content_tabs fl">
              <span class="tab_item"
              :class="{actived: activeTab == item.id, middle: item.id == 1}"
              @click="handleTabClick(item.id)"
              v-for="item in tabnavs"
              :key="item.id">{{item.title}}</span>
            </div>
            <div class="content_search fr">
              <input type="text" :value="search.filterStr"
              class="search_input"
              placeholder="输入游戏名称"
              @focus = "handleInputFocusChange(1)"
              @blur = "handleInputFocusChange(0)"
              @keyup.enter="handleJump"
              @keyup="handleChange"
              @change="handleChange">
              <span class="icon_search pt_search" @click="handleInputFocusChange(1)"> </span>
              <ul class="filter_list" v-show="isFilterListShow" :class="{'overh_s':activeTab==3||activeTab==4}">
                <li class="item"
                :class="{actived: search.filterIndex == index}"
                v-for="(item, index) in search.filters"
                :key="index"
                @click="handleJump(item)">
                  <img :src="item.icon" :alt="item.title"><span class="name ellips" :title="item.title">{{item.title}}</span>
                </li>
              </ul>
            </div>
          </div>
      </div>
      <!--跑马灯-->
      <div id="node" class="node_ul" style="position: relative">
        <span class="fl" v-for="(list,index) in lists" :key="index">{{list}}</span>
      </div>
      <div class="annunciate"  id="marquee" v-show="lists.length">
         <table height=26 border=0 cellspacing=0 cellpadding=0>
             <tr>
                 <td id="marquee1">
                     <table :width="marqueeUlW">
                         <tr>
                             <td class="inner_td" v-for="(list,index) in lists" :key="index">{{list}}</td>
                         </tr>
                     </table>
                 </td>
                 <td id="marquee2">
                   <table :width="marqueeUlW">
                       <tr>
                           <td class="inner_td" v-for="(list,index) in lists" :key="index">{{list}}</td>
                       </tr>
                   </table>
                 </td>
             </tr>
         </table>
      </div>
      <!--列表-->
      <div class="content_list">
        <div class="list_items" v-if="!listLoad&&tabnavs[activeTab].list.length">
          <div  class="list_item"
          v-for="(item, index) in tabnavs[activeTab].list"
          :key="index"
          v-show="index>=(page.currentpage-1)*page.pagesize && (index+1)<=page.currentpage*page.pagesize"
          @click="handleJump(item, $event)">
            <span class="hover_border"></span>
            <span class="btn_mark" :class="{actived: item.is_collect}" @click.stop="markGame(item)"></span>
            <div class="img_box">
              <img class="game_img" :src="item.icon" >
            </div>
            <p class="game_name ellips" :title="item.title">{{item.title}}</p>
            <p class="game_name game_name_bg ellips"  > </p>
          </div>
        </div>
        <p v-if="!listLoad&&!tabnavs[activeTab].list.length&&activeTab!=2" class="empty_list">暂无游戏！</p>
        <p v-if="!listLoad&&!tabnavs[activeTab].list.length&&activeTab==2&&isLogin" class="empty_list">暂无收藏游戏，快将喜欢的游戏加入收藏吧！</p>
        <p v-if="!listLoad&&!tabnavs[activeTab].list.length&&activeTab==2&&!isLogin" class="empty_list">请先登录！</p>
        <div class="loader" v-show="listLoad"><span></span></div>
        <Page
        :total="page.total"
        :page-size="page.pagesize"
        :current.sync="page.currentpage"
        @on-change="handlePageChange($event)"
        v-if="!listLoad&&tabnavs[activeTab].list.length&&page.total>page.pagesize">
        </Page>
      </div>
      </div>

    </div>
  </div>
</template>
<script type="text/javascript">
import {beforeAfterTime,formatNumberSplit } from '../../utils/util'
import { mapState } from 'vuex'
import MaintainPage from '@/components/maintainpage'
import { Countup } from 'vux'
import { toPlayGame } from '../../utils/playGame'

export default{
  name: 'ptgame',
  components: {
    Countup,
    MaintainPage
  },
  data () {
    return {
      listLoad:false,
      maintainTime: '',
      maintainText: '',
      showMaintainPage: false,
      showMain: false,
      url: '',
      isLoading: false,
      activeTab: 0,
      isSearchInputFocus: false,
      search: {
        filterStr: '',
        filterIndex: -1,
        filters: []
      },
      lists:[],
      tabnavs: [{
        id: '0',
        title: '全部游戏',
        list:[]
      }, {
        id: '1',
        title: '热门游戏',
        list:[]
      }, {
        id: '2',
        title: '奖池游戏',
        list:[]
      },{
        id: '3',
        title: '桌牌游戏',
        list:[]
      }, {
        id: '4',
        title: '我的收藏',
        list:[]
      },],
      poolReward: '--',
      MyMar:null,
      marqueeUlW:0,
      page: {
        total: 10,
        pagesize: 30,
        currentpage: 1
      },
      mgBounsTimer:null
    }
  },
  computed: {
    ...mapState(["isLogin"]),
    isFilterListShow () {
      return this.search.filters.length && this.isSearchInputFocus
    },
  },
  mounted () {
    this.loadMGGameList ();
    this.mgBounsTimer = setInterval( () =>{
      this.reloadBouns ()
    }, 15*1000)
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.mgBounsTimer)
    next()
  },
   methods: {
     formatNumberSplit(num) {
       let str = formatNumberSplit(num)
       return  str.substring(0,str.length-3)
     },
     StringTrim (str) {
       return (str || '').replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
     },
     handleInputFocusChange (type) {
       setTimeout(() => {
         this.isSearchInputFocus = type
       }, 500)
     },
     //刷新奖池
     reloadBouns() {
       this.$http(this.ApiSetting.pyGetJackpot)
       .then(res=>{
         if(res.status == 1) {
           this.poolReward = res.data.prize_pool
         }
       })
     },
     //跑马灯处理
     marqueeHandle() {
       this.marqueeUlW = document.getElementById("node").getBoundingClientRect().width;
       var speed = 15;
       var marquee = document.getElementById("marquee");
       var marquee1 = document.getElementById("marquee1");
       var marquee2 = document.getElementById("marquee2");
       function Marquee() {
           if (marquee&&marquee2&&marquee2.offsetWidth - marquee.scrollLeft <= 0)
               marquee.scrollLeft -= marquee1.offsetWidth
           else {
               marquee.scrollLeft++
           }
       }
       clearInterval(this.MyMar)
       this.MyMar = setInterval(Marquee, speed);
       marquee.onmouseover = ()=>{
         clearInterval(this.MyMar)
       }
       marquee.onmouseout = ()=>{
         this.MyMar = setInterval(Marquee, speed);
       }
     },
     //页码跳转
     handlePageChange (x) {
       this.page.currentpage = x
     },
     //请求数据
    loadMGGameList () {
      this.showMain = true
      this.showMaintainPage = false
      this.listLoad = true
      this.$http(this.ApiSetting.ptSlotgetGameList)
        .then((res) => {
          this.listLoad = false
          if(res.status === 1&&res.data){
            this.poolReward = res.data.prize_pool;
            this.lists = res.data.bet_win_list;
            this.$nextTick(()=>{
              if(this.lists.length) {
                this.marqueeHandle()
              }
            })
            if(res.data.game_list){
              this.page.total = res.data.game_list.length;
              this.tabnavs[0].list = res.data.game_list
              res.data.game_list.forEach(game => {
                if(game.is_hot) {
                  this.tabnavs[1].list.push(game)
                }
                if(game.is_table) {
                  this.tabnavs[3].list.push(game)
                }
                if(game.is_prize) {
                  this.tabnavs[2].list.push(game)
                }
                if(game.is_collect){
                  this.tabnavs[4].list.push(game)
                }
              });
            }
          }else{
            if(res.is_maintain === 1){
              this.showMain = false
              this.showMaintainPage = true
              this.maintainTime = res.message
              this.maintainText = res.info
            }
          }
        }, (err) => {
          this.listLoad = false
        })
    },
     handleJump (item, event) {
       let url = ''
       if (!event) {
         url = item.url ? item.url : this.search.filters[this.search.filterIndex].url
         this.search.filterIndex = -1
         this.search.filterStr = ''
         this.handleChange()
       } else {
         if (/btn_mark/.test(event.target.className)) {
           return
         }
         url = item.url
       }
       this.$nextTick(() => {
         toPlayGame(url)
       })
     },
     handleChange (event) {
       if (event) {
         if (event.keyCode == 38 && this.search.filterIndex >= 1) {
           this.search.filterIndex--
           return
         } else if (event.keyCode == 40 && this.search.filterIndex < this.search.filters.length - 1) {
           this.search.filterIndex++
           return
         }
         if (event.keyCode == 13) {
           return
         }
       }
       const searchStr = event ? event.target.value || '' : ''
       this.search.filterStr = searchStr
       if (!searchStr) {
         this.search.filters = []
         return
       }
       this.search.filters = this.tabnavs[0].list.filter(item => {
         const str = this.StringTrim(searchStr)
         return new RegExp(str).test(item.title)
       })
     },
     //收藏
     markGame (item) {
       if(!this.isLogin) {
         this.$message({
           message: this.$t("login_first"),
           type: 'warning'
         })
         return
       }
       if (this.isLoading) {
         return
       }
       this.isLoading = true;
       let colty = [1,0]
       this.$http(this.ApiSetting.ptCollectGame, { game_code: item.game_code, type: item.is_collect })
       .then(res => {
         if (res.status === 1) {
           item.is_collect = colty[item.is_collect];
           this.tabnavs[1].list = []
           this.tabnavs[2].list = []
           this.tabnavs[3].list = []
           this.tabnavs[0].list.forEach(game => {
             if(game.game_code == item.game_code) {
                game.is_collect = item.is_collect
             }
             if(game.is_hot) {
               this.tabnavs[1].list.push(game)
             }
             if(game.is_table) {
               this.tabnavs[3].list.push(game)
             }
             if(game.is_prize) {
               this.tabnavs[2].list.push(game)
             }
           });
           if(res.data) {
              this.tabnavs[4].list = res.data
           }else {
             this.tabnavs[4].list = []
           }
           if(this.activeTab ==4) {
             this.page.total = res.data.length;
             let curp = Math.ceil(this.page.total/this.page.pagesize)
              if(curp<this.page.currentpage) {
                this.page.currentpage = curp
              }
           }
            this.$message({
              message: res.message,
              type: 'success'
            })
         }
       }).finally(() => {
         this.isLoading = false
       })
     },
     //选择类型
     handleTabClick (activeTab) {
       this.activeTab = activeTab;
       this.page.total = this.tabnavs[activeTab].list.length;
       this.page.currentpage = 1;
     },
   },

}
</script>
<style scoped lang="less">
 .loader{
   opacity: 0.6;
   margin-bottom: 50px;
 }
  .pt_game .wrapper{
    padding-top: 90px;
    width: 1272px;
  }
  .pt_game{
    &.inner_page {
      background-color:transparent;
    }
    background-color: #050730;
    * {box-sizing: border-box;}
    *+* {box-sizing: border-box;}
    #node {
      visibility: hidden;
      position: absolute;
    }
    .annunciate {
      width: 1240px;
      margin: 20px auto 0;
      height: 35px;
      line-height: 35px;
      background-color: rgba(1, 33, 132,0.5);
      overflow: hidden;
      color:#1ab6b6;
      font-size: 14px;
      span {
        margin-right: 50px;
      }
      .inner_td {
        display: inline-block;
      }
    }
    .node_ul {
      width:auto;
      width: max-content;
      opacity: 0;
      span {margin-right: 50px;}
    }
  }

 .third_game_jump{
   overflow: hidden;
   &.pt_real{
     .pt_game_banner{
      //  width: 1920px;
      //  height: 603px;
      // padding-top: 325px;
      padding-bottom: 60px;
       position: relative;
       background: url('../../assets/ptgame/ptbanner.jpg') no-repeat top;
       background-size: 100% 100%;
       .banner_tit {
         margin: 0 auto;
         position: relative;
         z-index: 2;
         width: 798px;
         height: 443px;
         background:url("../../assets/ptgame/benner_tit.png") no-repeat;
        transform: translateX(30px);
       }
       .pool{

        //  position: absolute;
         margin: -100px auto 0;
         width: 778px;
         height: 227px;
         background:url("../../assets/ptgame/prize_pool.png") no-repeat;
         background-size: 100% 100%;
          // top: 325px;
        //  left: 50%;
        //  transform: translateX(-50%);
         text-align: center;
         line-height: 227px;
          font-size: 60px;
         color: #fff;
         span {
           text-shadow: 0 0 5px #fff,
           0 0 10px #25ffff,
           0 0 15px #25ffff,
           0 0 20px #25ffff,
           0 0 35px #25ffff;
         }
         em{
           font-size: 40px;
          vertical-align: bottom;
         }

       }

     }

     .content_header_box{
      width: 100%;
      height: 65px;
      background:url("../../assets/ptgame/type_bg.jpg") no-repeat;
      background-size: 100% 100%;
       margin-top: -3px;
       .content_header{
         width: 1240px;
         margin: 0 auto;
         .content_tabs{
           .tab_item{
             cursor: pointer;
             display: inline-block;
             width: 205px;
             height: 65px;
             line-height: 65px;
             font-size: 18px;
             text-align: center;
             color: #25ffff;
             background: url('../../assets/ptgame/type.png') no-repeat ;
             transition: background 0.3s;
             &.actived{
               cursor: default;
             }
             &.actived,&:hover{
               color: #011f81;
                background: url('../../assets/ptgame/type_hover.png') no-repeat ;
             }
           }
         }
         .content_search{
           position: relative;
           margin-left: auto;
           line-height: 35px;
           border: solid 1px #25ffff;
           border-radius: 17px;
           width: 210px;
           height: 35px;
          margin-top: 14.5px;
           .search_input{
             padding-left: 15px;
             font-size: 14px;
             border: none;
             box-sizing: border-box;
             height: inherit;
             color: #fff;
             background-color: transparent;
             &::-webkit-input-placeholder {
               color: #7c839f;
             }
           }
           .icon_search{
             position: absolute;
             top: 50%;
             transform: translateY(-50%);
             right: 14px;
             display: inline-block;
             width: 15px;
             height: 16px;
             background:url("../../assets/ptgame/icon-search.png") no-repeat;
             background-size: 100% 100%;
             transition: background 0.3s;
           }
           .search_input:focus + .icon_search {
             background:url("../../assets/ptgame/icon-search_hover.png") no-repeat;
             background-size: 100% 100%;
           }
           .filter_list{
             position: absolute;
             width: 100%;
             border-top: none;
             left: 0;
             top: 50px;
             z-index: 10;
             border: solid 1px #25ffff;
              background-color: #060c32;
              box-sizing: border-box;
              padding: 10px 0;
              transition: background-color 0.2s;
              &.overh_s {
                height: 376px !important;
                overflow-y: scroll;
              }
             &::before {
                 content: "";
                 position: absolute;
                 top: -.4em;
                 left: 1em;
                 padding: .35em;
                 background: inherit;
                 border: inherit;
                 border-right: 0;
                 border-bottom: 0;
                 transform: rotate(45deg);
             }
             .item.actived, .item:hover{
               cursor: pointer;
             background-color: #001d7a;
             }
             .item{
               color: #fff;
               height: 40px;
               line-height: 1;
               display: flex;
               align-items: center;
               box-sizing: border-box;
               padding: 0 10px;
             }
             img{
               width: 46px;
               height: 30px;
               margin-right: 5px;
               margin-left: 5px;
             }
             .name{
               display: inline-block;
               width: 75%;
             }
           }
         }
       }
     }
     .content_list{
       width: 1240px;
       margin: 20px auto 0;
       .list_items{
         overflow: hidden;
       }
       .empty_list{
         height: 350px;
         line-height: 230px;
         text-align: center;
         font-size: 18px;
         color: #fff;
       }
       &::after{
         content: "";
         display: block;
         clear: both;
         height: 0px;
         font-size: 1px;
         line-height: 0px;
       }
       .list_item{
         cursor: pointer;
         text-align: center;
         float: left;
         width: 196px;
         height: 174px;
         margin-right: 12px;
         margin-bottom: 20px;
         position: relative;
         &:nth-child(6n) {
           margin-right:0;
         }
         .hover_border{
           position: absolute;
           top: 0;
           left: 0;
            z-index: 1;
           width: 196px;
           height: 174px;
            background: url('../../assets/ptgame/list.png') no-repeat;
            background-size: 100% 100%;
           transition: background 0.3s;
           &:hover {
            background: url('../../assets/ptgame/list_hover.png') no-repeat;
            background-size: 100% 100%;
           }
         }
         .btn_mark{
           display: inline-block;
          z-index: 4;
           cursor: pointer;
           position: absolute;
           right: 20px;
           top: 20px;
           width: 26px;
           height: 22px;
           transition:background 0.3s;
           background:url("../../assets/ptgame/collect_icon.png") no-repeat;
           background-size: 100% 100%;
           &:hover,&.actived{
             background:url("../../assets/ptgame/collect_icon_hover.png") no-repeat;
             background-size: 100% 100%;
           }
         }
         .img_box{
           text-align: center;
            position: relative;
            margin: 0 auto;
            width: 172px;
            height: 111px;
            margin-top: 11px;
         }

         img{
           width: 100%;
           height: 100%;
         }
         .game_name{
           position: absolute;
           left: 50%;
           transform: translateX(-50%);
           z-index: 5;
           height: 40px;
           line-height: 40px;
           width: 170px;
           display: inline-block;
           font-size: 16px;
           color: #ffffff;
           padding: 0 5px;
         }
         .game_name_bg {
           background-color:#161e87;
           z-index: 0;
         }
       }

     }
   }
 }
 .pt_game_main_content {
  background: url('../../assets/ptgame/bg.jpg') no-repeat;
  background-size: 100% 100%;
 }
</style>
