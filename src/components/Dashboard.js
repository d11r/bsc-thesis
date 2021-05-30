import React from 'react'
import Metric from './Metric'
import Card from './Card'

import {metrics} from '../constants'
import {findBestCos} from '../recommender/cf'

function getArrayFromRatings(r) {
  let result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const allMs = Object.values(metrics)
  for (let x = 0; x < allMs.length; x++) {
    for (let p = 0; p < r.length; p++) {
      if (Object.keys(r[p])[0] === allMs[x]) {
        result[x] = Object.values(r[p])[0]
      }
    }
  }
  return result
}

function useLocalStorage(key, defaultValue = []) {
  const [state, setState] = React.useState(
    () => JSON.parse(window.localStorage.getItem(key)) || defaultValue,
  )

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

export default function Dashboard() {
  const allMetrics = [
    metrics.newAccountsPerMonth,
    metrics.avgCostToAcquireCustomer,
    metrics.customerLTV,
    metrics.churnRate,
    metrics.newNewRevenue,
    metrics.currentMonthly,
    metrics.avgRevenuePerCustomer,
    metrics.iterationBurndown,
    metrics.conversionPercentage,
    metrics.conversionFunnel,
    metrics.userTarget,
    metrics.roiPerCustomer,
  ]

  const [ratings, setRatings] = useLocalStorage('bsc-ratings', [])
  const addRating = (r) => setRatings(ratings.concat(r))

  const [shownMetrics, setShownMetrics] = useLocalStorage(
    'displayed-metrics',
    allMetrics.slice(0, 5),
  )
  const newMetric = () => {
    const alreadyShownIdxs = shownMetrics.map((sm) => allMetrics.indexOf(sm))
    const myRatings = getArrayFromRatings(ratings)

    let minimal = 100
    let minimalIdx = 4
    for (let i = 0; i < myRatings.length; i++) {
      if (
        myRatings[i] > 0 &&
        myRatings[i] < minimal &&
        alreadyShownIdxs.includes(i)
      ) {
        minimal = myRatings[i]
        minimalIdx = i
      }
    }
    const withoutMinimal = shownMetrics.filter(
      (x) => x !== allMetrics[minimalIdx],
    )

    const [prediction, newMetricIdx] = findBestCos(myRatings, alreadyShownIdxs)
    setShownMetrics(withoutMinimal.concat([allMetrics[newMetricIdx]]))
  }

  return (
    <div className="h-screen w-screen bg-green-50">
      <div>
        <div className="flex justify-between">
          <div className="px-12 py-2">
            <h3 className="text-2xl text-gray-800">
              Adaptable Performance Dashboard Demo
            </h3>

            <p className="text-sm text-gray-600">BSc Thesis</p>
            <p className="text-sm text-gray-600">Student: Dragos Strugar</p>
            <p className="text-sm text-gray-600">
              Supervisor: Prof. Giancarlo Succi
            </p>
          </div>

          <div className="flex flex-col px-12 py-4">
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              onClick={newMetric}
            >
              New Metric
            </button>
          </div>
        </div>

        <div className="h-full w-full px-10 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-1">
          {shownMetrics.map((metric, idx) => (
            <Card key={metric} className={`m-2 ${idx === 0 && 'col-span-2'}`}>
              <Metric
                kpi={metric}
                showRating={
                  ratings.find((x) => Object.keys(x)[0] === metric) == null
                }
                addRating={addRating}
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
