import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  unit?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, unit }) => {
  const isPositive = change !== undefined && change >= 0;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <div className="flex-1">
          <p className="text-3xl font-bold text-gray-900">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {unit && <p className="text-xs text-gray-500 mt-1">{unit}</p>}
        </div>
        {change !== undefined && (
          <div className={`flex items-center ml-4 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? (
              <TrendingUp className="w-5 h-5 mr-1" />
            ) : (
              <TrendingDown className="w-5 h-5 mr-1" />
            )}
            <span className="text-sm font-semibold">{Math.abs(change).toFixed(1)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

interface BarChartComponentProps {
  title: string;
  data: any[];
  dataKey: string;
  xAxisKey: string;
}

export const BarChartComponent: React.FC<BarChartComponentProps> = ({ title, data, dataKey, xAxisKey }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={dataKey} fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

interface LineChartComponentProps {
  title: string;
  data: any[];
  dataKey: string;
  xAxisKey: string;
}

export const LineChartComponent: React.FC<LineChartComponentProps> = ({ title, data, dataKey, xAxisKey }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={dataKey} stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

interface PieChartComponentProps {
  title: string;
  data: any[];
  dataKey: string;
  nameKey: string;
}

export const PieChartComponent: React.FC<PieChartComponentProps> = ({ title, data, dataKey, nameKey }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey={dataKey}
            nameKey={nameKey}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
