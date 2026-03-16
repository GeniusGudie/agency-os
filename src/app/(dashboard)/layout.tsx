"use client";

import { Sidebar } from "@/components/sidebar";
import { OrganizationSwitcher } from "@/components/organization-switcher";
import { User, Bell, BarChart3, MessageSquare, Users, AlertCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const mobileNavigation = [
  { name: "Overview", href: "/", icon: BarChart3 },
  { name: "Chat", href: "/conversations", icon: MessageSquare },
  { name: "Leads", href: "/leads", icon: Users },
  { name: "Errors", href: "/errors", icon: AlertCircle },
];

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
        {/* Header */}
        <header className="h-20 border-b border-border bg-background/50 backdrop-blur-md sticky top-0 z-40 px-6 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-6">
            <div className="md:hidden w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-black text-xl">
              A
            </div>
            <h2 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] hidden sm:block">Infrastructure Monitoring</h2>
            <h2 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] sm:hidden">Monitor</h2>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <button className="p-2 hover:bg-zinc-900 rounded-xl transition-colors text-zinc-500 hidden sm:flex">
              <Bell size={18} />
            </button>
            <OrganizationSwitcher />
            <div className="h-10 w-10 rounded-xl bg-zinc-900 border border-border flex items-center justify-center text-zinc-400 hidden sm:flex">
               <User size={18} />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 md:p-8 lg:p-12">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-surface/90 backdrop-blur-xl border-t border-border flex items-center justify-around md:hidden z-50 px-4 pb-safe shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
        {mobileNavigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1.5 transition-all p-2 rounded-xl",
                isActive ? "text-accent" : "text-zinc-600"
              )}
            >
              <item.icon size={22} className={cn(
                "transition-all",
                isActive ? "scale-110" : ""
              )} />
              <span className="text-[8px] font-black uppercase tracking-widest">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
