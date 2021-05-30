import React from 'react'
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
  FunnelChart,
  Funnel,
  LabelList,
} from 'recharts'

import ReactStars from 'react-rating-stars-component'

import {
  newAccountsPerMonth,
  avgCostToAcquireCustomer,
  customerLTV,
  churnRate,
  newNewRevenue,
  currentMonthylRevenue,
  avgRevPerCustomer,
  trialConversion,
  funnelConversion,
  iterationBurndown,
  userTarget,
  roiPerCustomer,
} from '../config'
import {metrics} from '../constants'

const usdFormatter = {style: 'currency', currency: 'USD'}

function RatingFeedback({addRating, kpi}) {
  const [justRated, setJustRated] = React.useState(false)

  return (
    <div className="w-full px-6 flex justify-around items-center">
      {justRated ? (
        <div
          className="flex items-center bg-green-400 text-white text-sm font-bold px-4 py-1 rounded"
          role="alert"
        >
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
          </svg>
          <p className="text-xs">Rating recorded</p>
        </div>
      ) : (
        <>
          <span className="text-gray-500 text-sm">Rate the relevance</span>
          <ReactStars
            count={5}
            size={18}
            activeColor="#ffd700"
            onChange={(newRating) => {
              addRating({[kpi]: newRating})
              setJustRated(true)
            }}
          />
        </>
      )}
    </div>
  )
}

