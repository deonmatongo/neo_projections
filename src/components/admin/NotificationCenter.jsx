import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, Clock, User, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

export default function NotificationCenter({ bookings }) {
  // Get bookings from last 7 days
  const recentBookings = bookings
    .filter(b => {
      const bookingDate = new Date(b.created_date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return bookingDate >= weekAgo;
    })
    .sort((a, b) => new Date(b.created_date) - new Date(a.created_date))
    .slice(0, 10);

  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const todayBookings = bookings.filter(b => b.date === format(new Date(), 'yyyy-MM-dd')).length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-black/60 mb-1">New This Week</p>
                  <p className="text-3xl font-bold">{recentBookings.length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-black/60 mb-1">Pending</p>
                  <p className="text-3xl font-bold">{pendingBookings}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-black/60 mb-1">Today's Sessions</p>
                  <p className="text-3xl font-bold">{todayBookings}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentBookings.length === 0 ? (
            <div className="text-center py-8 text-black/40">
              No recent bookings
            </div>
          ) : (
            <div className="space-y-3">
              {recentBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-4 p-4 rounded-lg border border-black/5 hover:bg-black/5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-black/60" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-medium text-sm">{booking.client_name}</p>
                      <Badge variant="outline" className="text-xs">
                        {booking.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-black/60 mb-1">
                      {booking.service_type} • {format(new Date(booking.date), 'MMM d')} at {booking.time_slot}
                    </p>
                    <p className="text-xs text-black/40">
                      Booked {format(new Date(booking.created_date), 'MMM d, h:mm a')}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}