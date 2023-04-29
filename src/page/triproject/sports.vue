<template>
  <game-decorator :getGameAPI="ApiSetting.index.getSportUrl" />
</template>
<script>
import gameDecorator from "../../components/game-decorator"

export default {
  name: "sports",
  components: { gameDecorator },
}
</script>
