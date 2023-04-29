<template>
  <game-decorator :getGameAPI="ApiSetting.getIaGame" :isLogoutUpdate="true" />
</template>

<script>
import gameDecorator from "../../components/game-decorator"

export default {
  name: "xiaoaigame",
  components: { gameDecorator },
}
</script>
