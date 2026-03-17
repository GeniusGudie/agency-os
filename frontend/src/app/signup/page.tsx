"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { UserPlus, ShieldCheck, Mail, Lock, Building } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgName, setOrgName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1. Sign up user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          org_name: orgName,
        }
      }
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (authData.user) {
        // 2. Create organization
        const { error: orgError } = await supabase.from('organizations').insert({
            name: orgName,
            // owner_id: authData.user.id // Handle owner relationship if schema allows
        });

        if (orgError) {
            console.error("Org creation error:", orgError);
        }
    }

    router.push("/login?message=Check your email to confirm registration");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-white font-black text-3xl shadow-[0_0_50px_rgba(99,102,241,0.2)]">
            A
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-white">Join the Infrastructure</h1>
            <p className="text-zinc-500 text-sm mt-2 font-medium uppercase tracking-widest text-[10px]">Scale your dealership automation</p>
          </div>
        </div>

        <div className="glass-card p-8 space-y-6 bg-zinc-900/50 backdrop-blur-2xl border-zinc-800/50 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
          
          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <Building size={12} />
                Dealership Name
              </label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="Abuja Luxury Motors"
                required
                className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-zinc-700"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <Mail size={12} />
                Work Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@dealership.com"
                required
                className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-zinc-700"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <Lock size={12} />
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-zinc-700"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest">
                <ShieldCheck size={14} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full bg-accent hover:bg-accent-hover text-white font-black py-4 rounded-xl transition-all shadow-xl flex items-center justify-center gap-3 active:scale-[0.98]",
                loading && "opacity-50 cursor-not-allowed"
              )}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus size={18} />
                  <span>Request Infrastructure Access</span>
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/login" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 hover:text-accent transition-colors">
              Already have infrastructure? <span className="text-accent underline">Sign In</span>
            </Link>
          </div>
        </div>
        
        <div className="flex justify-center gap-8 opacity-20 filter grayscale">
            <div className="h-6 w-20 bg-zinc-500 rounded-full" />
            <div className="h-6 w-24 bg-zinc-500 rounded-full" />
            <div className="h-6 w-16 bg-zinc-500 rounded-full" />
        </div>
      </div>
    </div>
  );
}
