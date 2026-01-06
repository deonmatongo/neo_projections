import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, Mail, ExternalLink } from 'lucide-react';
import BookingDetailsModal from './BookingDetailsModal';

export default function BookingsTable({ bookings, onUpdate, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.client_email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesService = serviceFilter === 'all' || booking.service_type === serviceFilter;

    return matchesSearch && matchesStatus && matchesService;
  });

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    confirmed: 'bg-green-100 text-green-800 border-green-200',
    completed: 'bg-blue-100 text-blue-800 border-blue-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200'
  };

  const serviceColors = {
    portrait: 'bg-purple-100 text-purple-800 border-purple-200',
    fashion: 'bg-pink-100 text-pink-800 border-pink-200',
    editorial: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    commercial: 'bg-blue-100 text-blue-800 border-blue-200',
    event: 'bg-green-100 text-green-800 border-green-200'
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Select value={serviceFilter} onValueChange={setServiceFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            <SelectItem value="portrait">Portrait</SelectItem>
            <SelectItem value="fashion">Fashion</SelectItem>
            <SelectItem value="editorial">Editorial</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
            <SelectItem value="event">Event</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <p className="text-xs text-black/40 tracking-[0.2em] uppercase">
        Showing {filteredBookings.length} of {bookings.length} bookings
      </p>

      {/* Table */}
      <div className="border border-black/10 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-black text-white hover:bg-black">
              <TableHead className="text-white font-semibold">Client</TableHead>
              <TableHead className="text-white font-semibold">Service</TableHead>
              <TableHead className="text-white font-semibold">Date & Time</TableHead>
              <TableHead className="text-white font-semibold">Status</TableHead>
              <TableHead className="text-white font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-black/40">
                  No bookings found
                </TableCell>
              </TableRow>
            ) : (
              filteredBookings.map((booking, index) => (
                <motion.tr
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-black/5 hover:bg-black/5 cursor-pointer transition-colors"
                  onClick={() => setSelectedBooking(booking)}
                >
                  <TableCell>
                    <div>
                      <p className="font-medium">{booking.client_name}</p>
                      <div className="flex items-center gap-1 text-xs text-black/40 mt-1">
                        <Mail className="w-3 h-3" />
                        {booking.client_email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${serviceColors[booking.service_type]} border`}>
                      {booking.service_type?.replace(/_/g, ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-black/40 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">
                          {format(new Date(booking.date), 'MMM d, yyyy')}
                        </p>
                        <p className="text-xs text-black/40">{booking.time_slot}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${statusColors[booking.status]} border`}>
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBooking(booking);
                      }}
                      className="text-black/40 hover:text-black transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </TableCell>
                </motion.tr>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal */}
      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onUpdate={(updatedBooking) => {
            onUpdate(updatedBooking);
            setSelectedBooking(null);
          }}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}