import React from 'react';
import { Calendar, User, Plus } from 'lucide-react';
import { format } from 'date-fns';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent
} from '@/components/ui/tooltip'; // Make sure your tooltip exports these

const interviews = [
  {
    id: 1,
    candidate: 'Sarah Johnson',
    position: 'Senior React Developer',
    interviewer: 'Mike Chen',
    date: '2024-06-25',
    time: '10:00 AM',
    type: 'Technical',
    status: 'Scheduled',
    room: 'Conference Room A'
  },
  {
    id: 2,
    candidate: 'David Kim',
    position: 'Senior React Developer',
    interviewer: 'Lisa Wong',
    date: '2024-06-25',
    time: '2:00 PM',
    type: 'Final',
    status: 'Scheduled',
    room: 'Virtual (Teams)'
  },
  {
    id: 3,
    candidate: 'Emily Rodriguez',
    position: 'Product Manager',
    interviewer: 'John Smith',
    date: '2024-06-24',
    time: '4:00 PM',
    type: 'Technical',
    status: 'Completed',
    room: 'Conference Room B'
  }
];

const CalendarView = () => {
  const daysInMonth = Array.from({ length: 30 }, (_, i) => new Date(2024, 5, i + 1)); // June 2024 (month = 5)
  const interviewsByDate = interviews.reduce<Record<string, typeof interviews>>((acc, interview) => {
    acc[interview.date] = acc[interview.date] || [];
    acc[interview.date].push(interview);
    return acc;
  }, {});

  // Days of the week header
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <TooltipProvider>
      <div>
        {/* Month title */}
        <h2 className="text-xl font-semibold mb-2 text-center">June 2024</h2>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-4 mb-2 text-center text-sm font-medium text-gray-700">
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-4">
          {daysInMonth.map((day) => {
            const isoDate = format(day, 'yyyy-MM-dd');
            const dayInterviews = interviewsByDate[isoDate] || [];

            return (
              <div key={isoDate} className="border p-2 rounded-lg shadow-sm min-h-[80px]">
                <div className="text-sm font-semibold text-gray-700">{format(day, 'd')}</div>
                <div className="mt-1 space-y-1">
                  {dayInterviews.map((interview) => (
                    <Tooltip key={interview.id}>
                      <TooltipTrigger asChild>
                        <div className="bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 text-xs cursor-pointer hover:bg-blue-200">
                          {interview.time}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        {`${interview.time} – ${interview.candidate}`}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
};


const Interviews = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Interview Scheduler</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Interview
        </button>
      </div>

      {/* Calendar Integration Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-blue-600 mr-2" />
          <p className="text-sm text-blue-800">
            Integrated with Outlook Calendar. All scheduled interviews will sync automatically.
          </p>
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Interview Calendar View</h3>
        <CalendarView />
      </div>

      {/* All Interviews */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">All Interviews</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interviewer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {interviews.map((interview) => (
                <tr key={interview.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-8 w-8 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{interview.candidate}</div>
                        <div className="text-sm text-gray-500">{interview.position}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{interview.date}</div>
                    <div className="text-gray-500">{interview.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{interview.interviewer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{interview.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{interview.room}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      interview.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {interview.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Interviews;
