import React, { useState } from 'react';
import { Mail, FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { analysisAPI } from '../services/api';
import { useApp } from '../context/AppContext';

export default function EmailList({ emails, loading, onPageChange }) {
  const { triggerRefresh } = useApp();
  const [analyzingId, setAnalyzingId] = useState(null);

  const handleAnalyzeEmail = async (emailId) => {
    setAnalyzingId(emailId);
    try {
      await analysisAPI.analyzeEmail(emailId);
      triggerRefresh();
    } catch (error) {
      console.error('Failed to analyze email:', error);
    } finally {
      setAnalyzingId(null);
    }
  };

  const getCategoryBadge = (category) => {
    const badgeClasses = {
      GOOD_DEAL: 'bg-green-100 text-green-800',
      BAD_DEAL: 'bg-red-100 text-red-800',
      NOT_A_DEAL: 'bg-blue-100 text-blue-800',
      PENDING: 'bg-gray-100 text-gray-800'
    };

    return badgeClasses[category] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (emails.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No emails found</h3>
        <p className="text-gray-600">
          Fetch emails from Gmail to start analyzing deals
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                From
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Category
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {emails.map((email) => (
              <tr key={email._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-gray-900">{email.from}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600 truncate max-w-xs">
                    {email.subject || 'No subject'}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryBadge(email.dealCategory || 'PENDING')}`}>
                    {email.dealCategory?.replace('_', ' ') || 'Not Analyzed'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {!email.isAnalyzed && (
                    <button
                      onClick={() => handleAnalyzeEmail(email._id)}
                      disabled={analyzingId === email._id}
                      className="text-blue-600 hover:text-blue-800 disabled:text-gray-400 text-sm font-semibold transition"
                    >
                      {analyzingId === email._id ? (
                        <Loader className="w-4 h-4 inline animate-spin" />
                      ) : (
                        'Analyze'
                      )}
                    </button>
                  )}
                  {email.isAnalyzed && (
                    <CheckCircle className="w-5 h-5 text-green-600 inline" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
