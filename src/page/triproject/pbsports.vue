<template>
  <game-decorator :getGameAPI="ApiSetting.index.getPBSportUrl" />
</template>

<script>
import gameDecorator from "../../components/game-decorator"

export default {
  name: "pbsports",
  components: { gameDecorator }
}
</script>
