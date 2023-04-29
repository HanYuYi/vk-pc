<template>
  <game-decorator :getGameAPI="ApiSetting.index.getIMSportUrl" />
</template>

<script>
import gameDecorator from "../../components/game-decorator"

export default {
  name: "imsports",
  components: { gameDecorator }
}
</script>
