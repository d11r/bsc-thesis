import Metric from './Metric'
import Card from './Card'

import {metrics} from '../constants'

export default function MetricsView() {
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

  return (
    <div className="h-screen w-screen bg-green-50">
      <div>
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

        <div className="h-full w-full px-10 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2">
          {allMetrics.slice(0, 5).map((metric, idx) => (
            <Card className={`m-2 ${idx === 0 && 'col-span-2'}`}>
              <Metric kpi={metric}></Metric>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
