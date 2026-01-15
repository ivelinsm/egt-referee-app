import { defineStore } from 'pinia'
import apiFootballClient from 'src/services/apiFootballClient'
import { mapMatchResponse } from 'src/utilities/helpers'
import mockResponse from 'src/utilities/mockResponse.json'

const STATUS = Object.freeze({
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
})

export const useMatchStore = defineStore('match', {
  state: () => ({
    status: STATUS.IDLE,
    errorMessage: '',
    data: [],
  }),

  getters: {
    isLoading: (s) => s.status === STATUS.LOADING,
    hasError: (s) => s.status === STATUS.ERROR,
  },

  actions: {
    async fetchMatchData() {
      this.status = STATUS.LOADING
      try {

        await new Promise((r) => setTimeout(r, 1200));

        // const { data } = await apiFootballClient.get('/fixtures/lineups', {
        //   params: { fixture: '215662' },
        // })

        // this.data = mapMatchResponse(data?.response ?? [])
        this.data = mapMatchResponse(mockResponse.response);

        this.status = STATUS.SUCCESS;

      } catch (error) {
        this.status = STATUS.ERROR;
        this.errorMessage = error.message;
      }
    },

    addYellowCard(isHomeTeam, playerNumber) {
      const team = isHomeTeam ? this.data.home : this.data.away;

      team.startXI.map(player => {
        if (player.number != playerNumber || player.redCard) {
          return;
        }

        if (player.yellowCards === 1) {
          player.yellowCards++;
          this.addRedCard(isHomeTeam, playerNumber);
          return;
        }

        player.yellowCards++;
      })
    },

    addRedCard(isHomeTeam, playerNumber) {
      const team = isHomeTeam ? this.data.home : this.data.away;

      team.startXI.map(player => {
        if (player.number == playerNumber && !player.redCard) {
          player.redCard++;
        }
      })
    },

    resetYellowCards(isHomeTeam, playerNumber) {
      const team = isHomeTeam ? this.data.home : this.data.away;

      team.startXI.map(player => {
        if (player.number == playerNumber) {
          player.yellowCards = 0;
        }
      })
    }
  },
})
