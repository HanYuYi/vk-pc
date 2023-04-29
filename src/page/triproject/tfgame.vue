<template>
  <game-decorator :getGameAPI="ApiSetting.index.gettfGameGameUrl" :isLogoutUpdate="true" />
</template>

<script>
import gameDecorator from "../../components/game-decorator"

export default {
  nmae:"uwgame",
  components: { gameDecorator },
}
</script>
