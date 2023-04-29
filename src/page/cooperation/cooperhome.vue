<template>
 <div class="cooperhome">
   <style-header/>
<!--   <div class="buoy">
     <router-link to="/cooperhome" class="buoy_item buoy_tnc"
     :class="{'active':$route.name =='sponsor'}">
     </router-link>
     <router-link to="/dawnbattle" class="buoy_item buoy_vk"
     :class="{'active':$route.name =='dawnbattle'}">
     </router-link>
   </div>-->
   <router-view></router-view>
 </div>
</template>

<script>
import StyleHeader from './styleHeader'

export default {
  name: "cooperhome",
  components: { StyleHeader },
  data() {
    return {
    };
  }
};
</script>

<style scoped lang="less">
  .cooperhome {
    width: 100%;
    height: 100%;
    .buoy {
      position: fixed;
      top:50%;
      transform:translateY(-50%);
      right: 35px;
      z-index: 1;
      .buoy_item {
        display: block;
        width: 289px;
        height: 144px;
        cursor: pointer;
        transition:background 0.3s;
        &.buoy_tnc {
          background:url("../../assets/cooperation/tncnormal.png") no-repeat;
          &:hover,&.active {
            background:url("../../assets/cooperation/tnchover.png") no-repeat
          }
        }
        &.buoy_vk {
          margin-top: -20px;
          background:url("../../assets/cooperation/vknormal.png") no-repeat;
          &:hover,&.active {
            background:url("../../assets/cooperation/vkhover.png") no-repeat
          }
        }
      }

    }
  }
</style>
<style lang="less">
//动画
[aos=fade-up] {
  transform: translate(0,100px);
  opacity: 0;
  transition: all 1s cubic-bezier(.25,.1,.25,1);
}
[aos=fade-up].aos-animate {
  transform: translate(0,0);
  opacity: 1;

}
</style>
