'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'
import { ChatBubble } from './chat-bubble'
import { Send, Loader2 } from 'lucide-react'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'

interface Message {
  id: string | number
  message: any // jsonb in DB
  sender_type: string
  created_at: string
  org_id: string
  session_id: string
}

interface ConversationViewerProps {
  sessionId: string
  orgId: string
  initialMessages: Message[]
  customerName: string
}

export function ConversationViewer({ sessionId, orgId, initialMessages, customerName }: ConversationViewerProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    // Scroll to bottom on load and new messages
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    // Subscribe to real-time updates for this session
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
          const newMsg = payload.new as Message
          setMessages((current) => [...current, newMsg])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [sessionId, supabase])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || isSending) return

    setIsSending(true)
    try {
      // Per PRD: "insert one row with sender_type = 'human' when staff sends a manual message"
      const { error } = await supabase
        .from('agency_chat_history')
        .insert({
          org_id: orgId,
          session_id: sessionId,
          message: newMessage, // We'll insert it as a string, Supabase handles JSONB if it's a string too or we can objectify it
          sender_type: 'human',
        })

      if (error) throw error
      setNewMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsSending(false)
    }
  }

  // Support for rendering jsonb message content
  const renderMessageContent = (msg: any) => {
      if (typeof msg === 'string') return msg
      if (typeof msg === 'object' && msg !== null) {
          // n8n might send { text: "...", ... } or just a string
          return msg.text || JSON.stringify(msg)
      }
      return String(msg)
  }

  return (
    <div className="flex flex-col h-full bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
      <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white">
            {customerName.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-zinc-100">{customerName}</h3>
            <span className="text-xs text-emerald-500 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Real-time connected
            </span>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-zinc-800"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500 space-y-2">
            <p className="text-sm italic">Starting conversation...</p>
          </div>
        )}
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={renderMessageContent(msg.message)}
            senderType={msg.sender_type as any}
            timestamp={msg.created_at}
            customerName={customerName}
          />
        ))}
      </div>

      <div className="p-4 bg-zinc-900/50 border-t border-zinc-800">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a manual reply..."
            className="bg-zinc-950 border-zinc-800 focus:ring-indigo-500"
            disabled={isSending}
          />
          <button
            type="submit"
            disabled={isSending || !newMessage.trim()}
            className="px-4 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </form>
        <p className="mt-2 text-[10px] text-zinc-500 text-center uppercase tracking-tighter font-semibold">
          AI bot will remain active unless you choose to override
        </p>
      </div>
    </div>
  )
}
