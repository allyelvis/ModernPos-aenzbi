import React, { useState, useEffect } from 'react';

interface LoginProps {
    onLogin: (email: string, pass: string) => boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    useEffect(() => {
        // @ts-ignore
        if (window.lucide) {
            // @ts-ignore
            window.lucide.createIcons();
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!onLogin(email, password)) {
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-dark-900 text-white">
            <div className="w-full max-w-md p-8 space-y-8 bg-dark-800 rounded-2xl shadow-2xl">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <i data-lucide="gem" className="text-brand-primary h-16 w-16"></i>
                    </div>
                    <h1 className="text-4xl font-bold">Welcome to Nexus POS</h1>
                    <p className="text-gray-400 mt-2">Sign in to continue</p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="text-sm font-bold text-gray-300 tracking-wide">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full text-lg p-3 mt-1 bg-dark-700 border border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            placeholder="admin@nexus.pos"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password"
                               className="text-sm font-bold text-gray-300 tracking-wide">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full text-lg p-3 mt-1 bg-dark-700 border border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            placeholder="password123"
                            required
                        />
                    </div>
                     {error && <p className="text-center text-red-400 bg-red-500/10 p-2 rounded-md">{error}</p>}
                    <div>
                        <button type="submit" className="w-full flex justify-center bg-brand-primary text-gray-100 p-3 rounded-lg tracking-wide font-semibold cursor-pointer hover:bg-brand-primary/80 transition-colors">
                            Sign in
                        </button>
                    </div>
                </form>
                 <div className="text-center text-gray-500 text-xs">
                    <p>Demo Credentials:</p>
                    <p>admin@nexus.pos / manager@nexus.pos / cashier@nexus.pos</p>
                    <p>Password (for all): password123</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
