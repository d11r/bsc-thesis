import {previousRatings} from '../data/seed'
import {metrics} from '../constants'

function dot(x, y) {
  let sum = 0
  for (let i = 0; i < x.length; i++) {
    sum += x[i] * y[i]
  }
  return sum
}

function norm(x) {
  return dot(x, x)
}

function avg(x) {
  let sum = 0
  for (let i = 0; i < x.length; i++) sum += x[i]
  return sum / x.length
}

function getItem(x) {
  let result = []
  for (let i = 0; i < previousRatings.length; i++) {
    result.push(previousRatings[i][x])
  }
  return result
}

function getBoth(i, j) {
  const both = []
  for (let x = 0; x < i.length; x++) {
    if (i[x] !== 0 && j[x] !== 0) both.push([i[x], j[x]])
  }
  return both
}

export function cosineSimilarity(i, j) {
  const product = dot(getItem(i), getItem(j))
  const iNorm = norm(getItem(i))
  const jNorm = norm(getItem(j))

  const result = product / (iNorm * jNorm)
  return Number.isNaN(result) ? 0 : result
}

export function correlationSimilarity(i, j) {
  // isolate cases where user rated both i and j
  const both = getBoth(getItem(i), getItem(j))

  let nomin = 0
  const R_i_bar = avg(getItem(i))
  const R_j_bar = avg(getItem(j))

  for (let x = 0; x < both.length; x++) {
    // both[x] has a pair of i-rating and j-rating
    nomin += (both[x][0] - R_i_bar) * (both[x][1] - R_j_bar)
  }

  let denom1 = 0
  let denom2 = 0
  for (let x = 0; x < both.length; x++) {
    denom1 += (both[x][0] - R_i_bar) * (both[x][0] - R_i_bar)
    denom2 += (both[x][1] - R_j_bar) * (both[x][1] - R_j_bar)
  }

  const result = nomin / (Math.sqrt(denom1) * Math.sqrt(denom2))
  return Number.isNaN(result) ? 0 : result
}

function weightedSumPrediction(prevRatings, u, i, sim) {
  if (prevRatings[u][i] !== 0) return prevRatings[u][i]

  const allMetrics = Object.values(metrics)

  let nomin = 0
  let denom = 0

  for (let j = 0; j < allMetrics.length; j++) {
    if (i !== j && prevRatings[u][i] === 0 && prevRatings[u][j] > 0) {
      // make a prediction
      nomin += prevRatings[u][j] * sim(i, j)
      denom += sim(i, j)
    }
  }

  const result = nomin / denom
  return Number.isNaN(result) ? 1 : result
}

function predict(ratings, sim) {
  const allRatings = previousRatings.concat([ratings])
  const currentUserIdx = allRatings.length - 1

  let predictedRatings = []
  for (let i = 0; i < 12; i++) {
    predictedRatings.push(
      weightedSumPrediction(allRatings, currentUserIdx, i, sim),
    )
  }
  return predictedRatings
}

export function findBest(ratings, indexBlacklist, sim) {
  const pred = predict(ratings, sim)

  let maximal = -1
  let maximalIdx = -1
  for (let i = 0; i < pred.length; i++) {
    if (pred[i] > maximal && !indexBlacklist.includes(i)) {
      maximal = pred[i]
      maximalIdx = i
    }
  }

  return [maximal, maximalIdx]
}
