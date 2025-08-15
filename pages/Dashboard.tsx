
import React, { useEffect } from 'react';
import SalesChart from '../components/SalesChart';
import { MOCK_RECENT_SALES } from '../constants';

const StatCard: React.FC<{ title: string; value: string; icon: string; color: string }> = ({ title, value, icon, color }) => (
    <div className="bg-dark-800 p-6 rounded-lg shadow-lg flex items-center">
        <div className={`p-4 rounded-lg mr-4 ${color}`}>
            <i data-lucide={icon} className="text-white w-8 h-8"></i>
        </div>
        <div>
            <p className="text-gray-400 text-sm">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const Dashboard: React.FC = () => {
    useEffect(() => {
    // @ts-ignore
    if (window.lucide) {
      // @ts-ignore
      window.lucide.createIcons();
    }
  });
  
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Today's Revenue" value="$1,250" icon="dollar-sign" color="bg-green-500" />
        <StatCard title="Today's Orders" value="68" icon="shopping-cart" color="bg-blue-500" />
        <StatCard title="New Customers" value="12" icon="users" color="bg-purple-500" />
        <StatCard title="Pending Tasks" value="3" icon="alert-circle" color="bg-yellow-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <SalesChart />
        </div>
        <div className="bg-dark-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
            <ul className="space-y-4">
                {MOCK_RECENT_SALES.slice(0, 5).map(sale => (
                    <li key={sale.id} className="flex items-center">
                        <div className="p-3 rounded-full bg-brand-primary/20 mr-4">
                            <i data-lucide="receipt" className="w-5 h-5 text-brand-primary"></i>
                        </div>
                        <div>
                            <p className="font-semibold text-white">Sale #{sale.id.split('-')[1]}</p>
                            <p className="text-sm text-gray-400">${sale.total.toFixed(2)} - {new Date(sale.date).toLocaleDateString()}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
