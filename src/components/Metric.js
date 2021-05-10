import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import ReactStars from 'react-rating-stars-component'

import {newAccountsPerMonth} from '../config'
import {metrics} from '../constants'

function RatingFeedback() {
  return (
    <div className="w-full px-6 flex justify-around items-center">
      <span className="text-gray-500">How useful is this metric to you?</span>
      <ReactStars
        count={5}
        size={24}
        activeColor="#ffd700"
        onChange={(newRating) => {
          console.log(newRating)
          //TODO: make the rating disappear
          //TODO: make some sort of feedback to the user to indicate successful rating vote
          //TODO: save the rating in the system for future recommendations
        }}
      />
    </div>
  )
}

export default function Metric({kpi}) {
  switch (kpi) {
    case metrics.newAccountsPerMonth:
      return (
        <div className="w-full">
          <ResponsiveContainer>
            <BarChart
              data={newAccountsPerMonth.data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={newAccountsPerMonth.opts.xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey={newAccountsPerMonth.opts.yKey}
                fill={newAccountsPerMonth.opts.fillColor}
                name={newAccountsPerMonth.opts.yLabel}
              />
            </BarChart>
          </ResponsiveContainer>
          <RatingFeedback />
        </div>
      )

    default:
      throw new Error('Invalid kpi prop.')
  }
}
