import React from 'react';
import { useParams } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const TestResultsPage = () => {
  const { testId } = useParams();
  
  // Mock data for demonstration
  const testData = [
    { name: 'Task 1', success: 40, failures: 10 },
    { name: 'Task 2', success: 30, failures: 20 },
    { name: 'Task 3', success: 45, failures: 5 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Test Results #{testId}</h1>
      
      <div className="grid gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Success vs Failures</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={testData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="success" fill="#4CAF50" />
                <Bar dataKey="failures" fill="#F44336" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Mission Paths</h2>
          <p>Shows the paths testers took and how they completed the mission.</p>
          {/* Add more detailed path information here */}
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Mission Screens</h2>
          <p>Click on each screen to see how participants interacted with it.</p>
          {/* Add screen interaction details here */}
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Responses</h2>
          <p>Click on the path to view the heatmaps from each participant.</p>
          {/* Add response details here */}
        </div>
      </div>
    </div>
  );
};

export default TestResultsPage;
