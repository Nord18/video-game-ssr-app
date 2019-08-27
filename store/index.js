import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
    state: {
        games: null,
        game: null
    },
    mutations: {
        loadData(state, data) {
            state.games = data
        },
        loadSingleData(state, data) {
            state.game = data
        }
    },
    actions: {
        async fetchData({ commit }) {
            try {
                const response = await fetch('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games/?fields=name,genres.name,cover.url,popularity&order=popularity:desc&expand=genres', {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Accept': 'application/json',
                        'user-key': 'b8d1862ec6e8ee7eac24123736307fea'
                    }
                });
                const data = await response.json();
                const gamesList = data.filter(game => {
                    return game.genres
                });
                commit('loadData', gamesList)
            } catch (e) {
                console.log(e)
            }
        },
        async fetchSingleData({ commit }, game) {
            try {
                const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games/${game}/?fields=name,cover.url,summary,platforms.name,first_release_date,websites,total_rating,screenshots.url,total_rating&expand=platforms,screenshots,cover`, {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Accept': 'application/json',
                        'user-key': 'b8d1862ec6e8ee7eac24123736307fea'
                    }
                });
                const data = await response.json();
                commit('loadSingleData', data)
            } catch (e) {
                console.log(e)
            }
        }
    }
})

export default store