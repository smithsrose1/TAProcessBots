
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Download, Filter, Calendar } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', hires: 12, applications: 150, timeToHire: 14 },
  { month: 'Feb', hires: 18, applications: 180, timeToHire: 12 },
  { month: 'Mar', hires: 15, applications: 165, timeToHire: 16 },
  { month: 'Apr', hires: 22, applications: 200, timeToHire: 11 },
  { month: 'May', hires: 19, applications: 175, timeToHire: 13 },
  { month: 'Jun', hires: 25, applications: 220, timeToHire: 10 },
];

const Reports = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-gray-900">111</div>
          <div className="text-sm text-gray-500">Total Hires (YTD)</div>
          <div className="text-xs text-green-600 mt-1">↑ 18% vs last year</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-gray-900">12.5</div>
          <div className="text-sm text-gray-500">Avg Time to Hire (days)</div>
          <div className="text-xs text-green-600 mt-1">↓ 2.5 days vs target</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-gray-900">85%</div>
          <div className="text-sm text-gray-500">SLA Compliance</div>
          <div className="text-xs text-red-600 mt-1">↓ 5% vs target</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-gray-900">1,290</div>
          <div className="text-sm text-gray-500">Total Applications</div>
          <div className="text-xs text-green-600 mt-1">↑ 12% vs last year</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Hiring Trend */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Hiring Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hires" fill="#3B82F6" name="Hires" />
              <Bar dataKey="applications" fill="#E5E7EB" name="Applications" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Time to Hire Trend */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Time to Hire Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="timeToHire" stroke="#3B82F6" strokeWidth={2} name="Days" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Reports Table */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recruiter Performance Report</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recruiter
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Open Reqs
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hires (MTD)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Time to Hire
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SLA Compliance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">John Smith</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">8</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">5</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">11 days</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">92%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Excellent
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Lisa Wong</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">6</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">14 days</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">78%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Good
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Sarah Davis</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">10</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">7</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">9 days</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">95%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Excellent
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
