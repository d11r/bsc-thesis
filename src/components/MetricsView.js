import Metric from './Metric'
import Card from './Card'

import {metrics} from '../constants'

export default function MetricsView() {
  return (
    <div className="h-screen w-screen bg-green-50 p-10">
      <Card>
        <Metric kpi={metrics.newAccountsPerMonth}></Metric>
      </Card>

      <Card className="mt-4">
        <Metric kpi={metrics.avgCostToAcquireCustomer}></Metric>
      </Card>
    </div>
  )
}
