<template>
  <game-decorator :getGameAPI="ApiSetting.index.getImGameUrl" />
</template>

<script>
import gameDecorator from "../../components/game-decorator"

export default {
  name:"imGame",
  components: { gameDecorator }
}
</script>
