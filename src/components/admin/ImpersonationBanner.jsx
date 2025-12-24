import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  X,
  Clock,
  User,
  Shield,
  StickyNote,
  ChevronDown,
  ChevronUp,
  Plus,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useImpersonation } from '@/contexts/ImpersonationContext';
import { useToast } from '@/hooks/use-toast';

const ImpersonationBanner = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    isImpersonating,
    impersonatedCustomer,
    impersonationSession,
    endImpersonation,
    addSessionNote,
    getSessionDuration,
    sessionNotes
  } = useImpersonation();

  const [sessionTime, setSessionTime] = useState(0);
  const [notesPanelOpen, setNotesPanelOpen] = useState(false);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    if (!isImpersonating) return;

    const interval = setInterval(() => {
      setSessionTime(getSessionDuration());
    }, 1000);

    return () => clearInterval(interval);
  }, [isImpersonating, getSessionDuration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndImpersonation = () => {
    const log = endImpersonation();
    toast({
      title: "Impersonation Ended",
      description: `Session duration: ${log.duration} minutes. ${log.pagesViewed.length} pages viewed.`,
    });
    navigate('/admin/customers');
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    addSessionNote(newNote);
    toast({
      title: "Note Added",
      description: "Your note has been saved to this session.",
    });
    setNewNote('');
  };

  if (!isImpersonating || !impersonatedCustomer) return null;

  return (
    <>
      {/* Main Banner */}
      <motion.div
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        exit={{ y: -60 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-semibold">
                Impersonating Customer: {impersonatedCustomer.name}
              </span>
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                {impersonatedCustomer.shopperId}
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4" />
                <span>Admin</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm bg-black/20 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4" />
                <span className="font-mono">{formatTime(sessionTime)}</span>
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => setNotesPanelOpen(!notesPanelOpen)}
                className="gap-2 bg-white/20 hover:bg-white/30 text-white border-0"
              >
                <StickyNote className="w-4 h-4" />
                Notes ({sessionNotes.length})
                {notesPanelOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={handleEndImpersonation}
                className="gap-2 bg-white text-red-600 hover:bg-white/90"
              >
                <X className="w-4 h-4" />
                Exit Impersonation
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Read-Only Mode Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Badge className="bg-orange-500/90 text-white border-0 px-4 py-2 text-sm shadow-lg">
          <AlertTriangle className="w-4 h-4 mr-2" />
          Read-Only Mode
        </Badge>
      </motion.div>

      {/* Notes Panel */}
      <AnimatePresence>
        {notesPanelOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-12 right-4 z-50 w-80 bg-card border border-border rounded-lg shadow-xl"
          >
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold flex items-center gap-2">
                <StickyNote className="w-4 h-4 text-primary" />
                Session Notes
              </h3>
            </div>
            
            <div className="p-4 max-h-60 overflow-y-auto space-y-3">
              {sessionNotes.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No notes yet. Add a note below.
                </p>
              ) : (
                sessionNotes.map((note) => (
                  <div key={note.id} className="p-3 bg-secondary/50 rounded-lg">
                    <p className="text-sm text-foreground">{note.content}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(note.addedAt).toLocaleTimeString()}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                  className="flex-1"
                />
                <Button size="icon" onClick={handleAddNote}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImpersonationBanner;
