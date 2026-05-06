import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { TrendingUp, Target, Zap } from "lucide-react";

export function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        <div className="mb-8 relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 blur-3xl"
          />
          <div className="relative bg-gradient-to-br from-emerald-400 to-blue-500 w-24 h-24 rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-emerald-500/50">
            <Zap className="w-12 h-12 text-white" strokeWidth={2.5} />
          </div>
        </div>

        <h1 className="text-6xl font-black text-white mb-4 tracking-tight">
          GoalRush
        </h1>
        <p className="text-xl text-slate-300 mb-12">
          Money management that feels rewarding instead of stressful
        </p>

        <div className="space-y-4 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 text-left bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4"
          >
            <div className="bg-emerald-500/20 rounded-xl p-2">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="text-slate-200">Track bills & crush debt</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 text-left bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4"
          >
            <div className="bg-blue-500/20 rounded-xl p-2">
              <Target className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-slate-200">Build savings together</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 text-left bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4"
          >
            <div className="bg-purple-500/20 rounded-xl p-2">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-slate-200">Budget smarter, stress less</span>
          </motion.div>
        </div>

        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/signup")}
            className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 transition-all"
          >
            Get Started
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/login")}
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white py-4 rounded-2xl font-semibold hover:bg-white/15 transition-all"
          >
            Log In
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
