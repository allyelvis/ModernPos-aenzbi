
import React from 'react';
import SalesChart from '../components/SalesChart';
import { MOCK_RECENT_SALES } from '../constants';

const Reports: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white">Sales Reports</h1>
      
      <div className="bg-dark-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Sales Performance</h2>
          <div className="h-[450px]">
              <SalesChart />
          </div>
      </div>

      <div className="bg-dark-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-dark-700 text-sm text-gray-400">
                <th className="p-3">Transaction ID</th>
                <th className="p-3">Date</th>
                <th className="p-3">Items</th>
                <th className="p-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_RECENT_SALES.map((sale) => (
                <tr key={sale.id} className="border-b border-dark-700 hover:bg-dark-700/50">
                  <td className="p-3 font-medium text-white">{sale.id}</td>
                  <td className="p-3">{new Date(sale.date).toLocaleDateString()}</td>
                  <td className="p-3">{sale.items.reduce((sum, item) => sum + item.quantity, 0)}</td>
                  <td className="p-3 text-right font-semibold text-brand-primary">${sale.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
