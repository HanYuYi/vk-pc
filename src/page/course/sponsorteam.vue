<template>
  <div class="sponsorteam">
    <div class="content">
      <section class="baseinfo">
        <img :src="sponsorInfo.match_logo" alt=" ">
        <div class="r_info">
          <h3 class="ellips" :title="sponsorInfo.match_name">{{sponsorInfo.match_name}}</h3>
          <div class="r_des"><p>{{sponsorInfo.match_desc}}</p></div>
        </div>
      </section>
      <section class="team_box">
        <div v-if="sponsorInfo.member_list.length>5" @click="pageClick(1)" class="step prev"></div>
        <div v-if="sponsorInfo.member_list.length>5" @click="pageClick(2)" class="step next"></div>
        <div class="team" >
          <ul :style="{width:sponsorInfo.member_list.length*teamW  + 'px',transform:'translateX(-'+transW+'px)'}">
            <li v-for="(item,index) in sponsorInfo.member_list" :key="index">
              <div class="num">{{item.member_positon}} </div>
              <img :src="item.member_avatar" alt="" onerror="this.src='/pc_static/defaultimg/pack_244.png';this.onerror=null">
              <div class="name"><span class="ellips" :title="item.member_name">{{$t('contestant')}}&nbsp;&nbsp;{{item.member_name}}</span></div>
            </li>
          </ul>
        </div>
      </section>
      <section class="honor" v-show="sponsorInfo.honor_lists && sponsorInfo.honor_lists.length">
        <ul>
          <li class="honor_th">
            <span>{{$t('Event_name')}}</span>
            <span>{{$t('Game_time')}}</span>
            <span>{{$t('win_place')}}</span>
          </li>
          <li v-for="(honor,index) in sponsorInfo.honor_lists" :key="index">
            <span class="ellips" :title="honor.match_name">{{honor.match_name}}</span>
            <span :style="{opacity:honor.match_date?1:0}">{{formatDate(honor.match_date*1000, 'yyyy.MM.dd HH:mm')}}</span>
            <span>{{honor.rank}}</span>
          </li>
        </ul>
      </section>
     </div>
  </div>
</template>

<script>
import {  formatDate} from '../../utils/util'
export default {
  name: "sponsorteam",
  data() {
    return {
      teamW:256,
      transW:0,
      sponsorInfo:{member_list:[]}
    };
  },
  mounted() {

    this.getsponsorInfo()
  },
  methods: {
    formatDate(time,format) {
      return formatDate (time,format)
    },
    //请求数据
    getsponsorInfo() {
      this.$http(this.ApiSetting.getsponsorInfo,{id:this.$route.params.id})
      .then((res) => {
        if(res.status === 1 && res.data && res.data.data){
          this.sponsorInfo = res.data.data
        }
        // this.listLoad = false
      }, (err) => {
        // this.listLoad = false
      })
    },
    pageClick(type) {
      if(type==1) {//左
        this.transW -= this.teamW*1;
        if(this.transW<0) {
          this.transW = 0
        }
      }else if(type ==2) {//右
        this.transW += this.teamW*1;
        if(this.transW > (this.sponsorInfo.member_list.length - 5)*this.teamW) {
          this.transW = (this.sponsorInfo.member_list.length - 5)*this.teamW
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.sponsorteam {
  padding: 130px 0 80px;
  position: relative;
  background: url("../../assets/course/bg.png") no-repeat;
  .content {
    width: 1240px;
    margin: auto;
  }
  .baseinfo {
    width: 1240px;
    height: 160px;
    background-color: #262933;
    box-shadow: 0px 2px 50px 0px
      rgba(0, 0, 0, 0.2);
    padding: 15px 20px;
    box-sizing: border-box;
    img {
      width: 240px;
      height: 130px;
      margin-right: 40px;
      float: left;
    }
    .r_info {
      float: left;
      max-width: 920px;
      h3 {
        font-size: 24px;
        letter-spacing: 1.2px;
        color: #ffffff;
        max-width: 910px;
      }
      .r_des {
        position: relative;
        height: 96px;
        width: 920px;
        p {
          position: absolute;
          top:50%;
          transform: translateY(-50%);
          font-size: 18px;
          color: #7c839f;
        }
      }

    }
  }
  .team_box {
    width: 1240px;
    position: relative;
    margin:20px 0;
    height: 240px;
    .team {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .step {
      width: 36px;
      height: 36px;
      position: absolute;
      top:50%;
      transform: translateY(-50%);
      cursor: pointer;
      transition: background 0.3s;
    }
    .prev {
      left: -50px;
      background: url("../../assets/course/btn-l-normal.png") no-repeat;
      &:hover {
        background: url("../../assets/course/btn-L-hover.png") no-repeat;
      }
    }
    .next {
      right: -50px;
      background: url("../../assets/course/btn-r-normal.png") no-repeat;
      &:hover {
        background: url("../../assets/course/btn-R-hover.png") no-repeat;
      }
    }
    ul {
      transition:transform 0.4s;
      li {
        background: #fff;
        width: 216px;
        height: 240px;
        border: solid 1px #07f1b7;
        margin-right: 40px;
        position: relative;
        float: left;
        box-sizing: border-box;
        .num {
          position: absolute;
          width: 36px;
          height: 30px;
          font-size: 18px;
          color: #ffffff;
          text-align: center;
          line-height: 30px;
          top:0;
          left: 0;
          background: url("../../assets/course/rect_little.png") no-repeat;
        }
        img {
          width: 214px;
          height: 200px;
        }
        .name {
          width: 214px;
          height: 38px;
          background-color: #262933;
          text-align: center;
          span  {
            font-size: 18px;
            color: #ffffff;
            line-height: 38px;
            max-width: 200px;
            display: inline-block;
          }
        }
      }
    }
  }
  .honor {
    width: 1240px;
    ul {
      li {
        width: 100%;
        height: 38px;
        &:nth-child(2n) {
          background-color: #2c2f3b;
        }
        &:nth-child(2n+1) {
          background-color: #262933;
        }
        span {
          width: 413px;
          font-size: 16px;
          letter-spacing: 0.8px;
          color: #7c839f;
          display: block;
          text-align: center;
          line-height: 38px;
          margin: 0;
          float: left;
          &:first-child {
            padding-left: 10px;
            box-sizing: border-box;
          }
        }
      }
    }
    .honor_th {
      span {
        color: #07e9f1;
      }
    }
  }
}
</style>
