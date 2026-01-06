import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calendar, DollarSign, TrendingUp, Users } from 'lucide-react';

const COLORS = ['#000000', '#333333', '#666666', '#999999', '#CCCCCC'];

export default function AnalyticsDashboard({ bookings }) {
  const analytics = useMemo(() => {
    const servicePrices = {
      portrait: 350,
      fashion: 750,
      editorial: 1200,
      commercial: 2500,
      event: 1800
    };

    const totalRevenue = bookings.reduce((sum, booking) => {
      return sum + (servicePrices[booking.service_type] || 0);
    }, 0);

    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
    const uniqueClients = new Set(bookings.map(b => b.client_email)).size;

    // Service breakdown
    const serviceBreakdown = {};
    bookings.forEach(booking => {
      if (serviceBreakdown[booking.service_type]) {
        serviceBreakdown[booking.service_type].count++;
        serviceBreakdown[booking.service_type].revenue += servicePrices[booking.service_type] || 0;
      } else {
        serviceBreakdown[booking.service_type] = {
          count: 1,
          revenue: servicePrices[booking.service_type] || 0
        };
      }
    });

    const serviceChartData = Object.entries(serviceBreakdown).map(([name, data]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      bookings: data.count,
      revenue: data.revenue
    }));

    // Monthly bookings
    const monthlyData = {};
    bookings.forEach(booking => {
      const month = new Date(booking.date).toLocaleString('default', { month: 'short' });
      monthlyData[month] = (monthlyData[month] || 0) + 1;
    });

    const monthlyChartData = Object.entries(monthlyData).map(([month, count]) => ({
      month,
      bookings: count
    }));

    // Status breakdown
    const statusBreakdown = {};
    bookings.forEach(booking => {
      statusBreakdown[booking.status] = (statusBreakdown[booking.status] || 0) + 1;
    });

    const statusChartData = Object.entries(statusBreakdown).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value
    }));

    return {
      totalRevenue,
      totalBookings,
      confirmedBookings,
      uniqueClients,
      serviceChartData,
      monthlyChartData,
      statusChartData
    };
  }, [bookings]);

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${analytics.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-black'
    },
    {
      title: 'Total Bookings',
      value: analytics.totalBookings,
      icon: Calendar,
      color: 'bg-gray-800'
    },
    {
      title: 'Confirmed',
      value: analytics.confirmedBookings,
      icon: TrendingUp,
      color: 'bg-gray-600'
    },
    {
      title: 'Unique Clients',
      value: analytics.uniqueClients,
      icon: Users,
      color: 'bg-gray-400'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-black/10 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-black/40 mb-2">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold tracking-tight"
                       style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Performance */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-black/10">
            <CardHeader>
              <CardTitle className="text-lg tracking-tight"
                         style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Service Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.serviceChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 11 }}
                    stroke="#999"
                  />
                  <YAxis tick={{ fontSize: 11 }} stroke="#999" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="bookings" fill="#000000" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Monthly Trend */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-black/10">
            <CardHeader>
              <CardTitle className="text-lg tracking-tight"
                         style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Monthly Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.monthlyChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 11 }}
                    stroke="#999"
                  />
                  <YAxis tick={{ fontSize: 11 }} stroke="#999" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="bookings" 
                    stroke="#000000" 
                    strokeWidth={2}
                    dot={{ fill: '#000000', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-black/10">
            <CardHeader>
              <CardTitle className="text-lg tracking-tight"
                         style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Booking Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.statusChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analytics.statusChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Revenue by Service */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="border-black/10">
            <CardHeader>
              <CardTitle className="text-lg tracking-tight"
                         style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Revenue by Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.serviceChartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="#999" />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{ fontSize: 11 }}
                    stroke="#999"
                    width={80}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Bar dataKey="revenue" fill="#000000" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}