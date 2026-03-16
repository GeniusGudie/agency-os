'use client'

import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'
import { cn } from '@/lib/utils'
import { Bot, User, UserCheck } from 'lucide-react'

interface Message {
  id: string | number
  message: { text?: string; content?: string } | string
  sender_type: 'ai' | 'customer' | 'human'
  created_at: string
}

interface ChatHistoryProps {
  sessionId: string
  orgId: string
  initialMessages?: Message[]
  customerName?: string
}

export function ChatHistory({ sessionId, orgId, initialMessages = [], customerName = "Customer" }: ChatHistoryProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const scrollRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    // Scroll to bottom on load
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })

    // Subscribe to realtime changes
    const channel = supabase
      .channel(`chat:${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'agency_chat_history',
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [sessionId, supabase])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const getMessageText = (msg: Message) => {
    if (typeof msg.message === 'string') return msg.message
    return msg.message.text || msg.message.content || JSON.stringify(msg.message)
  }

  return (
    <div className="flex flex-col h-full bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
      <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                <User className="w-5 h-5" />
            </div>
            <div>
                <h4 className="text-sm font-bold text-zinc-100">{customerName}</h4>
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Live Connection</span>
                </div>
            </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] bg-fixed"
      >
        {messages.map((msg, idx) => {
          const isAI = msg.sender_type === 'ai'
          const isHuman = msg.sender_type === 'human'
          const isCustomer = msg.sender_type === 'customer' || (!isAI && !isHuman)

          return (
            <div 
              key={msg.id || idx} 
              className={cn(
                "flex flex-col max-w-[85%]",
                (isCustomer || isHuman) ? "ml-auto items-end" : "items-start"
              )}
            >
              <div className="flex items-center gap-2 mb-1 px-1">
                 {isAI && <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-1"><Bot className="w-3 h-3"/> AI Bot</span>}
                 {isHuman && <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1"><UserCheck className="w-3 h-3"/> Staff Reply</span>}
                 {isCustomer && <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{customerName}</span>}
              </div>
              
              <div className={cn(
                "px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-lg",
                isAI && "bg-zinc-800 text-zinc-100 rounded-tl-none border border-zinc-700",
                isCustomer && "bg-indigo-600 text-white rounded-tr-none shadow-indigo-600/20",
                isHuman && "bg-emerald-700 text-white rounded-tr-none shadow-emerald-700/20"
              )}>
                {getMessageText(msg)}
              </div>
              
              <span className="text-[9px] text-zinc-600 mt-1 font-bold">
                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          )
        })}
      </div>

      <div className="p-4 bg-zinc-900/80 border-t border-zinc-800 backdrop-blur-md">
         <div className="relative">
            <input 
                type="text" 
                placeholder="Take over conversation..." 
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-4 pr-12 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-indigo-400 hover:text-indigo-300 transition-colors">
                <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
            </button>
         </div>
      </div>
    </div>
  )
}
