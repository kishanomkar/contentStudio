import React from 'react';

export default function StatCard({ title, value, icon: Icon, color, textColor }) {
  return (
    <div className={`${color} rounded-xl p-6 border border-gray-200`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-2">{title}</p>
          <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
        </div>
        <Icon className={`w-8 h-8 ${textColor}`} />
      </div>
    </div>
  );
}
