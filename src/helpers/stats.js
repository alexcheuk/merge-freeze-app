export const getStatusPairs = (statuses) => {
  const results = []

  let start
  let end

  statuses.forEach(status => {
    if (!start && status.isFrozen) {
      start = status
    } else if (start && !status.isFrozen) {
      end = status

      results.push([start, end])

      start = null
      end = null
    }
  })

  return results
}

export const getMergeFreezeAvg = (statusPairs) => {
  let sum = 0

  statusPairs.forEach(pair => {
    sum += pair[1].datetime.getTime() - pair[0].datetime.getTime()
  })

  return Math.floor(sum / statusPairs.length)
}

export const getMergeFreezeStats = (statuses) => {
  const statusPairs = getStatusPairs(statuses)

  return {
    avg: getMergeFreezeAvg(statusPairs),
    count: statusPairs.length
  }
}
