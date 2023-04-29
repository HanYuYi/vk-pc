<template>
  <!-- old width: 1300-->
  <game-decorator :getGameAPI="ApiSetting.index.getBtiSportUrl" />
</template>

<script>
import gameDecorator from "../../components/game-decorator"

export default {
  name: "btisports",
  components: { gameDecorator },
}
</script>
