<template>
	<div class="Circle-loading"
   :style="styleObj"
   :class="{
    'Circle-loadingNe': direction == 'negative',
    'la-sm': size == 'S',
    'la-2x': size == 'L2',
    'la-3x': size == 'L3'
   }">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>
</template>

<script>
export default {
	name: 'CircleLoading',
	props: {
		direction: {
			type: String,
			default: 'negative' // 转动方向，negative：负，逆时针；positive：正，顺时针
		},
		size: {
			type: String,
			default: 'M', // 大小，L3：3倍放大，L2：2倍放大，M：正常大小，S：小
		},
		color: {
			type: String,
			default: '' // 颜色，默认白色
		}
	},
	computed: {
		styleObj() {
			return {
				color: this.color
			}
		}
	}
}
</script>

<style lang="less" scoped>
.Circle-loading,
.Circle-loading > div {
  position: relative;
  box-sizing: border-box;
}

.Circle-loading {
  display: block;
  font-size: 0;
  color: #fff;
}

.Circle-loading > div {
  display: inline-block;
  float: none;
  background-color: currentColor;
  border: 0 solid currentColor;
}

.Circle-loading {
  width: 32px;
  height: 32px;
}

.Circle-loading > div {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  margin-top: -4px;
  margin-left: -4px;
  border-radius: 100%;
  animation: ball-spin-clockwise-fade 1s infinite linear;
}

.Circle-loading > div:nth-child(1) {
  top: 5%;
  left: 50%;
  animation-delay: -0.875s;
}

.Circle-loading > div:nth-child(2) {
  top: 18.1801948466%;
  left: 81.8198051534%;
  animation-delay: -0.75s;
}

.Circle-loading > div:nth-child(3) {
  top: 50%;
  left: 95%;
  animation-delay: -0.625s;
}

.Circle-loading > div:nth-child(4) {
  top: 81.8198051534%;
  left: 81.8198051534%;
  animation-delay: -0.5s;
}

.Circle-loading > div:nth-child(5) {
  top: 94.9999999966%;
  left: 50.0000000005%;
  animation-delay: -0.375s;
}

.Circle-loading > div:nth-child(6) {
  top: 81.8198046966%;
  left: 18.1801949248%;
  animation-delay: -0.25s;
}

.Circle-loading > div:nth-child(7) {
  top: 49.9999750815%;
  left: 5.0000051215%;
  animation-delay: -0.125s;
}

.Circle-loading > div:nth-child(8) {
  top: 18.179464974%;
  left: 18.1803700518%;
  animation-delay: 0s;
}

.Circle-loading.la-sm {
  width: 16px;
  height: 16px;
}

.Circle-loading.la-sm > div {
  width: 4px;
  height: 4px;
  margin-top: -2px;
  margin-left: -2px;
}

.Circle-loading.la-2x {
  width: 64px;
  height: 64px;
}

.Circle-loading.la-2x > div {
  width: 16px;
  height: 16px;
  margin-top: -8px;
  margin-left: -8px;
}

.Circle-loading.la-3x {
  width: 96px;
  height: 96px;
}

.Circle-loading.la-3x > div {
  width: 24px;
  height: 24px;
  margin-top: -12px;
  margin-left: -12px;
}

.Circle-loadingNe > div {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  margin-top: -4px;
  margin-left: -4px;
  border-radius: 100%;
  animation: ball-spin-fade 1s infinite linear;
}

.Circle-loadingNe > div:nth-child(1) {
  top: 5%;
  left: 50%;
  animation-delay: -1.125s;
}

.Circle-loadingNe > div:nth-child(2) {
  top: 18.1801948466%;
  left: 81.8198051534%;
  animation-delay: -1.25s;
}

.Circle-loadingNe > div:nth-child(3) {
  top: 50%;
  left: 95%;
  animation-delay: -1.375s;
}

.Circle-loadingNe > div:nth-child(4) {
  top: 81.8198051534%;
  left: 81.8198051534%;
  animation-delay: -1.5s;
}

.Circle-loadingNe > div:nth-child(5) {
  top: 94.9999999966%;
  left: 50.0000000005%;
  animation-delay: -1.625s;
}

.Circle-loadingNe > div:nth-child(6) {
  top: 81.8198046966%;
  left: 18.1801949248%;
  animation-delay: -1.75s;
}

.Circle-loadingNe > div:nth-child(7) {
  top: 49.9999750815%;
  left: 5.0000051215%;
  animation-delay: -1.875s;
}

.Circle-loadingNe > div:nth-child(8) {
  top: 18.179464974%;
  left: 18.1803700518%;
  animation-delay: -2s;
}

@keyframes ball-spin-fade {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.25;
    transform: scale(0.5);
  }
}

@keyframes ball-spin-clockwise-fade {
  50% {
    opacity: 0.25;
    transform: scale(0.5);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>