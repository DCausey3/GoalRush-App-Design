import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Mail, Lock, User } from "lucide-react";

export function SignupScreen() {
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col px-6 py-12">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full mx-auto"
      >
        <h1 className="text-5xl font-black text-white mb-3">Start your journey</h1>
        <p className="text-slate-400 mb-8">Create your account and take control</p>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-slate-300 mb-2 font-medium">Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Your name"
                className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 mb-2 font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 mb-2 font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 transition-all mt-6"
          >
            Create Account
          </motion.button>
        </form>

        <p className="text-center text-slate-400 mt-8">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            Log in
          </button>
        </p>
      </motion.div>
    </div>
  );
}
