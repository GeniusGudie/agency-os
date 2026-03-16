"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  MessageSquare, 
  Users, 
  AlertCircle, 
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Workflow
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navigation = [
  { name: "Overview", href: "/", icon: BarChart3 },
  { name: "Conversations", href: "/conversations", icon: MessageSquare },
  { name: "Lead Pipeline", href: "/leads", icon: Users },
  { name: "System Errors", href: "/errors", icon: AlertCircle },
  { name: "Workflows", href: "/workflows", icon: Workflow },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-full bg-surface border-r border-border transition-all duration-300 z-50 flex flex-col",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="p-6 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-black text-xl">
              A
            </div>
            <span className="font-black tracking-tighter text-xl">Agency-OS</span>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 hover:bg-zinc-800 rounded-lg transition-colors border border-border"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                isActive 
                  ? "bg-accent/10 text-accent ring-1 ring-accent/20" 
                  : "text-zinc-500 hover:text-white hover:bg-zinc-800"
              )}
            >
              <item.icon size={20} className={cn(
                "transition-colors",
                isActive ? "text-accent" : "text-zinc-500 group-hover:text-white"
              )} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all group">
          <Settings size={20} />
          {!collapsed && <span>Settings</span>}
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all group">
          <LogOut size={20} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
