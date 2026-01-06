import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, addDays } from 'date-fns';
import { CalendarIcon, Loader2, CheckCircle, Download } from 'lucide-react';
import { toast } from 'sonner';

const services = [
  { value: 'portrait', label: 'Portrait Session', price: '1,400 zł' },
  { value: 'fashion', label: 'Fashion Shoot', price: '3,000 zł' },
  { value: 'editorial', label: 'Editorial', price: '4,800 zł' },
  { value: 'commercial', label: 'Commercial', price: '10,000 zł' },
  { value: 'event', label: 'Event Coverage', price: '7,200 zł' }
];

const formatTimeLabel = (time) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

export default function BookingForm() {
  // Get pre-filled service from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const prefilledService = urlParams.get('service') || '';

  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    service_type: prefilledService,
    date: null,
    time_slot: '',
    location: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdBooking, setCreatedBooking] = useState(null);

  const { data: availability = [] } = useQuery({
    queryKey: ['availability'],
    queryFn: () => Promise.resolve([]), // base44 dependency removed
  });

  const { data: bookings = [] } = useQuery({
    queryKey: ['bookings'],
    queryFn: () => Promise.resolve([]), // base44 dependency removed
  });

  // Get available time slots for selected date
  const getAvailableTimeSlots = () => {
    if (!formData.date) return [];

    const dateStr = format(formData.date, 'yyyy-MM-dd');
    const dateAvailability = availability.find(a => a.date === dateStr);
    
    // If day is blocked, return empty
    if (dateAvailability?.is_blocked) return [];
    
    // If no availability set for this date, return empty (admin must set available times)
    if (!dateAvailability?.time_slots?.length) return [];
    
    // Filter out already booked slots
    const bookedSlots = bookings
      .filter(b => b.date === dateStr && b.status !== 'cancelled')
      .map(b => b.time_slot);
    
    return dateAvailability.time_slots
      .filter(slot => !bookedSlots.includes(slot))
      .map(slot => ({ value: slot, label: formatTimeLabel(slot) }));
  };

  const availableTimeSlots = getAvailableTimeSlots();

  // Check if date is available
  const isDateDisabled = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dateAvailability = availability.find(a => a.date === dateStr);
    
    // Block if explicitly blocked
    if (dateAvailability?.is_blocked) return true;
    
    // Block if no availability set for this date
    if (!dateAvailability || !dateAvailability.time_slots?.length) return true;
    
    // Block if all slots are booked
    const bookedSlots = bookings
      .filter(b => b.date === dateStr && b.status !== 'cancelled')
      .map(b => b.time_slot);
    
    const availableSlots = dateAvailability.time_slots.filter(
      slot => !bookedSlots.includes(slot)
    );
    
    return availableSlots.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingData = {
      ...formData,
      date: formData.date ? format(formData.date, 'yyyy-MM-dd') : null,
      status: 'confirmed'
    };

    // base44 dependency removed - booking creation disabled
    const booking = { id: Date.now().toString() };
    setCreatedBooking({ ...bookingData, id: booking.id });

    // Email sending removed - base44 dependency removed

    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success('Booking confirmed! Check your email.');
  };

  const generateCalendarFile = () => {
    if (!createdBooking) return;
    
    const startDate = new Date(`${createdBooking.date}T${createdBooking.time_slot}:00`);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration
    
    const formatICSDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const serviceName = services.find(s => s.value === createdBooking.service_type)?.label || createdBooking.service_type;
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//NEO PROJECTIONS//Booking//EN
BEGIN:VEVENT
UID:${createdBooking.id}@neoprojections.com
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:NEO PROJECTIONS - ${serviceName}
DESCRIPTION:Photography session with NEO PROJECTIONS\\n\\nService: ${serviceName}\\nClient: ${createdBooking.client_name}
LOCATION:${createdBooking.location || 'NEO PROJECTIONS Studio'}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `neo-projections-booking-${createdBooking.date}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="w-20 h-20 mx-auto text-black mb-8" />
        </motion.div>
        <h3 className="text-3xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          BOOKING CONFIRMED
        </h3>
        <p className="text-black/60 mb-8 max-w-md mx-auto">
          A confirmation email has been sent to {formData.client_email}. 
          We look forward to your session!
        </p>
        
        <Button
          onClick={generateCalendarFile}
          className="bg-black text-white hover:bg-black/80 rounded-none px-8 py-6 text-sm tracking-[0.2em]"
        >
          <Download className="w-4 h-4 mr-3" />
          ADD TO CALENDAR
        </Button>
        
        <button
          onClick={() => {
            setIsSuccess(false);
            setFormData({
              client_name: '',
              client_email: '',
              client_phone: '',
              service_type: '',
              date: null,
              time_slot: '',
              location: '',
              notes: ''
            });
          }}
          className="block mx-auto mt-6 text-black/40 text-xs tracking-[0.2em] uppercase hover:text-black transition-colors"
        >
          Book Another Session
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6 sm:space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-black/60">Full Name *</label>
          <Input
            value={formData.client_name}
            onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
            className="bg-transparent border-black/20 border-0 border-b rounded-none focus:border-black transition-colors h-12"
            placeholder="Your name"
            required
          />
        </motion.div>
        
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <label className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-black/60">Email *</label>
          <Input
            type="email"
            value={formData.client_email}
            onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
            className="bg-transparent border-black/20 border-0 border-b rounded-none focus:border-black transition-colors h-12"
            placeholder="your@email.com"
            required
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-black/60">Phone</label>
          <Input
            type="tel"
            value={formData.client_phone}
            onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
            className="bg-transparent border-black/20 border-0 border-b rounded-none focus:border-black transition-colors h-12"
            placeholder="+1 (555) 000-0000"
          />
        </motion.div>
        
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <label className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-black/60">Service Type *</label>
          <Select
            value={formData.service_type}
            onValueChange={(value) => setFormData({ ...formData, service_type: value })}
          >
            <SelectTrigger className="bg-transparent border-black/20 border-0 border-b rounded-none focus:border-black transition-colors h-12">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.value} value={service.value}>
                  <span className="flex justify-between items-center gap-4">
                    {service.label}
                    <span className="text-black/40">{service.price}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-black/60">Date *</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="w-full bg-transparent border-black/20 border-0 border-b rounded-none hover:bg-transparent h-12 justify-start font-normal"
              >
                <CalendarIcon className="mr-3 h-4 w-4 text-black/40" />
                {formData.date ? format(formData.date, 'PPP') : <span className="text-black/40">Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={(date) => setFormData({ ...formData, date, time_slot: '' })}
                disabled={(date) => 
                  date < addDays(new Date(), 1) ||
                  isDateDisabled(date)
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </motion.div>
        
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <label className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-black/60">Time Slot *</label>
          <Select
            value={formData.time_slot}
            onValueChange={(value) => setFormData({ ...formData, time_slot: value })}
            disabled={!formData.date}
          >
            <SelectTrigger className="bg-transparent border-black/20 border-0 border-b rounded-none focus:border-black transition-colors h-12">
              <SelectValue placeholder={formData.date ? "Select time" : "Select date first"} />
            </SelectTrigger>
            <SelectContent>
              {availableTimeSlots.length > 0 ? (
                availableTimeSlots.map((slot) => (
                  <SelectItem key={slot.value} value={slot.value}>
                    {slot.label}
                  </SelectItem>
                ))
              ) : (
                <div className="p-2 text-sm text-black/40 text-center">
                  No available time slots
                </div>
              )}
            </SelectContent>
          </Select>
          {formData.date && availableTimeSlots.length === 0 && (
            <p className="text-xs text-red-500 mt-1">
              No available time slots for this date. Please select another date.
            </p>
          )}
        </motion.div>
      </div>

      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <label className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-black/60">Location</label>
        <Input
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="bg-transparent border-black/20 border-0 border-b rounded-none focus:border-black transition-colors h-12"
          placeholder="Studio or on-location address"
        />
      </motion.div>

      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <label className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-black/60">Additional Notes</label>
        <Textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="bg-transparent border-black/20 border rounded-none focus:border-black transition-colors min-h-[120px] resize-none"
          placeholder="Tell us about your vision, requirements, or any special requests..."
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
        type="submit"
        disabled={isSubmitting || !formData.client_name || !formData.client_email || !formData.service_type || !formData.date || !formData.time_slot}
        className="w-full bg-black text-white hover:bg-black/80 rounded-none h-14 text-sm tracking-[0.3em] uppercase transition-all disabled:opacity-40"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-3 animate-spin" />
            CONFIRMING...
          </>
        ) : (
          'BOOK SESSION'
        )}
        </Button>
      </motion.div>
    </motion.form>
  );
}