import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import BookingDetailsModal from './BookingDetailsModal';

const services = [
  { value: 'all', label: 'All Services' },
  { value: 'portrait', label: 'Portrait', color: 'bg-blue-500' },
  { value: 'fashion', label: 'Fashion', color: 'bg-purple-500' },
  { value: 'editorial', label: 'Editorial', color: 'bg-pink-500' },
  { value: 'commercial', label: 'Commercial', color: 'bg-green-500' },
  { value: 'event', label: 'Event', color: 'bg-orange-500' }
];

export default function CalendarView({ bookings, onUpdate, onDelete }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedService, setSelectedService] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const filteredBookings = bookings.filter(booking => {
    if (booking.status === 'cancelled') return false;
    if (selectedService !== 'all' && booking.service_type !== selectedService) return false;
    return true;
  });

  const getBookingsForDay = (day) => {
    const dayStr = format(day, 'yyyy-MM-dd');
    return filteredBookings.filter(booking => booking.date === dayStr);
  };

  const getServiceColor = (serviceType) => {
    return services.find(s => s.value === serviceType)?.color || 'bg-gray-500';
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            variant="outline"
            size="icon"
            className="h-9 w-9"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl sm:text-2xl font-bold min-w-[180px] sm:min-w-[200px] text-center"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <Button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            variant="outline"
            size="icon"
            className="h-9 w-9"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => setCurrentMonth(new Date())}
            variant="outline"
            size="sm"
            className="hidden sm:flex"
          >
            Today
          </Button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <CalendarIcon className="w-4 h-4 text-black/40" />
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by service" />
            </SelectTrigger>
            <SelectContent>
              {services.map(service => (
                <SelectItem key={service.value} value={service.value}>
                  <div className="flex items-center gap-2">
                    {service.value !== 'all' && (
                      <div className={`w-3 h-3 rounded-full ${service.color}`} />
                    )}
                    {service.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Calendar Grid */}
      <Card className="p-2 sm:p-4">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-[10px] sm:text-xs font-semibold text-black/60 py-2">
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day[0]}</span>
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {calendarDays.map((day, index) => {
            const dayBookings = getBookingsForDay(day);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isToday = isSameDay(day, new Date());

            return (
              <motion.div
                key={day.toISOString()}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.01 }}
                className={`min-h-[60px] sm:min-h-[100px] p-1 sm:p-2 rounded-lg border transition-all ${
                  isCurrentMonth ? 'bg-white border-black/10' : 'bg-gray-50 border-gray-200'
                } ${isToday ? 'ring-2 ring-black' : ''}`}
              >
                <div className={`text-xs sm:text-sm font-semibold mb-1 ${
                  isCurrentMonth ? 'text-black' : 'text-black/30'
                } ${isToday ? 'text-black' : ''}`}>
                  {format(day, 'd')}
                </div>

                <div className="space-y-0.5 sm:space-y-1 overflow-y-auto max-h-[40px] sm:max-h-[70px]">
                  {dayBookings.map((booking, idx) => (
                    <motion.button
                      key={booking.id}
                      onClick={() => setSelectedBooking(booking)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className={`w-full text-left px-1 sm:px-2 py-0.5 sm:py-1 rounded text-white text-[8px] sm:text-xs ${getServiceColor(booking.service_type)} hover:opacity-90 transition-opacity`}
                    >
                      <div className="truncate font-medium">
                        {booking.time_slot}
                      </div>
                      <div className="truncate hidden sm:block opacity-90">
                        {booking.client_name}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Legend */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-3">Service Types</h3>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {services.filter(s => s.value !== 'all').map(service => (
            <div key={service.value} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${service.color}`} />
              <span className="text-xs sm:text-sm text-black/60">{service.label}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onUpdate={(updated) => {
            onUpdate(updated);
            setSelectedBooking(null);
          }}
          onDelete={(id) => {
            onDelete(id);
            setSelectedBooking(null);
          }}
        />
      )}
    </div>
  );
}