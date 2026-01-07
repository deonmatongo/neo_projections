import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import Footer from '@/components/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart3, Calendar, AlertCircle, Loader2, Download, Home, RefreshCw, Clock, Bell, Users } from 'lucide-react';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import BookingsTable from '@/components/admin/BookingsTable';
import QuickActions from '@/components/admin/QuickActions';
import AvailabilityManager from '@/components/admin/AvailabilityManager';
import CalendarView from '@/components/admin/CalendarView';
import NotificationCenter from '@/components/admin/NotificationCenter';
import ClientManagement from '@/components/admin/ClientManagement';
import ClientMessaging from '@/components/admin/ClientMessaging';

export default function Admin() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messagingClient, setMessagingClient] = useState(null);

  useEffect(() => {
    // Authentication removed - base44 dependency removed
    setIsLoading(false);
  }, []);

  const { data: bookings = [], isLoading: isLoadingBookings, refetch } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: () => Promise.resolve([]), // base44 dependency removed
    enabled: !isLoading && user?.role === 'admin',
  });

  const handleUpdateBooking = (updatedBooking) => {
    refetch();
  };

  const handleDeleteBooking = (bookingId) => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-black" />
          <p className="text-black/40 text-sm tracking-[0.2em] uppercase">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-black text-white py-6 md:py-8 px-4 md:px-6 sticky top-0 z-50 shadow-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-1.5"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  ADMIN DASHBOARD
                </h1>
                <p className="text-white/60 text-xs md:text-sm">
                  NEO PROJECTIONS • Booking Management & Analytics
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 md:gap-3 w-full lg:w-auto">
                <Button
                  onClick={() => refetch()}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white flex-1 md:flex-none"
                >
                  <RefreshCw className="w-3.5 h-3.5 md:w-4 md:h-4 md:mr-2" />
                  <span className="hidden md:inline">Refresh</span>
                </Button>
                <Link to={createPageUrl('Home')} className="flex-1 md:flex-none">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white w-full"
                  >
                    <Home className="w-3.5 h-3.5 md:w-4 md:h-4 md:mr-2" />
                    <span className="hidden md:inline">Home</span>
                  </Button>
                </Link>
                <div className="hidden lg:flex items-center gap-3 pl-3 border-l border-white/20">
                  <div className="text-right">
                    <p className="text-[10px] text-white/40 tracking-[0.2em] uppercase mb-0.5">
                      Admin
                    </p>
                    <p className="text-white font-medium text-sm">{user.email}</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {user.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 lg:py-12">
        {isLoadingBookings ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-black" />
              <p className="text-black/40 text-sm tracking-[0.2em] uppercase">Loading bookings...</p>
            </div>
          </div>
        ) : bookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black/5 mb-6">
              <AlertCircle className="w-8 h-8 text-black/40" />
            </div>
            <h2 className="text-2xl font-bold mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              No Bookings Yet
            </h2>
            <p className="text-black/60 max-w-md mx-auto">
              Bookings will appear here once clients start scheduling sessions through your website.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6 md:space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <QuickActions bookings={bookings} />
            </motion.div>

            <Tabs defaultValue="notifications" className="space-y-6 md:space-y-8">
              <TabsList className="grid w-full max-w-5xl mx-auto grid-cols-3 lg:grid-cols-6 gap-1 bg-white border border-black/10 p-1 rounded-lg shadow-sm">
                <TabsTrigger 
                  value="notifications"
                  className="data-[state=active]:bg-black data-[state=active]:text-white rounded-md transition-all text-xs"
                >
                  <Bell className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Alerts</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics"
                  className="data-[state=active]:bg-black data-[state=active]:text-white rounded-md transition-all text-xs"
                >
                  <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Analytics</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="calendar"
                  className="data-[state=active]:bg-black data-[state=active]:text-white rounded-md transition-all text-xs"
                >
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Calendar</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="bookings"
                  className="data-[state=active]:bg-black data-[state=active]:text-white rounded-md transition-all text-xs"
                >
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                  <span className="hidden sm:inline">List</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="clients"
                  className="data-[state=active]:bg-black data-[state=active]:text-white rounded-md transition-all text-xs"
                >
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Clients</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="availability"
                  className="data-[state=active]:bg-black data-[state=active]:text-white rounded-md transition-all text-xs"
                >
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Times</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="notifications" className="space-y-6 md:space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="bg-white rounded-xl border border-black/10 shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-black to-gray-800 px-6 py-5 md:px-8 md:py-6">
                      <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-1"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Notifications & Alerts
                      </h2>
                      <p className="text-white/60 text-xs md:text-sm">
                        Recent activity and important updates
                      </p>
                    </div>
                    <div className="p-4 md:p-6">
                      <NotificationCenter bookings={bookings} />
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6 md:space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <AnalyticsDashboard bookings={bookings} />
                </motion.div>
              </TabsContent>

              <TabsContent value="calendar" className="space-y-6 md:space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="bg-white rounded-xl border border-black/10 shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-black to-gray-800 px-6 py-5 md:px-8 md:py-6">
                      <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-1"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Calendar View
                      </h2>
                      <p className="text-white/60 text-xs md:text-sm">
                        Visual overview of your booking schedule
                      </p>
                    </div>
                    <div className="p-4 md:p-6">
                      <CalendarView 
                        bookings={bookings}
                        onUpdate={handleUpdateBooking}
                        onDelete={handleDeleteBooking}
                      />
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="bookings" className="space-y-6 md:space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="bg-white rounded-xl border border-black/10 shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-black to-gray-800 px-6 py-5 md:px-8 md:py-6">
                      <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-1"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Manage Bookings
                      </h2>
                      <p className="text-white/60 text-xs md:text-sm">
                        View, edit, and manage all client bookings
                      </p>
                    </div>
                    <div className="p-4 md:p-6">
                      <BookingsTable 
                        bookings={bookings} 
                        onUpdate={handleUpdateBooking}
                        onDelete={handleDeleteBooking}
                      />
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="clients" className="space-y-6 md:space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="bg-white rounded-xl border border-black/10 shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-black to-gray-800 px-6 py-5 md:px-8 md:py-6">
                      <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-1"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Client Management
                      </h2>
                      <p className="text-white/60 text-xs md:text-sm">
                        View and manage your client database
                      </p>
                    </div>
                    <div className="p-4 md:p-6">
                      <ClientManagement 
                        bookings={bookings}
                        onMessageClient={setMessagingClient}
                      />
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="availability" className="space-y-6 md:space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="bg-white rounded-xl border border-black/10 shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-black to-gray-800 px-6 py-5 md:px-8 md:py-6">
                      <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-1"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Manage Availability
                      </h2>
                      <p className="text-white/60 text-xs md:text-sm">
                        Set available time slots for client bookings
                      </p>
                    </div>
                    <div className="p-4 md:p-6">
                      <AvailabilityManager />
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
              </Tabs>
              </div>
              )}
              </main>

              {/* Messaging Modal */}
              {messagingClient && (
              <ClientMessaging 
              client={messagingClient}
              onClose={() => setMessagingClient(null)}
              />
              )}

              {/* Footer */}
              <footer className="bg-gradient-to-br from-gray-50 to-gray-100 py-12 sm:py-16 border-t border-black/10">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                  <Footer />
                </div>
              </footer>
              </div>
              );
              }