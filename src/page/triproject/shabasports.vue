<template>
  <game-decorator :getGameAPI="ApiSetting.index.getShabaSportUrl" />
</template>

<script>
import gameDecorator from "../../components/game-decorator"

export default {
  name: "shabasports",
  components: { gameDecorator }
}
</script>
