<template>
  <game-decorator :getGameAPI="ApiSetting.index.getFbSportUrl" />
</template>

<script>
import gameDecorator from "../../components/game-decorator"

export default {
  name: "fbsports",
  components: { gameDecorator },
}
</script>
