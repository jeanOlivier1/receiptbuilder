import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../lib/supabase';
import toast from 'react-hot-toast';
import { Receipt, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

export const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password);
        toast.success('Account created successfully! Please sign in.');
        setIsSignUp(false);
      } else {
        await signIn(email, password);
        toast.success('Signed in successfully!');
        navigate('/');
      }
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-xl">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-[#F8BF1E]/10 p-3 rounded-full">
              <Receipt className="h-10 w-10 text-[#F8BF1E]" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-gray-600">
            {isSignUp
              ? 'Start managing your receipts today'
              : 'Sign in to access your receipts'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-11 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F8BF1E] focus:border-transparent sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-11 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F8BF1E] focus:border-transparent sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#F8BF1E] hover:bg-[#F8BF1E]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F8BF1E] transition-colors duration-200"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                  <span>{isSignUp ? 'Create account' : 'Sign in'}</span>
                </>
              )}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              </span>
            </div>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm font-medium text-[#F8BF1E] hover:text-[#F8BF1E]/80 focus:outline-none focus:underline transition-colors duration-200"
            >
              {isSignUp ? 'Sign in instead' : 'Create a new account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};