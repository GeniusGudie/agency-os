import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";

interface ChatBubbleProps {
  message: string;
  sender_type: 'ai' | 'customer' | 'human';
  timestamp: string;
}

export function ChatBubble({ message, sender_type, timestamp }: ChatBubbleProps) {
  const isAI = sender_type === 'ai';
  const isHuman = sender_type === 'human';

  return (
    <div className={cn(
      "flex items-end gap-3",
      isAI ? "justify-start" : "justify-end flex-row-reverse"
    )}>
      <div className={cn(
        "w-8 h-8 rounded-lg flex items-center justify-center border shrink-0",
        isAI ? "bg-zinc-900 border-zinc-800 text-zinc-500" : "bg-accent/10 border-accent/20 text-accent"
      )}>
        {isAI ? <Bot size={14} /> : <User size={14} />}
      </div>
      <div className={cn(
        "max-w-[80%] space-y-1",
        isAI ? "items-start" : "items-end text-right"
      )}>
        <div className={cn(
          "p-4 rounded-2xl text-[13px] leading-relaxed font-medium shadow-sm",
          isAI ? "bg-zinc-800 text-zinc-100 rounded-bl-sm" : 
          isHuman ? "bg-emerald-600 text-white rounded-br-sm shadow-[0_4px_12px_rgba(16,185,129,0.2)]" :
          "bg-accent text-white rounded-br-sm shadow-[0_4px_12px_rgba(99,102,241,0.2)]"
        )}>
          {message}
        </div>
        <div className="text-[9px] font-black text-zinc-700 uppercase tracking-widest px-1">
          {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}
