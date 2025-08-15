import React, { useState, useEffect } from 'react';
import { StoreSettings } from '../types';
import { FISCALIZATION_MODULES, DATABASE_TYPES } from '../constants';

interface SettingsProps {
    storeSettings: StoreSettings;
    setStoreSettings: React.Dispatch<React.SetStateAction<StoreSettings>>;
}

const Settings: React.FC<SettingsProps> = ({ storeSettings, setStoreSettings }) => {
  const [localSettings, setLocalSettings] = useState<StoreSettings>(storeSettings);
  const [connectionStatus, setConnectionStatus] = useState<{ type: 'success' | 'error' | 'idle' | 'testing'; message: string }>({ type: 'idle', message: '' });

  useEffect(() => {
    setLocalSettings(storeSettings);
  }, [storeSettings]);
  
  useEffect(() => {
     // @ts-ignore
     if (window.lucide) {
      // @ts-ignore
      window.lucide.createIcons();
    }
  }, [connectionStatus]);

  useEffect(() => {
    if (connectionStatus.type === 'success' || connectionStatus.type === 'error') {
      const timer = setTimeout(() => {
        setConnectionStatus({ type: 'idle', message: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [connectionStatus.type]);

  const handleSettingChange = (path: string, value: any) => {
    setLocalSettings(prev => {
        const keys = path.split('.');
        // Deep copy to avoid mutation issues with nested objects
        const newSettings = JSON.parse(JSON.stringify(prev)); 
        let current = newSettings;
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]]] = value;
        return newSettings;
    });
  };
  
  const handleTestConnection = async () => {
    setConnectionStatus({ type: 'testing', message: 'Attempting to connect...' });
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

    const { type, host, port, username, databaseName } = localSettings.database;
    if (type === 'None') {
        setConnectionStatus({ type: 'error', message: 'Select a database type to test.' });
        return;
    }
    if (!host || !port || !username || !databaseName) {
        setConnectionStatus({ type: 'error', message: 'All connection fields are required.' });
        return;
    }
    
    // Simulate success
    setConnectionStatus({ type: 'success', message: `Successfully connected to ${host}:${port}!` });
  };


  const handleSaveChanges = () => {
    setStoreSettings(localSettings);
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold text-white">Business Profile</h2>
            <p className="text-gray-400 mt-1">Update your store's information and localization settings.</p>
        </div>
        <div className="lg:col-span-2 bg-dark-800 p-8 rounded-lg shadow-lg space-y-6">
            <div>
                <label htmlFor="storeName" className="block text-sm font-medium text-gray-300 mb-1">Store Name</label>
                <input id="storeName" name="storeName" type="text" value={localSettings.storeName} onChange={(e) => handleSettingChange('storeName', e.target.value)} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none"/>
            </div>
            <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-300 mb-1">Contact Email</label>
                <input id="contactEmail" name="contactEmail" type="email" value={localSettings.contactEmail} onChange={(e) => handleSettingChange('contactEmail', e.target.value)} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none"/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="sm:col-span-1">
                    <label htmlFor="taxRate" className="block text-sm font-medium text-gray-300 mb-1">Tax Rate (%)</label>
                    <input id="taxRate" name="taxRate" type="number" value={localSettings.taxRate} onChange={(e) => handleSettingChange('taxRate', parseFloat(e.target.value) || 0)} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none"/>
                </div>
                <div className="sm:col-span-1">
                    <label htmlFor="currency.symbol" className="block text-sm font-medium text-gray-300 mb-1">Currency Symbol</label>
                    <input id="currency.symbol" name="currency.symbol" type="text" value={localSettings.currency.symbol} onChange={(e) => handleSettingChange('currency.symbol', e.target.value)} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none"/>
                </div>
                <div className="sm:col-span-1">
                    <label htmlFor="currency.code" className="block text-sm font-medium text-gray-300 mb-1">Currency Code</label>
                    <input id="currency.code" name="currency.code" type="text" value={localSettings.currency.code} onChange={(e) => handleSettingChange('currency.code', e.target.value)} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none"/>
                </div>
            </div>
        </div>
      </div>
       
       <div className="border-t border-dark-700 my-8"></div>
       
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <h2 className="text-2xl font-semibold text-white">Fiscalization Printer</h2>
                <p className="text-gray-400 mt-1">Configure synchronization with an external fiscal printer service.</p>
            </div>
            <div className="lg:col-span-2 bg-dark-800 p-8 rounded-lg shadow-lg space-y-6">
                <div className="flex items-center justify-between">
                    <label htmlFor="fiscalization.enabled" className="text-lg font-medium text-white">Enable Fiscalization</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" id="fiscalization.enabled" className="sr-only peer"
                            checked={localSettings.fiscalization.enabled}
                            onChange={(e) => handleSettingChange('fiscalization.enabled', e.target.checked)} />
                        <div className="w-11 h-6 bg-dark-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-brand-secondary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                    </label>
                </div>
                {localSettings.fiscalization.enabled && (
                    <div className="space-y-6 animate-fade-in">
                        <div>
                            <label htmlFor="fiscalization.endpointUrl" className="block text-sm font-medium text-gray-300 mb-1">Endpoint URL</label>
                            <input id="fiscalization.endpointUrl" type="text" 
                                value={localSettings.fiscalization.endpointUrl} 
                                onChange={(e) => handleSettingChange('fiscalization.endpointUrl', e.target.value)}
                                className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                placeholder="https://api.your-fiscal-service.com/sync"
                            />
                        </div>
                        <div>
                            <p className="block text-sm font-medium text-gray-300 mb-2">Sync Events</p>
                            <div className="space-y-3">
                                {FISCALIZATION_MODULES.map(module => (
                                    <label key={module.id} className="flex items-center">
                                        <input type="checkbox" className="h-4 w-4 rounded border-dark-600 bg-dark-700 text-brand-primary focus:ring-brand-secondary"
                                            checked={localSettings.fiscalization.syncOn[module.id]}
                                            onChange={(e) => handleSettingChange(`fiscalization.syncOn.${module.id}`, e.target.checked)}
                                        />
                                        <span className="ml-3 text-sm text-gray-300">{module.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
             <style>{`.animate-fade-in { animation: fade-in 0.5s ease-out forwards; } @keyframes fade-in { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </div>

        <div className="border-t border-dark-700 my-8"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <h2 className="text-2xl font-semibold text-white">Database Connection</h2>
                <p className="text-gray-400 mt-1">Configure the connection to your main database for data synchronization.</p>
            </div>
            <div className="lg:col-span-2 bg-dark-800 p-8 rounded-lg shadow-lg space-y-6">
                <div>
                    <label htmlFor="database.type" className="block text-sm font-medium text-gray-300 mb-1">Database Type</label>
                    <select id="database.type" value={localSettings.database.type} onChange={(e) => handleSettingChange('database.type', e.target.value)} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none">
                        {DATABASE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                </div>
                {localSettings.database.type !== 'None' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="database.host" className="block text-sm font-medium text-gray-300 mb-1">Host</label>
                                <input id="database.host" type="text" value={localSettings.database.host} onChange={(e) => handleSettingChange('database.host', e.target.value)} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none"/>
                            </div>
                             <div>
                                <label htmlFor="database.port" className="block text-sm font-medium text-gray-300 mb-1">Port</label>
                                <input id="database.port" type="number" value={localSettings.database.port} onChange={(e) => handleSettingChange('database.port', parseInt(e.target.value, 10) || 0)} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none"/>
                            </div>
                        </div>
                         <div>
                            <label htmlFor="database.databaseName" className="block text-sm font-medium text-gray-300 mb-1">Database Name</label>
                            <input id="database.databaseName" type="text" value={localSettings.database.databaseName} onChange={(e) => handleSettingChange('database.databaseName', e.target.value)} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none"/>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                             <div>
                                <label htmlFor="database.username" className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                                <input id="database.username" type="text" value={localSettings.database.username} onChange={(e) => handleSettingChange('database.username', e.target.value)} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none"/>
                            </div>
                             <div>
                                <label htmlFor="database.password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                                <input id="database.password" type="password" value={localSettings.database.password} onChange={(e) => handleSettingChange('database.password', e.target.value)} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none"/>
                            </div>
                        </div>
                        <div className="pt-2">
                           <button onClick={handleTestConnection} disabled={connectionStatus.type === 'testing'} className="bg-dark-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-dark-500 transition-colors disabled:opacity-50 disabled:cursor-wait">
                                {connectionStatus.type === 'testing' ? 'Testing...' : 'Test Connection'}
                           </button>
                           {connectionStatus.type !== 'idle' && (
                                <div className={`mt-4 text-sm flex items-center p-3 rounded-md ${
                                    connectionStatus.type === 'success' ? 'bg-green-500/10 text-green-400' :
                                    connectionStatus.type === 'error' ? 'bg-red-500/10 text-red-400' :
                                    'bg-blue-500/10 text-blue-400'
                                }`}>
                                    {connectionStatus.type === 'success' && <i data-lucide="check-circle" className="w-5 h-5 mr-2"></i>}
                                    {connectionStatus.type === 'error' && <i data-lucide="x-circle" className="w-5 h-5 mr-2"></i>}
                                    {connectionStatus.type === 'testing' && <i data-lucide="loader-2" className="w-5 h-5 mr-2 animate-spin"></i>}
                                    <span>{connectionStatus.message}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
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
        
        <div className="lg:col-start-2 lg:col-span-2 flex justify-end pt-4">
          <button onClick={handleSaveChanges} className="bg-brand-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-primary/80 transition-colors">
              Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;