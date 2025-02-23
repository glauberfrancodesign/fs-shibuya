import React from 'react';
import { MoreVertical, ExternalLink } from 'lucide-react';

const RecentTests = () => {
  const recentTests = [
    {
      id: 1,
      title: 'E-commerce Navigation',
      participants: 45,
      successRate: 82,
      status: 'In Progress',
    },
    {
      id: 2,
      title: 'Main Menu',
      participants: 30,
      successRate: 75,
      status: 'Completed',
    },
    {
      id: 3,
      title: 'Admin Area',
      participants: 15,
      successRate: 60,
      status: 'In Progress',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Recent Tests</h2>
          <button className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-2">
            View all
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Participants
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Success Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {recentTests.map((test) => (
              <tr key={test.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{test.title}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">{test.participants}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-100 rounded-full h-1.5">
                      <div 
                        className="bg-blue-500 h-1.5 rounded-full" 
                        style={{ width: `${test.successRate}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">{test.successRate}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    test.status === 'In Progress' 
                      ? 'bg-green-50 text-green-700' 
                      : 'bg-gray-50 text-gray-700'
                  }`}>
                    {test.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTests;
