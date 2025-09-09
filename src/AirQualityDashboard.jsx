import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, RadialBarChart, RadialBar, PieChart, Pie, Cell } from 'recharts';
import { Thermometer, Droplets, Wind, AlertTriangle, Activity } from 'lucide-react';
import './AirQualityDashboard.css';

const AirQualityDashboard = () => {
  const [sensorData, setSensorData] = useState([
    {
      "id": "mask01",
      "mq2": 120,
      "mq135": 45,
      "bme680": {"temp": 28.3, "humidity": 62, "iaq": 115},
      "pm25": 56.2,
      "timestamp": "2025-09-09T11:32:00Z"
    },
    {
      "id": "mask01",
      "mq2": 115,
      "mq135": 48,
      "bme680": {"temp": 27.8, "humidity": 65, "iaq": 120},
      "pm25": 52.1,
      "timestamp": "2025-09-09T11:22:00Z"
    },
    {
      "id": "mask01",
      "mq2": 125,
      "mq135": 42,
      "bme680": {"temp": 28.7, "humidity": 58, "iaq": 110},
      "pm25": 58.9,
      "timestamp": "2025-09-09T11:12:00Z"
    },
    {
      "id": "mask01",
      "mq2": 118,
      "mq135": 46,
      "bme680": {"temp": 28.1, "humidity": 61, "iaq": 118},
      "pm25": 54.3,
      "timestamp": "2025-09-09T11:02:00Z"
    },
    {
      "id": "mask01",
      "mq2": 122,
      "mq135": 44,
      "bme680": {"temp": 28.5, "humidity": 63, "iaq": 112},
      "pm25": 55.8,
      "timestamp": "2025-09-09T10:52:00Z"
    }
  ]);

  const chartData = sensorData.map(item => ({
    time: new Date(item.timestamp).toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    mq2: item.mq2,
    mq135: item.mq135,
    temperature: item.bme680.temp,
    humidity: item.bme680.humidity,
    iaq: item.bme680.iaq,
    pm25: item.pm25
  })).reverse(); 

  const latestData = sensorData[0];

  const getAirQualityStatus = (iaq) => {
    if (iaq <= 50) return { status: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (iaq <= 100) return { status: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (iaq <= 150) return { status: 'Lightly Polluted', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (iaq <= 200) return { status: 'Moderately Polluted', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    if (iaq <= 250) return { status: 'Heavily Polluted', color: 'text-red-600', bgColor: 'bg-red-100' };
    return { status: 'Severely Polluted', color: 'text-red-800', bgColor: 'bg-red-200' };
  };

  const airQualityStatus = getAirQualityStatus(latestData.bme680.iaq);

  const pm25Data = [
    { name: 'Current PM2.5', value: latestData.pm25, fill: '#ef4444' },
    { name: 'Good Level (0-12)', value: Math.max(0, 12 - latestData.pm25), fill: '#22c55e' },
  ];

  const gasData = [
    { name: 'MQ2 (Smoke)', value: latestData.mq2, color: '#f59e0b' },
    { name: 'MQ135 (Air Quality)', value: latestData.mq135, color: '#3b82f6' }
  ];

  const iaqRadialData = [
    { name: 'IAQ', value: latestData.bme680.iaq, fill: '#8884d8' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Air Quality Monitoring Dashboard</h1>
          <p className="text-gray-600">Real-time environmental sensor data from Mask01</p>
          <div className="mt-4 text-sm text-gray-500">
            Last Updated: {new Date(latestData.timestamp).toLocaleString()}
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Temperature Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Temperature</p>
                <p className="text-3xl font-bold text-gray-900">{latestData.bme680.temp}°C</p>
              </div>
              <Thermometer className="h-12 w-12 text-red-500" />
            </div>
          </div>

          {/* Humidity Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Humidity</p>
                <p className="text-3xl font-bold text-gray-900">{latestData.bme680.humidity}%</p>
              </div>
              <Droplets className="h-12 w-12 text-blue-500" />
            </div>
          </div>

          {/* Air Quality Card */}
          <div className={`bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">IAQ Index</p>
                <p className="text-3xl font-bold text-gray-900">{latestData.bme680.iaq}</p>
                <p className={`text-sm font-medium ${airQualityStatus.color}`}>{airQualityStatus.status}</p>
              </div>
              <Wind className="h-12 w-12 text-purple-500" />
            </div>
          </div>

          {/* PM2.5 Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">PM2.5</p>
                <p className="text-3xl font-bold text-gray-900">{latestData.pm25} μg/m³</p>
                <p className="text-sm text-orange-600">
                  {latestData.pm25 > 35 ? 'Unhealthy' : latestData.pm25 > 12 ? 'Moderate' : 'Good'}
                </p>
              </div>
              <AlertTriangle className="h-12 w-12 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Temperature & Humidity Trends */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Temperature & Humidity Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={3} name="Temperature (°C)" />
                <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={3} name="Humidity (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Gas Sensors */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Gas Sensor Readings</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gasData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Air Quality Index Radial */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Air Quality Index (IAQ)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={iaqRadialData}>
                <RadialBar dataKey="value" cornerRadius={10} fill="#8884d8" />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-gray-800 text-2xl font-bold">
                  {latestData.bme680.iaq}
                </text>
                <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" className="fill-gray-600 text-sm">
                  IAQ Level
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </div>

          {/* PM2.5 & Air Quality Timeline */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">PM2.5 & IAQ Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pm25" stroke="#f59e0b" strokeWidth={3} name="PM2.5 (μg/m³)" />
                <Line type="monotone" dataKey="iaq" stroke="#8b5cf6" strokeWidth={3} name="IAQ Index" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gas Sensors Timeline */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Gas Sensor Trends</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="mq2" stroke="#f59e0b" strokeWidth={3} name="MQ2 (Smoke Sensor)" />
              <Line type="monotone" dataKey="mq135" stroke="#3b82f6" strokeWidth={3} name="MQ135 (Air Quality Sensor)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Sensor ID: {latestData.id} | Data refreshed every 10 minutes</p>
        </div>
      </div>
    </div>
  );
};

export default AirQualityDashboard;