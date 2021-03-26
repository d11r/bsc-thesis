import Metric from './Metric'

import {metrics} from '../constants'

export default function MetricsView() {
  return (
    <div>
      <Metric kpi={metrics.newAccountsPerMonth}></Metric>
    </div>
  )
}