export default function Metric({kpi, addRating, showRating = false}) {
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
          {showRating && <RatingFeedback kpi={kpi} addRating={addRating} />}
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
          {showRating && <RatingFeedback kpi={kpi} addRating={addRating} />}
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
          {showRating && <RatingFeedback kpi={kpi} addRating={addRating} />}
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
          {showRating && <RatingFeedback kpi={kpi} addRating={addRating} />}
        </div>
      )

    case metrics.newNewRevenue:
      return (
        <div className="w-full h-full flex flex-col">
          <div className="h-60">
            <div className="text-gray-800 text-xl ml-10 w-full">
              {newNewRevenue.data[0].name}
            </div>
            <div className="mt-8 text-blue-400 text-4xl font-bold ml-10">
              {new Intl.NumberFormat('en-US', usdFormatter).format(
                newNewRevenue.data[0].number,
              )}
            </div>
            <div className="mr-10 mt-4 p-1 bg-gray-100 ml-10 flex items-center text-gray-500">
              Target:{' '}
              <span className="ml-4 text-green-400 text-3xl font-bold">
                {new Intl.NumberFormat('en-US', usdFormatter).format(
                  newNewRevenue.data[0].target,
                )}
              </span>
            </div>
          </div>
          {showRating && <RatingFeedback kpi={kpi} addRating={addRating} />}
        </div>
      )

    case metrics.currentMonthly:
      return (
        <div className="w-full h-full flex flex-col">
          <div className="h-60">
            <div className="text-gray-800 text-xl ml-10 w-full">
              {currentMonthylRevenue.data[0].name}
            </div>
            <div className="mt-8 text-blue-400 text-4xl font-bold ml-10">
              {new Intl.NumberFormat('en-US', usdFormatter).format(
                currentMonthylRevenue.data[0].number,
              )}
            </div>
            <div className="mr-10 mt-4 p-1 bg-gray-100 ml-10 flex items-center text-gray-500">
              Target:{' '}
              <span className="ml-4 text-green-400 text-3xl font-bold">
                {new Intl.NumberFormat('en-US', usdFormatter).format(
                  currentMonthylRevenue.data[0].target,
                )}
              </span>
            </div>
          </div>
          {showRating && <RatingFeedback kpi={kpi} addRating={addRating} />}
        </div>
      )

    case metrics.avgRevenuePerCustomer:
      return (
        <div className="w-full h-full flex flex-col">
          <div className="h-60">
            <div className="text-gray-800 text-xl ml-10 w-full">
              {avgRevPerCustomer.data[0].name}
            </div>
            <div className="mt-8 text-blue-400 text-4xl font-bold ml-10">
              {new Intl.NumberFormat('en-US', usdFormatter).format(
                avgRevPerCustomer.data[0].number,
              )}
            </div>
            <div className="mr-10 mt-4 p-1 bg-gray-100 ml-10 flex items-center text-gray-500">
              Target:{' '}
              <span className="ml-4 text-green-400 text-3xl font-bold">
                {new Intl.NumberFormat('en-US', usdFormatter).format(
                  avgRevPerCustomer.data[0].target,
                )}
              </span>
            </div>
          </div>
          {showRating && <RatingFeedback kpi={kpi} addRating={addRating} />}
        </div>
      )

    case metrics.conversionPercentage:
      return (
        <div className="w-full h-full flex flex-col">
          <span className="text-gray-800 text-xl ml-10">
            Monthly Trial to Customer %
          </span>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={trialConversion.data}
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
              <Area
                {...avgCostToAcquireCustomer.opts}
                name="Trial Percentage"
              />
            </AreaChart>
          </ResponsiveContainer>
          {showRating && <RatingFeedback kpi={kpi} addRating={addRating} />}
        </div>
      )

    case metrics.conversionFunnel:
      return (
        <div className="w-full h-full flex flex-col">
          <span className="text-gray-800 text-xl ml-10">Conversion Funnel</span>
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart width={500} height={250}>
              <Tooltip formatter={(value, name, props) => `${value}%`} />
              <Funnel
                dataKey="value"
                data={funnelConversion.data}
                isAnimationActive
              >
                <LabelList
                  position="right"
                  fill="#000"
                  stroke="none"
                  dataKey="name"
                />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
          {showRating && <RatingFeedback kpi={kpi} addRating={addRating} />}
        </div>
      )

    case metrics.iterationBurndown:
      return (
        <div className="w-full h-full flex flex-col">
          <span className="text-gray-800 text-xl ml-10">
            Iteration Burndown (2-Week)
          </span>
          <ResponsiveContainer>
            <BarChart
              data={iterationBurndown.data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="number"
                fill={newAccountsPerMonth.opts.fillColor}
                name="Story Points Left"
              />
            </BarChart>
          </ResponsiveContainer>
          {showRating && <RatingFeedback kpi={kpi} addRating={addRating} />}
        </div>
      )

    case metrics.userTarget:
      return (
        <div className="w-full h-full flex flex-col">
          <div className="h-60">
            <div className="text-gray-800 text-xl ml-10 w-full">
              {userTarget.data[0].name}
            </div>
            <div className="mt-8 text-blue-400 text-4xl font-bold ml-10">
              Current: {userTarget.data[0].number}
            </div>
            <div className="mr-10 mt-4 p-1 bg-gray-100 ml-10 flex items-center text-gray-500">
              Target:{' '}
              <span className="ml-4 text-green-400 text-3xl font-bold">
                {userTarget.data[0].target}
              </span>
            </div>
          </div>
          {showRating && <RatingFeedback kpi={kpi} addRating={addRating} />}
        </div>
      )

    case metrics.roiPerCustomer:
      return (
        <div className="w-full h-full flex flex-col">
          <div className="h-60">
            <div className="text-gray-800 text-xl ml-10 w-full">
              {roiPerCustomer.data[0].name}
            </div>
            <div className="mt-8 text-blue-400 text-4xl font-bold ml-10">
              {new Intl.NumberFormat('en-US', usdFormatter).format(
                roiPerCustomer.data[0].number,
              )}
            </div>
            <div className="mr-10 mt-4 p-1 bg-gray-100 ml-10 flex items-center text-gray-500">
              Target:{' '}
              <span className="ml-4 text-green-400 text-3xl font-bold">
                {new Intl.NumberFormat('en-US', usdFormatter).format(
                  roiPerCustomer.data[0].target,
                )}
              </span>
            </div>
          </div>
          {showRating && <RatingFeedback kpi={kpi} addRating={addRating} />}
        </div>
      )

    default:
      throw new Error('Invalid kpi prop.')
  }
}
