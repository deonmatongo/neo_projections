import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Mail, FileText, TrendingUp } from 'lucide-react';

export default function QuickActions({ bookings }) {
  const upcomingBookings = bookings.filter(b => 
    new Date(b.date) >= new Date() && b.status === 'confirmed'
  ).length;

  const pendingBookings = bookings.filter(b => b.status === 'pending').length;

  const thisMonthBookings = bookings.filter(b => {
    const bookingDate = new Date(b.date);
    const now = new Date();
    return bookingDate.getMonth() === now.getMonth() && 
           bookingDate.getFullYear() === now.getFullYear();
  }).length;

  const quickStats = [
    {
      icon: Calendar,
      label: 'Upcoming Sessions',
      value: upcomingBookings,
      color: 'bg-blue-500',
      description: 'Confirmed bookings ahead'
    },
    {
      icon: TrendingUp,
      label: 'This Month',
      value: thisMonthBookings,
      color: 'bg-green-500',
      description: 'Total bookings'
    },
    {
      icon: Mail,
      label: 'Pending Review',
      value: pendingBookings,
      color: 'bg-yellow-500',
      description: 'Awaiting confirmation'
    },
    {
      icon: FileText,
      label: 'Total Records',
      value: bookings.length,
      color: 'bg-purple-500',
      description: 'All time bookings'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {quickStats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="border-black/10 hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden relative">
            <div className={`absolute top-0 right-0 w-32 h-32 ${stat.color} opacity-5 rounded-full transform translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-500`} />
            <CardContent className="p-5 relative">
              <div className="flex items-start justify-between mb-3">
                <div className={`${stat.color} p-2.5 rounded-lg`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold tracking-tight"
                     style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {stat.value}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-black/80 mb-1">
                  {stat.label}
                </p>
                <p className="text-xs text-black/40">
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}