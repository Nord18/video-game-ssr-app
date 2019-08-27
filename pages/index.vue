<template>
  <div>
    <div class="container-fluid pt-5">
      <div class="row justify-content-center">
        <div class="col-sm-12 col-md-5 col-lg-4 col-xl-3 mb-4" v-for="(game, index) in getGames" :key="index">
          <div class="card bg-light text-center pt-3 pb-3 d-flex align-items-center item">
            <img class="pic mb-3" :src="game.cover.url.replace('t_thumb', 't_cover_big')" alt="cover">
            <h5 class="card-title"><a href="#" @click.prevent="openGame(game.id)">{{game.name}}</a></h5>
            <p class="card-text">{{game.genres[0].name}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async fetch({store}) {
    await store.dispatch('fetchData')
  },
  computed: {
    getGames() {
      return this.$store.state.games
    }
  },
  methods: {
    openGame(id) {
      this.$router.push('/games/' + id)
    }
  }
}
</script>

<style>
</style>
