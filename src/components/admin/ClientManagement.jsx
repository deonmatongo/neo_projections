import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Mail, Phone, Calendar, User, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';

export default function ClientManagement({ bookings, onMessageClient }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Extract unique clients from bookings
  const clients = useMemo(() => {
    const clientMap = new Map();
    
    bookings.forEach(booking => {
      const email = booking.client_email.toLowerCase();
      if (!clientMap.has(email)) {
        clientMap.set(email, {
          name: booking.client_name,
          email: booking.client_email,
          phone: booking.client_phone || 'N/A',
          bookings: [],
          totalBookings: 0,
          lastBooking: null
        });
      }
      
      const client = clientMap.get(email);
      client.bookings.push(booking);
      client.totalBookings++;
      
      const bookingDate = new Date(booking.date);
      if (!client.lastBooking || bookingDate > new Date(client.lastBooking)) {
        client.lastBooking = booking.date;
      }
    });
    
    return Array.from(clientMap.values())
      .sort((a, b) => new Date(b.lastBooking) - new Date(a.lastBooking));
  }, [bookings]);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold mb-1">{clients.length}</p>
              <p className="text-sm text-black/60">Total Clients</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold mb-1">
                {clients.filter(c => c.totalBookings > 1).length}
              </p>
              <p className="text-sm text-black/60">Repeat Clients</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold mb-1">
                {(clients.reduce((sum, c) => sum + c.totalBookings, 0) / clients.length || 0).toFixed(1)}
              </p>
              <p className="text-sm text-black/60">Avg Bookings/Client</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Client Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {filteredClients.length === 0 ? (
            <div className="text-center py-8 text-black/40">
              {searchTerm ? 'No clients found' : 'No clients yet'}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredClients.map((client, index) => (
                <motion.div
                  key={client.email}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-lg border border-black/10 hover:bg-black/5 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-sm">
                            {client.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm">{client.name}</h3>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              {client.totalBookings} booking{client.totalBookings !== 1 ? 's' : ''}
                            </Badge>
                            {client.totalBookings > 1 && (
                              <Badge className="text-xs bg-purple-500">
                                Repeat Client
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-1 text-xs text-black/60 ml-13">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3" />
                          <span className="truncate">{client.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3" />
                          <span>{client.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          <span>Last booking: {format(new Date(client.lastBooking), 'MMM d, yyyy')}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onMessageClient(client)}
                      className="flex-shrink-0"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </Button>
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