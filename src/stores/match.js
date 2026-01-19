import { defineStore } from 'pinia'
import apiFootballClient from 'src/services/apiFootballClient'
import { mapMatchResponse, mapFixtureResponse, STATUS } from 'src/utilities/helpers'
import lineUpMockResponse from 'src/utilities/lineUpMockResponse.json'
import fixtureMockResponse from 'src/utilities/fixtureMockResponse.json'

const USE_MOCK_DATA = true;
const USE_RANDOM_ERROR = false;

const FIXTURE_ID = '592872'

export const useMatchStore = defineStore('match', {
  state: () => ({
    status: STATUS.LOADING,
    errorMessage: '',
    data: [],
  }),

  getters: {
    isLoading: (s) => s.status === STATUS.LOADING,
    hasError: (s) => s.status === STATUS.ERROR,
  },

  actions: {
    async fetchFixtureData() {
      if (USE_MOCK_DATA) {
        return {
          lineup: lineUpMockResponse,
          fixture: fixtureMockResponse,
        }
      }

      if (USE_RANDOM_ERROR && Math.random() <= 0.5) {
        throw new Error('Server is down');
      }

      const lineupResponse = await apiFootballClient.get('/fixtures/lineups', {
        params: { fixture: FIXTURE_ID },
      })

      const fixtureResponse = await apiFootballClient.get('/fixtures', {
        params: { id: FIXTURE_ID },
      })

      const hasLineupError = lineupResponse.data.errors && lineupResponse.data.errors.length !== 0;
      const hasFixtureError = fixtureResponse.data.errors && fixtureResponse.data.errors.length !== 0;

      if (hasLineupError || hasFixtureError) {
        const msg = lineupResponse.data.errors.rateLimit || fixtureResponse.data.errors.rateLimit;
        throw new Error(msg || 'An internal error occured');
      }

      return {
        lineup: lineupResponse.data,
        fixture: fixtureResponse.data,
      }
    },

    async fetchMatchData() {
      this.status = STATUS.LOADING
      try {
        await new Promise((r) => setTimeout(r, 1200))

        const { lineup, fixture } = await this.fetchFixtureData()

        this.data = mapMatchResponse(lineup.response)

        const fixtureDetails = mapFixtureResponse(fixture.response)

        this.data.referee = fixtureDetails.referee
        this.data.venue = fixtureDetails.venue

        this.status = STATUS.SUCCESS
      } catch (error) {
        this.status = STATUS.ERROR
        this.errorMessage = error.message
      }
    },

    addYellowCard(isHomeTeam, playerNumber) {
      const team = isHomeTeam ? this.data.home : this.data.away

      team.startXI.map((player) => {
        if (player.number != playerNumber || player.redCard) {
          return
        }

        if (player.yellowCards === 1) {
          player.yellowCards++
          this.addRedCard(isHomeTeam, playerNumber)
          return
        }

        player.yellowCards++
      })
    },

    addRedCard(isHomeTeam, playerNumber) {
      const team = isHomeTeam ? this.data.home : this.data.away

      team.startXI.map((player) => {
        if (player.number == playerNumber && !player.redCard) {
          player.redCard++
        }
      })
    },

    resetYellowCards(isHomeTeam, playerNumber) {
      const team = isHomeTeam ? this.data.home : this.data.away

      team.startXI.map((player) => {
        if (player.number == playerNumber) {
          player.yellowCards = 0
        }
      })
    },
  },
})
