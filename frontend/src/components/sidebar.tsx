"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { 
  BarChart3, 
  MessageSquare, 
  Users, 
  AlertCircle, 
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Workflow,
  Building2,
  Sun,
  Moon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navigation = [
  { name: "Overview", href: "/", icon: BarChart3 },
  { name: "Live Chat", href: "/conversations", icon: MessageSquare },
  { name: "Lead Stream", href: "/leads", icon: Users },
  { name: "Dealerships", href: "/clients", icon: Building2 },
  { name: "Diagnostics", href: "/errors", icon: AlertCircle },
  { name: "Automations", href: "/workflows", icon: Workflow },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    document.cookie = "org_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
    router.push("/login");
  };

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      html.classList.add('light');
    } else {
      html.classList.remove('light');
      html.classList.add('dark');
    }
  };

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
        <button 
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all group"
        >
          <Sun size={20} className="hidden dark:block" />
          <Moon size={20} className="block dark:hidden" />
          {!collapsed && <span>Switch Theme</span>}
        </button>
        <button 
          onClick={() => alert("Settings panel coming soon in v16.2")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all group"
        >
          <Settings size={20} />
          {!collapsed && <span>Settings</span>}
        </button>
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all group"
        >
          <LogOut size={20} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
