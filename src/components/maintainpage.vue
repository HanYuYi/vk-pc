<template>
  <div class="maintain">
    <div class="page_img">
      <img src="../assets/maintain/img.png" alt="">
    </div>
    <div class="page_text">
      <p>{{content}}</p>
      <p>{{$t('Maintenance_time')}}<span>{{time}}</span></p>
      <p>{{$t('If_you_have_questions_you')}}</p>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
    name:"maintainpage",
    components: {},
    data() {
        return {}
    },
    props:{
      time: String,
      content: String
    },
    methods: {}
}
</script>
<style scoped>
.maintain{
  padding: 100px 0;
  color: #7c839f;
  font-size: 18px;
  text-align: center;
}
.page_img {
  height: 330px;
  width: 100%;
  text-align: center;
}
.maintain .page_text{
  margin-top: 20px;
  line-height: 26px;
}
</style>
