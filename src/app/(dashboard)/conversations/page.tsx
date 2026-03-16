"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  MessageSquare, 
  Search, 
  Calendar,
  Filter,
  User,
  Bot
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatBubble } from "@/components/chat-bubble";

export default function ConversationsPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchSessions() {
      const { data } = await supabase
        .from('agency_chat_history')
        .select('session_id, created_at')
        .order('created_at', { ascending: false });
      
      if (data) {
        // Unique sessions
        const unique = Array.from(new Set(data.map(m => m.session_id)))
          .map(sid => data.find(m => m.session_id === sid))
          .filter(s => s !== undefined);
        setSessions(unique);
        if (unique.length > 0 && !selectedSession) {
          setSelectedSession(unique[0].session_id);
        }
      }
      setLoading(false);
    }
    fetchSessions();
  }, [supabase, selectedSession]);

  useEffect(() => {
    if (!selectedSession) return;

    async function fetchMessages() {
      const { data } = await supabase
        .from('agency_chat_history')
        .select('*')
        .eq('session_id', selectedSession)
        .order('created_at', { ascending: true });
      
      setMessages(data || []);
    }
    fetchMessages();

    // Realtime subscription
    const channel = supabase
      .channel(`chat:${selectedSession}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'agency_chat_history',
        filter: `session_id=eq.${selectedSession}`
      }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, selectedSession]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-200px)] flex gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Session List */}
      <div className="w-80 glass-card flex flex-col overflow-hidden">
        <div className="p-4 border-b border-zinc-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-[10px] font-bold text-white focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all uppercase tracking-widest placeholder:text-zinc-700"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {sessions.map((session) => (
            <button
              key={session.session_id}
              onClick={() => setSelectedSession(session.session_id)}
              className={cn(
                "w-full text-left p-4 rounded-xl transition-all group",
                selectedSession === session.session_id 
                  ? "bg-accent/10 border border-accent/20 ring-1 ring-accent/10" 
                  : "hover:bg-zinc-800/50 border border-transparent"
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest transition-colors",
                  selectedSession === session.session_id ? "text-accent" : "text-zinc-500"
                )}>
                  {session.session_id}
                </span>
                <span className="text-[9px] font-bold text-zinc-700">
                  {new Date(session.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs font-medium text-zinc-400 truncate group-hover:text-zinc-300">
                Latest message preview...
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Chat View */}
      <div className="flex-1 glass-card flex flex-col overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/20 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-400 ring-1 ring-zinc-700/50">
              <User size={20} />
            </div>
            <div>
              <h2 className="text-sm font-black text-white tracking-widest uppercase">{selectedSession}</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black text-emerald-500/80 uppercase tracking-[0.2em]">Active Realtime</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 hover:bg-zinc-800 rounded-xl transition-colors border border-zinc-800 text-zinc-500">
              <Calendar size={16} />
            </button>
            <button className="p-2.5 hover:bg-zinc-800 rounded-xl transition-colors border border-zinc-800 text-zinc-500">
              <Filter size={16} />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 space-y-6"
        >
          {messages.map((msg, idx) => {
            const isAI = msg.sender_type === 'ai';
            const isHuman = msg.sender_type === 'human';
            
            return (
              <ChatBubble 
                key={idx}
                message={msg.message?.text || msg.message}
                sender_type={msg.sender_type}
                timestamp={msg.created_at}
              />
            );
          })}
        </div>
        
        {/* Strictly Read-Only (as per request) */}
        <div className="p-6 border-t border-zinc-800 bg-zinc-950/20">
           <div className="flex items-center justify-center p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">Read-Only Observation Mode Engaged</p>
           </div>
        </div>
      </div>
    </div>
  );
}
