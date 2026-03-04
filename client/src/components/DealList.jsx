import React, { useEffect, useState } from 'react';
import { dealAPI } from '../services/api';
import { TrendingUp, AlertTriangle, Mail, Loader } from 'lucide-react';

export default function DealList() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('GOOD_DEAL');

  useEffect(() => {
    const loadDeals = async () => {
      setLoading(true);
      try {
        const response = await dealAPI.getDeals(1, 10, category);
        setDeals(response.data.deals);
      } catch (error) {
        console.error('Failed to load deals:', error);
      } finally {
        setLoading(false);
      }
    };
    loadDeals();
  }, [category]);

  const getCategoryIcon = (category) => {
    if (category === 'GOOD_DEAL') return <TrendingUp className="w-5 h-5 text-green-600" />;
    if (category === 'BAD_DEAL') return <AlertTriangle className="w-5 h-5 text-red-600" />;
    return <Mail className="w-5 h-5 text-blue-600" />;
  };

  const getCategoryColor = (category) => {
    if (category === 'GOOD_DEAL') return 'bg-green-50 border-green-200';
    if (category === 'BAD_DEAL') return 'bg-red-50 border-red-200';
    return 'bg-blue-50 border-blue-200';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Filter */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {['GOOD_DEAL', 'BAD_DEAL', 'NOT_A_DEAL'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              category === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Deals Grid */}
      {deals.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No deals found</h3>
          <p className="text-gray-600">
            Analyze emails to find deals in this category
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deals.map((deal) => (
            <div
              key={deal._id}
              className={`${getCategoryColor(deal.category)} rounded-lg border p-6`}
            >
              <div className="flex items-start gap-4 mb-4">
                {getCategoryIcon(deal.category)}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {deal.subject || 'No subject'}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">{deal.from}</p>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4">
                {deal.reasoning}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {deal.tags?.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white bg-opacity-50 text-xs rounded font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {deal.confidence}% confidence
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
