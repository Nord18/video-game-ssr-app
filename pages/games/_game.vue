<template>
  <div>
    <div class="col-12" v-for="(game, index) in loadSingleGame" :key="index">
      <div class="card bg-light">
        <div :style="`background: url(${game.screenshots[0].url.replace('t_thumb', 't_720p')}) no-repeat center center; background-size: cover`" class="card-img-top pic-top mb-5">
          <h1 class="card-title title">{{game.name}}</h1>
        </div>
        <div class="row px-3">
          <div class="col-sm-12 col-md-5 col-xl-2">
            <img class="pic mb-3" :src="game.cover.url.replace('t_thumb', 't_cover_big')" alt="cover">
            <div>
              <span class="font-weight-bold">Platforms:</span> <p v-for="(platform, index) in game.platforms" :key="index">{{platform.name}}</p>
            </div>
            <p><span class="font-weight-bold">Realesed:</span> {{new Date(game.first_release_date).toDateString()}}</p>
            <div v-show="game.total_rating">
              <p><span class="font-weight-bold">Total rating:</span> {{Math.round(game.total_rating)}}%</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-7 col-xl-10">
            <p>{{game.summary}}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-4 mb-5" v-for="(screenshot, index) in game.screenshots" :key="index">
            <img class="screenshots" :src="screenshot.url.replace('t_thumb', 't_screenshot_big')" alt="screenshots">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async fetch({store, params}) {
    await store.dispatch('fetchSingleData', params.game)
  },
  computed: {
      loadSingleGame() {
          return this.$store.state.game
      }
  }
}
</script>

<style>

.pic-top {
  height: 500px;
  position: relative;
}

.title {
  position: absolute;
  bottom: 0;
  color: #ffffff;
  left: 50%;
  transform: translateX(-50%);
}

.screenshots {
  max-width: 100%;
}

@media screen and (max-width: 576px) {
    .pic-top {
      height: 200px;
    }
    .title {
      font-size: 1.2rem;
      text-align: center;
    }
}

</style>
