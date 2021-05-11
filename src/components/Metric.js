import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'

import ReactStars from 'react-rating-stars-component'

import {
  newAccountsPerMonth,
  avgCostToAcquireCustomer,
  customerLTV,
  churnRate,
  newNewRevenue,
} from '../config'
import {metrics} from '../constants'

const usdFormatter = {style: 'currency', currency: 'USD'}

function RatingFeedback() {
  return (
    <div className="w-full px-6 flex justify-around items-center">
      <span className="text-gray-500 text-sm">Rate the relevance</span>
      <ReactStars
        count={5}
        size={18}
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
        <div className="w-full h-full flex flex-col">
          <span className="text-gray-800 text-xl ml-10">
            New Users per Month
          </span>
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

    case metrics.avgCostToAcquireCustomer:
      return (
        <div className="w-full h-full flex flex-col">
          <span className="text-gray-800 text-xl ml-10">
            Average Monthly Cost to Acquire Customer
          </span>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={avgCostToAcquireCustomer.data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value, name, props) => `$${value}.0`} />
              <Legend />
              <Area {...avgCostToAcquireCustomer.opts} />
            </AreaChart>
          </ResponsiveContainer>
          <RatingFeedback />
        </div>
      )

    case metrics.customerLTV:
      return (
        <div className="w-full h-full flex flex-col">
          <span className="text-gray-800 text-xl ml-10">
            Lifetime Value of Customers
          </span>
          <ResponsiveContainer>
            <BarChart
              data={customerLTV.data}
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
                dataKey="number"
                fill={newAccountsPerMonth.opts.fillColor}
                name={newAccountsPerMonth.opts.yLabel}
              />
            </BarChart>
          </ResponsiveContainer>
          <RatingFeedback />
        </div>
      )

    case metrics.churnRate:
      return (
        <div className="w-full h-full flex flex-col">
          <span className="text-gray-800 text-xl ml-10">
            Monthly Churn Rate
          </span>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={churnRate.data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value, name, props) => `${value}%`} />
              <Legend />
              <Area {...avgCostToAcquireCustomer.opts} name="Churn Rate" />
            </AreaChart>
          </ResponsiveContainer>
          <RatingFeedback />
        </div>
      )

    case metrics.newNewRevenue:
      return (
        <div className="w-full h-full flex flex-col">
          <div className="h-60">
            <div className="text-gray-800 text-xl ml-10 w-full">
              {newNewRevenue.data[0].name}
            </div>
            <div className="mt-8 text-blue-400 text-5xl font-bold ml-10">
              {new Intl.NumberFormat('en-US', usdFormatter).format(
                newNewRevenue.data[0].number,
              )}
            </div>
            <div className="mr-10 mt-4 p-1 bg-gray-100 ml-10 flex items-center text-gray-500">
              Target:{' '}
              <span className="ml-4 text-green-400 text-4xl font-bold">
                ${newNewRevenue.data[0].target}
              </span>
            </div>
          </div>
          <RatingFeedback />
        </div>
      )

    default:
      throw new Error('Invalid kpi prop.')
  }
}
