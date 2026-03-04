import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { dealAPI, emailAPI, analysisAPI } from '../services/api';
import { Mail, TrendingUp, Settings, LogOut, Download, Play } from 'lucide-react';
import StatCard from '../components/StatCard';
import EmailList from '../components/EmailList';
import DealList from '../components/DealList';
import Header from '../components/Header';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { stats, setStats, emails, setEmails, triggerRefresh, isAnalyzing, setIsAnalyzing } = useApp();
  const [activeTab, setActiveTab] = useState('emails');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Load stats
  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await dealAPI.getStats();
        setStats(response.data);
      } catch (error) {
        console.error('Failed to load stats:', error);
      }
    };
    loadStats();
  }, [setStats, triggerRefresh]);

  // Load emails
  useEffect(() => {
    const loadEmails = async () => {
      setLoading(true);
      try {
        const response = await emailAPI.getEmails(page, 10);
        setEmails(response.data.emails);
      } catch (error) {
        console.error('Failed to load emails:', error);
      } finally {
        setLoading(false);
      }
    };
    loadEmails();
  }, [page, setEmails, triggerRefresh]);

  const handleBatchAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      await analysisAPI.batchAnalyze();
      // Refresh data
      triggerRefresh();
    } catch (error) {
      console.error('Batch analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      const response = await dealAPI.exportCSV();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'deals.csv');
      document.body.appendChild(link);
      link.click();
      link.parentElement.removeChild(link);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={logout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}</h1>
          <p className="text-gray-600">
            Track and analyze sponsorship deals from your Gmail inbox
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Good Deals"
            value={stats.GOOD_DEAL || 0}
            icon={TrendingUp}
            color="bg-green-50"
            textColor="text-green-600"
          />
          <StatCard
            title="Bad Deals"
            value={stats.BAD_DEAL || 0}
            icon={Mail}
            color="bg-red-50"
            textColor="text-red-600"
          />
          <StatCard
            title="Not Deals"
            value={stats.NOT_A_DEAL || 0}
            icon={Mail}
            color="bg-blue-50"
            textColor="text-blue-600"
          />
          <StatCard
            title="Total Analyzed"
            value={stats.total || 0}
            icon={Mail}
            color="bg-purple-50"
            textColor="text-purple-600"
          />
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex gap-4 flex-wrap">
          <button
            onClick={handleBatchAnalyze}
            disabled={isAnalyzing}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition"
          >
            <Play className="w-4 h-4" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze New Emails'}
          </button>
          <button
            onClick={handleExportCSV}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('emails')}
            className={`py-4 px-6 font-semibold border-b-2 transition ${
              activeTab === 'emails'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Emails
          </button>
          <button
            onClick={() => setActiveTab('deals')}
            className={`py-4 px-6 font-semibold border-b-2 transition ${
              activeTab === 'deals'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Deals
          </button>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'emails' && (
            <EmailList emails={emails} loading={loading} onPageChange={setPage} />
          )}
          {activeTab === 'deals' && <DealList />}
        </div>
      </main>
    </div>
  );
}
