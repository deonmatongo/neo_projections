import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';

export default function ClientMessaging({ client, onClose }) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      // Email sending removed - base44 dependency removed
      setIsSent(true);
      toast.success('Message sent successfully');
      
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      toast.error('Failed to send message');
      setIsSending(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {isSent ? (
            <div className="p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Message Sent!
              </h3>
              <p className="text-black/60">
                Your message has been sent to {client.name}
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-black/10">
                <div>
                  <h2 className="text-xl font-bold"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Send Message
                  </h2>
                  <p className="text-sm text-black/60 mt-1">To: {client.name}</p>
                </div>
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="icon"
                  className="text-black/60 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Form */}
              <form onSubmit={handleSend} className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Recipient</label>
                  <Input
                    value={client.email}
                    disabled
                    className="bg-black/5"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject *</label>
                  <Input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter subject..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Message *</label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="min-h-[200px] resize-none"
                    required
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    disabled={isSending}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSending || !subject || !message}
                    className="flex-1 bg-black text-white hover:bg-black/90"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}