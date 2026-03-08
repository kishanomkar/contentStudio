import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';
import { Mail, CheckCircle2, ArrowRight, ShieldCheck, LogIn } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login, error: authError } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        setLoading(true);
        setError(null);
        
        // Get the user info from Google
        const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${codeResponse.access_token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to get user info from Google');
        }

        // Send access token and refresh token to backend for verification
        await login(codeResponse.access_token, codeResponse.refresh_token || '');
        navigate('/home');
      } catch (err) {
        setError(err.message || 'Login failed');
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setError('Google login failed. Please try again.');
    },
    scope: 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube.force-ssl',
    flow: 'implicit',
    access_type: 'offline',
  });

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-slate-50">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 overflow-hidden leading-none z-0 pointer-events-none flex justify-center">
        <div className="w-[800px] h-[600px] bg-gradient-to-b from-blue-100/60 to-transparent rounded-full blur-3xl opacity-70 mix-blend-multiply" />
      </div>

      <div className="w-full max-w-[440px] relative z-10">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200/60 p-8 sm:p-10">
          
          {/* Header section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/30 mb-6">
              <LogIn className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-3">
              Content Studio AI
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed px-4">
              Create and manage your AI-powered content with ease. Connect your Google account to get started.
            </p>
          </div>

          {/* Features Box */}
          <div className="bg-gray-50/80 rounded-2xl p-5 mb-8 border border-gray-100">
            <div className="space-y-3.5">
              {[
                'AI-powered content creation',
                'Reply to youtube videos automatically',
                'Brand Deal Automizer',
                'One click subtitle generation',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3 group">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {(error || authError) && (
            <div className="mb-6 p-4 bg-red-50/80 border border-red-100 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
              <p className="text-red-800 text-sm font-medium leading-relaxed">
                {error || authError}
              </p>
            </div>
          )}

          {/* Login Action */}
          <div className="space-y-4">
            <button
              onClick={() => googleLogin()}
              disabled={loading}
              className="relative flex items-center justify-center w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3.5 px-4 rounded-xl border border-gray-200 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                  <span className="text-gray-600">Connecting securely...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3 w-full">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="flex-1 text-center pr-5 text-[15px]">Continue with Google</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Footer Trust Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-gray-500">
          <ShieldCheck className="w-4 h-4" />
          <p className="text-xs font-medium uppercase tracking-wider">
            Secure OAuth Verification
          </p>
        </div>
      </div>
    </div>
  );
}