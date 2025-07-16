
import React from 'react';
import { Settings as SettingsIcon, Users, Bell, Shield, Palette } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* User Management */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Users className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">User Management</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Role-based Access</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option>Recruiter</option>
                <option>Hiring Manager</option>
                <option>HRBP</option>
                <option>Interview Coordinator</option>
              </select>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Manage Users
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Bell className="h-6 w-6 text-yellow-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">MS Teams Integration</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">SLA Breach Alerts</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Interview Reminders</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Feedback Nudges</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <button className="w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700">
              Configure Bot
            </button>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Palette className="h-6 w-6 text-purple-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Appearance</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Theme</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option>Light Mode</option>
                <option>Dark Mode</option>
                <option>System Default</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Color Scheme</label>
              <div className="mt-2 flex space-x-2">
                <div className="w-6 h-6 bg-blue-500 rounded cursor-pointer border-2 border-blue-700"></div>
                <div className="w-6 h-6 bg-green-500 rounded cursor-pointer"></div>
                <div className="w-6 h-6 bg-purple-500 rounded cursor-pointer"></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* SLA Configuration */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-green-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">SLA Configuration</h3>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Time to First Response</label>
              <div className="mt-1 flex">
                <input type="number" defaultValue="24" className="block w-full rounded-l-md border-gray-300" />
                <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  hours
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Time to Hire (Target)</label>
              <div className="mt-1 flex">
                <input type="number" defaultValue="15" className="block w-full rounded-l-md border-gray-300" />
                <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  days
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Interview Feedback Deadline</label>
              <div className="mt-1 flex">
                <input type="number" defaultValue="48" className="block w-full rounded-l-md border-gray-300" />
                <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  hours
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Requisition Idle Alert</label>
              <div className="mt-1 flex">
                <input type="number" defaultValue="3" className="block w-full rounded-l-md border-gray-300" />
                <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  days
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Save SLA Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
