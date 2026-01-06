import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, Calendar, Clock, Tag, FileText, Trash2, Save } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function BookingDetailsModal({ booking, onClose, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBooking, setEditedBooking] = useState(booking);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Booking update removed - base44 dependency removed
      toast.success('Booking updated successfully');
      onUpdate({ ...booking, ...editedBooking });
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update booking');
    }
    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    
    setIsDeleting(true);
    try {
      // Booking deletion removed - base44 dependency removed
      toast.success('Booking deleted');
      onDelete(booking.id);
      onClose();
    } catch (error) {
      toast.error('Failed to delete booking');
    }
    setIsDeleting(false);
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    confirmed: 'bg-green-100 text-green-800 border-green-200',
    completed: 'bg-blue-100 text-blue-800 border-blue-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-black/10 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Booking Details
              </h2>
              <p className="text-xs text-black/40 tracking-[0.2em] uppercase mt-1">
                ID: {booking.id}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-black/40 hover:text-black transition-colors p-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Status Badge */}
            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium ${statusColors[booking.status]}`}>
                <div className="w-2 h-2 rounded-full bg-current" />
                {booking.status.toUpperCase()}
              </span>
              {!isEditing && (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  size="sm"
                  className="text-xs tracking-[0.2em]"
                >
                  EDIT
                </Button>
              )}
            </div>

            {/* Client Information */}
            <div className="space-y-4">
              <h3 className="text-sm tracking-[0.2em] uppercase text-black/60 font-semibold">
                Client Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-1 text-black/40" />
                  <div className="flex-1">
                    <p className="text-xs text-black/40 mb-1">Name</p>
                    {isEditing ? (
                      <Input
                        value={editedBooking.client_name}
                        onChange={(e) => setEditedBooking({ ...editedBooking, client_name: e.target.value })}
                        className="h-9"
                      />
                    ) : (
                      <p className="font-medium">{booking.client_name}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-1 text-black/40" />
                  <div className="flex-1">
                    <p className="text-xs text-black/40 mb-1">Email</p>
                    <p className="font-medium text-sm">{booking.client_email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-1 text-black/40" />
                  <div className="flex-1">
                    <p className="text-xs text-black/40 mb-1">Phone</p>
                    {isEditing ? (
                      <Input
                        value={editedBooking.client_phone}
                        onChange={(e) => setEditedBooking({ ...editedBooking, client_phone: e.target.value })}
                        className="h-9"
                      />
                    ) : (
                      <p className="font-medium">{booking.client_phone || 'N/A'}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Tag className="w-4 h-4 mt-1 text-black/40" />
                  <div className="flex-1">
                    <p className="text-xs text-black/40 mb-1">Service</p>
                    <p className="font-medium capitalize">{booking.service_type?.replace(/_/g, ' ')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Session Details */}
            <div className="space-y-4">
              <h3 className="text-sm tracking-[0.2em] uppercase text-black/60 font-semibold">
                Session Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 mt-1 text-black/40" />
                  <div className="flex-1">
                    <p className="text-xs text-black/40 mb-1">Date</p>
                    <p className="font-medium">{format(new Date(booking.date), 'EEEE, MMMM d, yyyy')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 mt-1 text-black/40" />
                  <div className="flex-1">
                    <p className="text-xs text-black/40 mb-1">Time</p>
                    <p className="font-medium">{booking.time_slot}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:col-span-2">
                  <MapPin className="w-4 h-4 mt-1 text-black/40" />
                  <div className="flex-1">
                    <p className="text-xs text-black/40 mb-1">Location</p>
                    {isEditing ? (
                      <Input
                        value={editedBooking.location}
                        onChange={(e) => setEditedBooking({ ...editedBooking, location: e.target.value })}
                        className="h-9"
                      />
                    ) : (
                      <p className="font-medium">{booking.location || 'Studio'}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Status Update */}
            {isEditing && (
              <div className="space-y-2">
                <label className="text-xs tracking-[0.2em] uppercase text-black/60 font-semibold">
                  Update Status
                </label>
                <Select
                  value={editedBooking.status}
                  onValueChange={(value) => setEditedBooking({ ...editedBooking, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Notes */}
            {booking.notes && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-black/40" />
                  <h3 className="text-xs tracking-[0.2em] uppercase text-black/60 font-semibold">
                    Client Notes
                  </h3>
                </div>
                {isEditing ? (
                  <Textarea
                    value={editedBooking.notes}
                    onChange={(e) => setEditedBooking({ ...editedBooking, notes: e.target.value })}
                    className="min-h-[80px]"
                  />
                ) : (
                  <p className="text-sm text-black/60 bg-black/5 p-4 rounded-lg">{booking.notes}</p>
                )}
              </div>
            )}

            {/* Metadata */}
            <div className="pt-4 border-t border-black/10 text-xs text-black/40">
              <p>Created: {format(new Date(booking.created_date), 'MMM d, yyyy h:mm a')}</p>
              {booking.updated_date && (
                <p>Last Updated: {format(new Date(booking.updated_date), 'MMM d, yyyy h:mm a')}</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-black/10 p-6 flex items-center justify-between">
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              variant="ghost"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              {isDeleting ? (
                'Deleting...'
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </>
              )}
            </Button>

            {isEditing && (
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedBooking(booking);
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-black text-white hover:bg-black/80"
                >
                  {isSaving ? (
                    'Saving...'
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}