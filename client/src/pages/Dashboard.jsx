import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { dealAPI, emailAPI, analysisAPI } from '../services/api';
import { Mail, TrendingUp, Settings, LogOut, Download, Play, Sparkles } from 'lucide-react';
import StatCard from '../components/StatCard';
import EmailList from '../components/EmailList';
import DealList from '../components/DealList';
import Header from '../components/Header';
import './dashboard.css';

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
        console.log("Response",response);
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
        console.log("Response2",response);
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
    <div className="dashboard-container">
      {/* Animated background orbs */}
      <div className="dashboard-orb dashboard-orb-1"></div>
      <div className="dashboard-orb dashboard-orb-2"></div>
      <div className="dashboard-orb dashboard-orb-3"></div>

      <Header user={user} onLogout={logout} />

      <main className="dashboard-main">
        {/* Hero Section */}
        <div className="dashboard-hero">
          <div>
            <h1 className="dashboard-title">Welcome back, <span className="gradient-text">{user?.name}</span></h1>
            <p className="dashboard-subtitle">
              Track and analyze sponsorship deals from your Gmail inbox in real-time
            </p>
          </div>
          <div className="hero-badge">
            <Sparkles className="w-4 h-4" />
            AI-Powered Analytics
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid-container">
          <div className="stats-grid">
            <div className="stat-card gradient-card-green">
              <div className="stat-card-top">
                <TrendingUp className="stat-icon" />
                <span className="stat-label">Good Deals</span>
              </div>
              <h2 className="stat-value">{stats.GOOD_DEAL || 0}</h2>
              <div className="stat-progress">
                <div className="progress-bar" style={{width: `${Math.min((stats.GOOD_DEAL / (stats.total || 1)) * 100, 100)}%`}}></div>
              </div>
            </div>

            <div className="stat-card gradient-card-red">
              <div className="stat-card-top">
                <Mail className="stat-icon" />
                <span className="stat-label">Bad Deals</span>
              </div>
              <h2 className="stat-value">{stats.BAD_DEAL || 0}</h2>
              <div className="stat-progress">
                <div className="progress-bar" style={{width: `${Math.min((stats.BAD_DEAL / (stats.total || 1)) * 100, 100)}%`}}></div>
              </div>
            </div>

            <div className="stat-card gradient-card-blue">
              <div className="stat-card-top">
                <Mail className="stat-icon" />
                <span className="stat-label">Not Deals</span>
              </div>
              <h2 className="stat-value">{stats.NOT_A_DEAL || 0}</h2>
              <div className="stat-progress">
                <div className="progress-bar" style={{width: `${Math.min((stats.NOT_A_DEAL / (stats.total || 1)) * 100, 100)}%`}}></div>
              </div>
            </div>

            <div className="stat-card gradient-card-purple">
              <div className="stat-card-top">
                <TrendingUp className="stat-icon" />
                <span className="stat-label">Total Analyzed</span>
              </div>
              <h2 className="stat-value">{stats.total || 0}</h2>
              <div className="stat-progress">
                <div className="progress-bar" style={{width: `100%`}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button
            onClick={handleBatchAnalyze}
            disabled={isAnalyzing}
            className="btn-primary btn-with-icon"
          >
            <Play className="w-4 h-4" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze New Emails'}
          </button>
          <button
            onClick={handleExportCSV}
            className="btn-secondary btn-with-icon"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Tabs */}
        <div className="dashboard-tabs">
          <button
            onClick={() => setActiveTab('emails')}
            className={`tab-button ${activeTab === 'emails' ? 'active' : ''}`}
          >
            <Mail className="w-4 h-4" />
            Emails
          </button>
          <button
            onClick={() => setActiveTab('deals')}
            className={`tab-button ${activeTab === 'deals' ? 'active' : ''}`}
          >
            <TrendingUp className="w-4 h-4" />
            Deals
          </button>
        </div>

        {/* Content */}
        <div className="dashboard-content">
          {activeTab === 'emails' && (
            <EmailList emails={emails} loading={loading} onPageChange={setPage} />
          )}
          {activeTab === 'deals' && <DealList />}
        </div>
      </main>
    </div>
  );
}
