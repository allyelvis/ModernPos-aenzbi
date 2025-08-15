
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MOCK_SALES_DATA } from '../constants';

const SalesChart: React.FC = () => {
  return (
    <div className="bg-dark-800 p-6 rounded-lg shadow-lg h-96">
        <h3 className="text-xl font-bold text-white mb-4">Weekly Sales</h3>
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={MOCK_SALES_DATA}
                margin={{
                    top: 5,
                    right: 20,
                    left: -10,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#1F2937',
                        borderColor: '#374151',
                        borderRadius: '0.5rem',
                    }}
                    labelStyle={{ color: '#F9FAFB' }}
                />
                <Legend wrapperStyle={{ color: '#F9FAFB' }}/>
                <Bar dataKey="sales" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
