"use client";

import { Sidebar } from "./sidebar";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className={cn(
        "flex-1 transition-all duration-300",
        "pl-64 md:pl-64", // This needs to be dynamic based on sidebar state if we want perfect alignment
        // But for now, let's just use a simpler padding that matches the sidebar width
      )}>
        {/* We'll handle the dynamic padding via margin in the actual implementation or CSS */}
        <div className="p-8 lg:p-12 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
      
      {/* Mobile Bottom Bar (Hidden on desktop) */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-border flex items-center justify-around md:hidden z-50 px-4">
        {/* Add mobile navigation items here */}
      </nav>
    </div>
  );
}
