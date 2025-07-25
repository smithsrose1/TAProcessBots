// src/pages/Dashboard.tsx
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // adjust path accordingly
import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer as RechartsResponsiveContainer,
} from 'recharts';
import {
  AlertTriangle,
  Clock,
  Users,
  FileText,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import {Candidate} from '../interface/Candidate';

// Define your Task type and sample data
interface Task {
  id: number;
  title: string;
  dueDate?: string;
  status: 'In-Progress' | 'Upcoming' | 'Completed';
}

const sampleTasks: Task[] = [
  { id: 1, title: 'Review JD clarity alerts', status: 'In-Progress' },
  { id: 2, title: 'Send interview reminders', status: 'Upcoming', dueDate: 'Jun 28' },
  { id: 3, title: 'Archive completed requisitions', status: 'Completed', dueDate: 'Jun 20' },
];

const Dashboard: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [candidateStatusData, setCandidateStatusData] = useState<
    { name: string; value: number; color: string }[]
  >([]);

  // Define colors for known stages (adjust or make dynamic as needed)
  const stageColors: Record<string, string> = {
    'Application Review': '#3B82F6',
    'Phone': '#8B5CF6',
    'Technical': '#F59E0B',
    'Final': '#10B981',
    'Offer': '#EF4444',
    default: '#9CA3AF',
  };

  useEffect(() => {
    async function fetchCandidates() {
      const querySnapshot = await getDocs(collection(db, 'candidates'));
      const data: Candidate[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...(doc.data() as Candidate), id: doc.id });

      });
      setCandidates(data);
    }

    fetchCandidates();
  }, []);

  useEffect(() => {
    // Aggregate counts per stage
    const counts: Record<string, number> = {};
    candidates.forEach(({ currentStage }) => {
      counts[currentStage] = (counts[currentStage] || 0) + 1;
    });

    // Convert to array format expected by PieChart
    const dataForChart = Object.entries(counts).map(([name, value]) => ({
      name,
      value,
      color: stageColors[name] || stageColors.default,
    }));

    setCandidateStatusData(dataForChart);
  }, [candidates]);
  // state to track filter selection
  const [taskFilter, setTaskFilter] = useState<'All' | Task['status']>('All');
  const statuses: Task['status'][] = ['In-Progress', 'Upcoming', 'Completed'];
console.log("candidateStatusData", candidateStatusData);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Avg Time to Hire */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-blue-600" />
            <div className="ml-5">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Avg Time to Hire
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">11.2 days</div>
                  <div className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                    <TrendingUp className="h-4 w-4 mr-1" />12%
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        {/* SLA Breaches */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <div className="ml-5">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">SLA Breaches</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">7</div>
                  <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                    <TrendingDown className="h-4 w-4 mr-1" />25%
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        {/* Active Candidates */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-600" />
            <div className="ml-5">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Active Candidates</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">106</div>
                  <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />8%
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        {/* Open Requisitions */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-purple-600" />
            <div className="ml-5">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Open Requisitions</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">24</div>
                  <div className="ml-2 flex items-baseline text-sm font-semibold text-blue-600">
                    <TrendingUp className="h-4 w-4 mr-1" />3%
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Section with Filter */}
      <section className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Tasks</h3>

        {/* Filter Controls */}
        <div className="flex space-x-2 mb-4">
          {(['All', ...statuses] as (string)[]).map((f) => (
            <button
              key={f}
              onClick={() => setTaskFilter(f as any)}
              className={`
                px-3 py-1 rounded-full text-sm font-medium
                ${taskFilter === f
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
              `}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(taskFilter === 'All' ? statuses : [taskFilter]).map((status) => {
            const items = sampleTasks.filter((t) => t.status === status);
            return (
              <div key={status}>
                <h4 className="font-medium text-gray-700 mb-2">{status}</h4>
                {items.length ? (
                  <ul className="space-y-2">
                    {items.map((t) => (
                      <li
                        key={t.id}
                        className="p-3 bg-gray-50 rounded-md shadow-sm flex justify-between"
                      >
                        <span>{t.title}</span>
                        {t.dueDate && (
                          <span className="text-xs text-gray-500">{t.dueDate}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400">No tasks</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Candidate Status Distribution */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Candidate Pipeline Status
        </h3>
        <RechartsResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={candidateStatusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {candidateStatusData.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </RechartsResponsiveContainer>
      </div>

      {/* Alerts Summary (unchanged) */}
      <div className="bg-white rounded-lg shadow">
        {/* ... */}
      </div>
    </div>
  );
};

export default Dashboard;
