import React from 'react';
import { Users, PalmtreeIcon, CheckCircle, Clock } from 'lucide-react';

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      <div className="relative overflow-hidden bg-dark-900 rounded-xl border border-dark-800 p-6">
        <div className="absolute inset-0 bg-gradient-to-l from-blue-500/5 to-transparent" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-dark-400">Total Tests</p>
              <p className="text-2xl font-semibold tracking-tight text-white">12</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 flex items-center justify-center border border-blue-500/10">
              <PalmtreeIcon className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500">↑ 12%</span>
            <span className="ml-2 text-dark-400">vs last month</span>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden bg-dark-900 rounded-xl border border-dark-800 p-6">
        <div className="absolute inset-0 bg-gradient-to-l from-green-500/5 to-transparent" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-dark-400">Participants</p>
              <p className="text-2xl font-semibold tracking-tight text-white">248</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/5 flex items-center justify-center border border-green-500/10">
              <Users className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500">↑ 18%</span>
            <span className="ml-2 text-dark-400">vs last month</span>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden bg-dark-900 rounded-xl border border-dark-800 p-6">
        <div className="absolute inset-0 bg-gradient-to-l from-purple-500/5 to-transparent" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-dark-400">Success Rate</p>
              <p className="text-2xl font-semibold tracking-tight text-white">76%</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 flex items-center justify-center border border-purple-500/10">
              <CheckCircle className="w-5 h-5 text-purple-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-red-500">↓ 3%</span>
            <span className="ml-2 text-dark-400">vs last month</span>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden bg-dark-900 rounded-xl border border-dark-800 p-6">
        <div className="absolute inset-0 bg-gradient-to-l from-orange-500/5 to-transparent" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-dark-400">Avg. Time</p>
              <p className="text-2xl font-semibold tracking-tight text-white">2m 34s</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-600/5 flex items-center justify-center border border-orange-500/10">
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500">↑ 8%</span>
            <span className="ml-2 text-dark-400">vs last month</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
