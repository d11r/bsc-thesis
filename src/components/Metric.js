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

import {newAccountsPerMonth} from '../config'
import {metrics} from '../constants'

export default function Metric({kpi}) {
  switch (kpi) {
    case metrics.newAccountsPerMonth:
      return (
        <div className="w-full h-80">
          <ResponsiveContainer>
            <BarChart
              data={newAccountsPerMonth.data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
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
        </div>
      )

    default:
      throw new Error('Invalid kpi prop.')
  }
}
