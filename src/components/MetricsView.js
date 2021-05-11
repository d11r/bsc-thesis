import Metric from './Metric'
import Card from './Card'

import {metrics} from '../constants'

export default function MetricsView() {
  return (
    <div className="h-screen w-screen bg-green-50">
      <div>
        <div className="px-12 py-2">
          <h3 className="text-2xl text-gray-800">
            Adaptable Performance Dashboard Demo
          </h3>
        </div>

        <div className="h-full w-full px-10 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2">
          <Card className="m-2 col-span-2">
            <Metric kpi={metrics.newAccountsPerMonth}></Metric>
          </Card>

          <Card className="m-2">
            <Metric kpi={metrics.avgCostToAcquireCustomer}></Metric>
          </Card>

          <Card className="m-2">
            <Metric kpi={metrics.customerLTV}></Metric>
          </Card>

          <Card className="m-2">
            <Metric kpi={metrics.churnRate}></Metric>
          </Card>

          <Card className="m-2">
            <Metric kpi={metrics.newNewRevenue}></Metric>
          </Card>
        </div>
      </div>
    </div>
  )
}
