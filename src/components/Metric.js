import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import {newAccountsPerMonth} from '../config'
import {metrics} from '../constants'
import {dims} from '../uiDefaults'

export default function Metric({kpi}) {
  switch (kpi) {
    case metrics.newAccountsPerMonth:
      return (
        <BarChart
          width={dims.width}
          height={dims.height}
          data={newAccountsPerMonth.data}
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
      )

    default:
      throw new Error('Invalid kpi prop.')
  }
}
