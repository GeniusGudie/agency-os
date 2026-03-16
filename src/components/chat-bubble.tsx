import { cn } from "@/lib/utils"

interface ChatBubbleProps {
  message: string
  senderType: 'ai' | 'customer' | 'human' | 'lead'
  timestamp: string
  customerName?: string
}

export function ChatBubble({ message, senderType, timestamp, customerName }: ChatBubbleProps) {
  const isAI = senderType === 'ai'
  const isCustomer = senderType === 'customer' || senderType === 'lead'
  const isHuman = senderType === 'human'

  return (
    <div className={cn(
      "flex w-full mb-4",
      isAI ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm",
        isAI && "bg-zinc-800 text-zinc-100 rounded-bl-none",
        isCustomer && "bg-indigo-600 text-white rounded-br-none",
        isHuman && "bg-emerald-700 text-white rounded-br-none"
      )}>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">
              {isAI && "AI Bot"}
              {isCustomer && (customerName || "Customer")}
              {isHuman && "Staff Reply"}
            </span>
            <span className="text-[10px] opacity-50">
              {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <p className="leading-relaxed whitespace-pre-wrap">{message}</p>
        </div>
      </div>
    </div>
  )
}
