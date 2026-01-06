import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon, Clock, Trash2, Save, X, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function AvailabilityManager() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [isBlocked, setIsBlocked] = useState(false);
  const [newTimeSlot, setNewTimeSlot] = useState('');
  const queryClient = useQueryClient();

  const { data: availability = [] } = useQuery({
    queryKey: ['availability'],
    queryFn: () => Promise.resolve([]), // base44 dependency removed
  });

  const { data: bookings = [] } = useQuery({
    queryKey: ['bookings-for-availability'],
    queryFn: () => Promise.resolve([]), // base44 dependency removed
  });

  const createMutation = useMutation({
    mutationFn: (data) => Promise.resolve(data), // base44 dependency removed
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availability'] });
      setSelectedSlots([]);
      setIsBlocked(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => Promise.resolve(data), // base44 dependency removed
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availability'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => Promise.resolve(), // base44 dependency removed
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availability'] });
      setSelectedSlots([]);
      setIsBlocked(false);
    },
  });

  const currentAvailability = availability.find(
    a => a.date === format(selectedDate, 'yyyy-MM-dd')
  );

  const bookedSlots = bookings
    .filter(b => b.date === format(selectedDate, 'yyyy-MM-dd'))
    .map(b => b.time_slot);

  React.useEffect(() => {
    if (currentAvailability) {
      setSelectedSlots(currentAvailability.time_slots || []);
      setIsBlocked(currentAvailability.is_blocked || false);
    } else {
      setSelectedSlots([]);
      setIsBlocked(false);
    }
  }, [currentAvailability, selectedDate]);

  const handleSave = () => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    
    if (currentAvailability) {
      updateMutation.mutate({
        id: currentAvailability.id,
        data: {
          date: dateStr,
          time_slots: isBlocked ? [] : selectedSlots,
          is_blocked: isBlocked
        }
      });
    } else {
      createMutation.mutate({
        date: dateStr,
        time_slots: isBlocked ? [] : selectedSlots,
        is_blocked: isBlocked
      });
    }
  };

  const handleDelete = () => {
    if (currentAvailability) {
      deleteMutation.mutate(currentAvailability.id);
    }
  };

  const toggleSlot = (slot) => {
    if (isBlocked) return;
    setSelectedSlots(prev => 
      prev.includes(slot) 
        ? prev.filter(s => s !== slot)
        : [...prev, slot]
    );
  };

  const addCustomTimeSlot = () => {
    if (!newTimeSlot) return;
    
    // Validate time format (HH:MM)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(newTimeSlot)) {
      toast.error('Invalid time format. Use HH:MM (e.g., 14:30)');
      return;
    }
    
    if (selectedSlots.includes(newTimeSlot)) {
      toast.error('This time slot is already added');
      return;
    }
    
    setSelectedSlots(prev => [...prev, newTimeSlot].sort());
    setNewTimeSlot('');
    toast.success('Time slot added');
  };

  const removeSlot = (slot) => {
    setSelectedSlots(prev => prev.filter(s => s !== slot));
  };

  const datesWithAvailability = availability.map(a => new Date(a.date));

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Select Date
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={{
              hasAvailability: datesWithAvailability,
              booked: bookings.map(b => new Date(b.date))
            }}
            modifiersStyles={{
              hasAvailability: { 
                backgroundColor: '#22c55e', 
                color: 'white',
                fontWeight: 'bold'
              }
            }}
          />
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded" />
              <span>Has availability set</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Slots */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {format(selectedDate, 'MMMM d, yyyy')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Block entire day */}
          <div className="flex items-center space-x-2 p-3 bg-red-50 rounded-lg border border-red-200">
            <Checkbox
              id="block-day"
              checked={isBlocked}
              onCheckedChange={setIsBlocked}
            />
            <label
              htmlFor="block-day"
              className="text-sm font-medium leading-none cursor-pointer"
            >
              Block entire day (no bookings)
            </label>
          </div>

          {/* Add custom time slot */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-black/60">Add Time Slot</p>
            <div className="flex gap-2">
              <Input
                type="time"
                value={newTimeSlot}
                onChange={(e) => setNewTimeSlot(e.target.value)}
                placeholder="HH:MM"
                disabled={isBlocked}
                className="flex-1"
              />
              <Button
                onClick={addCustomTimeSlot}
                disabled={isBlocked || !newTimeSlot}
                size="icon"
                className="bg-black text-white hover:bg-black/90"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Time slots */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-black/60">
              Available Time Slots ({selectedSlots.length})
            </p>
            {selectedSlots.length === 0 ? (
              <div className="text-center py-8 text-black/40 text-sm">
                {isBlocked ? 'Day is blocked' : 'No time slots added. Add custom times above.'}
              </div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {selectedSlots.map(slot => {
                  const isBooked = bookedSlots.includes(slot);
                  
                  return (
                    <motion.div
                      key={slot}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                        isBlocked 
                          ? 'bg-gray-100 border-gray-200 opacity-50' 
                          : isBooked
                          ? 'bg-orange-50 border-orange-200'
                          : 'bg-green-50 border-green-500 shadow-sm'
                      }`}
                    >
                      <span className="font-medium">{slot}</span>
                      <div className="flex items-center gap-2">
                        {isBooked ? (
                          <span className="text-xs text-orange-600 font-medium">
                            Booked
                          </span>
                        ) : (
                          <Button
                            onClick={() => removeSlot(slot)}
                            disabled={isBlocked}
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-red-500 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button
              onClick={handleSave}
              className="flex-1 bg-black text-white hover:bg-black/90"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            {currentAvailability && (
              <Button
                onClick={handleDelete}
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-50"
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}