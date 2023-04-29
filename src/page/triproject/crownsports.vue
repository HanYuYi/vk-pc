<template>
  <game-decorator :getGameAPI="ApiSetting.index.getCrownSportUrl" />
</template>

<script>
import gameDecorator from "../../components/game-decorator"

export default {
name: "crownsports",
components: { gameDecorator }
}
</script>
