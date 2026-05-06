import { motion } from "motion/react";
import { Sparkles, TrendingUp, Target, Flame, Users } from "lucide-react";
import { CircularProgress } from "./CircularProgress";
import { ProgressRing } from "./ProgressRing";

export function HomeScreen() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-black text-white">Hey, Alex 👋</h1>
          <p className="text-slate-400 mt-1">Let's crush your goals today</p>
        </div>
        <button className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <Sparkles className="w-6 h-6 text-white" />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-6 shadow-2xl shadow-blue-500/30 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-blue-100 mb-4">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold">May Overview</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-blue-100 text-sm mb-1">Bills Due</div>
              <div className="text-3xl font-black text-white">$2,340</div>
            </div>
            <div>
              <div className="text-blue-100 text-sm mb-1">Bills Paid</div>
              <div className="text-3xl font-black text-white">$1,890</div>
            </div>
          </div>
          <CircularProgress value={81} label="Remaining" amount="$450" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-red-600 to-orange-600 rounded-3xl p-6 shadow-2xl shadow-red-500/30 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-red-100 mb-4">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold">Debt Freedom</span>
          </div>
          <div className="mb-4">
            <div className="text-red-100 text-sm mb-1">Total Remaining</div>
            <div className="text-5xl font-black text-white mb-2">$12,450</div>
            <div className="text-red-100 text-sm">Debt-free by December 2026</div>
          </div>
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "62%" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="bg-gradient-to-r from-white to-yellow-200 h-full rounded-full"
            />
          </div>
          <div className="mt-2 text-sm text-white font-semibold">62% paid off</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6"
      >
        <div className="flex items-center gap-2 text-slate-300 mb-4">
          <Target className="w-5 h-5" />
          <span className="font-semibold">Budget Snapshot</span>
        </div>
        <div className="space-y-3">
          {[
            { name: "Groceries", spent: 340, budget: 500, color: "bg-emerald-500" },
            { name: "Transport", spent: 120, budget: 200, color: "bg-blue-500" },
            { name: "Entertainment", spent: 180, budget: 150, color: "bg-red-500" },
            { name: "Shopping", spent: 90, budget: 300, color: "bg-purple-500" },
          ].map((item) => (
            <div key={item.name}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">{item.name}</span>
                <span className="text-white font-semibold">
                  ${item.spent} / ${item.budget}
                </span>
              </div>
              <div className="bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className={`${item.color} h-full rounded-full transition-all`}
                  style={{ width: `${(item.spent / item.budget) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6"
      >
        <div className="flex items-center gap-2 text-slate-300 mb-6">
          <Target className="w-5 h-5" />
          <span className="font-semibold">Savings Goals</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "Emergency Fund", progress: 75, target: 10000, color: "text-emerald-400" },
            { name: "Vacation", progress: 45, target: 3000, color: "text-blue-400" },
            { name: "New Car", progress: 30, target: 15000, color: "text-purple-400" },
            { name: "Home Down Payment", progress: 20, target: 50000, color: "text-yellow-400" },
          ].map((goal) => (
            <div key={goal.name} className="text-center">
              <ProgressRing value={goal.progress} size={80} />
              <div className={`font-semibold mt-2 ${goal.color}`}>{goal.name}</div>
              <div className="text-xs text-slate-500">${(goal.target * goal.progress / 100).toFixed(0)} / ${goal.target}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-6"
      >
        <div className="flex items-center gap-2 text-purple-300 mb-4">
          <Flame className="w-5 h-5" />
          <span className="font-semibold">You're on fire! 🔥</span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="flex-1">
              <div className="text-white font-semibold">3 Month Streak!</div>
              <div className="text-sm text-slate-400">All bills paid on time</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="text-white font-semibold">+$250 vs last month</div>
              <div className="text-sm text-slate-400">Savings increased</div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6"
      >
        <div className="flex items-center gap-2 text-slate-300 mb-4">
          <Users className="w-5 h-5" />
          <span className="font-semibold">Family Goals</span>
        </div>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="text-white font-semibold">Hawaii Vacation</div>
              <div className="text-blue-400 font-bold">68%</div>
            </div>
            <div className="bg-white/10 rounded-full h-2 overflow-hidden mb-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full" style={{ width: "68%" }} />
            </div>
            <div className="text-xs text-slate-400">$2,040 / $3,000 • July 2026</div>
          </div>
          <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="text-white font-semibold">Emergency Fund</div>
              <div className="text-emerald-400 font-bold">75%</div>
            </div>
            <div className="bg-white/10 rounded-full h-2 overflow-hidden mb-2">
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 h-full rounded-full" style={{ width: "75%" }} />
            </div>
            <div className="text-xs text-slate-400">$7,500 / $10,000</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
