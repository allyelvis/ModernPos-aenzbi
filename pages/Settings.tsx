
import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold text-white">Business Profile</h2>
            <p className="text-gray-400 mt-1">Update your store's information.</p>
        </div>
        <div className="lg:col-span-2 bg-dark-800 p-8 rounded-lg shadow-lg space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Store Name</label>
                <input type="text" defaultValue="Nexus Innovations Inc." className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Contact Email</label>
                <input type="email" defaultValue="contact@nexus.pos" className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none"/>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Tax Rate (%)</label>
                <input type="number" defaultValue="8" className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none"/>
            </div>
             <div className="flex justify-end">
                <button className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-primary/80 transition-colors">
                    Save Changes
                </button>
            </div>
        </div>
      </div>
       <div className="border-t border-dark-700 my-8"></div>
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold text-white">API Keys</h2>
            <p className="text-gray-400 mt-1">Manage integrations and API access.</p>
        </div>
        <div className="lg:col-span-2 bg-dark-800 p-8 rounded-lg shadow-lg space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Google Gemini API Key</label>
                <input type="password" readOnly value="••••••••••••••••••••••••••••••" className="w-full bg-dark-700 text-gray-400 rounded-md border border-dark-600 p-2 cursor-not-allowed"/>
                 <p className="text-xs text-gray-500 mt-1">Your API key is securely managed via environment variables and is not editable here.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
