const POSITION_LABELS = {
  G: 'Goalkeeper',
  D: 'Defender',
  M: 'Midfielder',
  F: 'Attacker',
}

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
  const [homeTeam, awayTeam] = response
  
  return {
    home: mapTeamLineup(homeTeam),
    away: mapTeamLineup(awayTeam),
  }
}
