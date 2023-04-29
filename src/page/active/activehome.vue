<template>
  <div class="active_home">
    <div class="active_home_main">
       <keep-alive include="activenav" >
         <router-view>
         </router-view>
       </keep-alive>
    </div>
  </div>
</template>
<script type="text/javascript">

export default {
  name: 'active',
  components: {},
  data() {
     return {}
  },
  methods: {}
}
</script>
<style lang="less">
 @keyframes bgAnit3 {
   from {
     background-position-x: -18px;
   }
   to {
     background-position-x: -1240px;
   }
 }
 @keyframes bgAnit4 {
   from {
     background-position-x: -1240px;
   }
   to {
     background-position-x: -18px;
   }
 }
  .active_home {
      .active_page {
        padding: 510px 0 44px;
        position: relative;
        &.active_nav .active_page_wrapper .wrapper {
          background: none;
        }
        .active_page_wrapper {
          .wrapper {
            position: relative;
            background: #262933 url("../../assets/active/active_png.png") no-repeat;
            background-position: -18px -583px;
          }
          .top_bg {
            position: absolute;
            top: 0;
            left: 0;
            height: 50px;
            width: 100%;
            background: url("../../assets/active/active_png.png") no-repeat;
            background-position: -18px -305px;
            animation: bgAnit1 6s linear infinite alternate;
            >div {
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
              background: url("../../assets/active/active_png.png") no-repeat;
            }
            .bg1 {
              background-position: -1240px -385px;
              animation: bgAnit3 6s linear infinite alternate;
            }
            .bg2 {
              background-position: -18px -465px;
              animation: bgAnit4 6s linear infinite alternate;
            }
          }
          .active_page_content {
            position: relative;
            padding: 30px 200px 15px;
            color: #fff;
            font-size: 14px;
            &.middle {
              padding: 30px 232px 15px;
            }
            .warning_color {
              color: #e34d12;
              font-size: 16px;
            }
            .default_color {
              color: #7c839f;
            }
            .active_section_box {
              margin-bottom: 45px;
              color: #c3c3c3;
              .active_time {
                &.left {
                  text-align: left;
                  line-height: 21px;
                  margin-top: 13px;
                }
              }
            }
            .active_title {
              font-family: vkFont;
              font-size: 30px;
              line-height: 30px;
              text-align: center;
              color: #fff;
              .active_sub_title {
                font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
                font-size: 14px;
                color: #7c839f;
                line-height: 16px;
                margin-bottom: 15px;
              }
            }
            .section_box_wrapper {
              line-height: 24px;
              margin-top: 5px;
              &.active_rules {
                margin-top: 13px;
                ul, ol {
                  width: calc(100% - 16px);
                  margin-left: 16px;
                  li {
                    list-style: decimal;
                    color: #c3c3c3;
                    font-size: 14px;
                    line-height: 24px;
                    margin-top: 14px;
                    &:first-child {
                      margin-top: 0;
                    }
                  }
                }
              }
            }
            .active_time {
              text-align: center;
              font-size: 14px;
              line-height: 14px;
              margin-top: 15px;
            }
            .error_tip {
              text-align: center;
              color: #e34d12;
            }
          }
          .back_active_nav {
            text-align: center;
            margin-top: 40px;
            .botton {
              height: 44px;
              line-height: 44px;
              width: 338px;
              font-size: 18px;
            }
          }
        }
    }
  }
 .active_page {
   .active_page_top_btn {
     position: absolute;
     width: 100%;
     text-align: center;
     top: 440px;
     left: 0;
     .active_page_btn {
       display: inline-block;
       width: 170px;
       height: 68px;
     }
   }
 }
 </style>
