const POSITION_LABELS = Object.freeze({
  G: 'Goalkeeper',
  D: 'Defender',
  M: 'Midfielder',
  F: 'Attacker',
})

export const STATUS = Object.freeze({
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
})

const toPositionLabel = (pos) => POSITION_LABELS[pos] ?? 'Unknown'

const mapPlayer = (player) => ({
  id: player.id,
  name: player.name,
  number: player.number,
  position: toPositionLabel(player.pos),
  yellowCards: 0,
  redCard: 0
})

const mapPlayerWrapper = (wrapper) => mapPlayer(wrapper.player)

const mapTeamLineup = (item) => ({
  team: {
    id: item.team.id,
    name: item.team.name,
  },
  startXI: Array.isArray(item.startXI) ? item.startXI.map(mapPlayerWrapper) : [],
})

export const mapMatchResponse = (response) => {
  const [home, away] = [...response];

  return {
    home: home ? mapTeamLineup(home) : null,
    away: away ? mapTeamLineup(away) : null,
  }
}

export const mapFixtureResponse = (response) => {
  const [item] = [...response];

  if (!item) {
    return { referee: null, venue: null }
  }

  const referee = item.fixture?.referee ?? null
  const venue = item.fixture?.venue?.name ?? null

  return { referee, venue }
}
