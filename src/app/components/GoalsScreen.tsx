import { motion } from "motion/react";
import { Target, Plus, Calendar, TrendingUp } from "lucide-react";
import { ProgressRing } from "./ProgressRing";

export function GoalsScreen() {
  const goals = [
    {
      name: "Emergency Fund",
      current: 7500,
      target: 10000,
      color: "from-emerald-500 to-green-500",
      icon: "💰",
      targetDate: "Dec 2026",
      monthlyContribution: 500,
    },
    {
      name: "Hawaii Vacation",
      current: 2040,
      target: 3000,
      color: "from-blue-500 to-cyan-500",
      icon: "🏖️",
      targetDate: "Jul 2026",
      monthlyContribution: 200,
    },
    {
      name: "New Car",
      current: 4500,
      target: 15000,
      color: "from-purple-500 to-pink-500",
      icon: "🚗",
      targetDate: "Jun 2027",
      monthlyContribution: 400,
    },
    {
      name: "Home Down Payment",
      current: 10000,
      target: 50000,
      color: "from-yellow-500 to-orange-500",
      icon: "🏠",
      targetDate: "Jan 2029",
      monthlyContribution: 800,
    },
  ];

  const totalSaved = goals.reduce((sum, goal) => sum + goal.current, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);

  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white">Goals</h1>
          <p className="text-slate-400 mt-1">Reach your dreams</p>
        </div>
        <button className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-3xl p-6 shadow-2xl shadow-yellow-500/30"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-yellow-100 text-sm mb-1">Total Saved</div>
            <div className="text-5xl font-black text-white">${totalSaved.toLocaleString()}</div>
          </div>
          <div className="text-right">
            <div className="text-yellow-100 text-sm mb-1">Target</div>
            <div className="text-3xl font-black text-white">${totalTarget.toLocaleString()}</div>
          </div>
        </div>
        <div className="bg-white/20 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(totalSaved / totalTarget) * 100}%` }}
            transition={{ duration: 1 }}
            className="bg-white h-full rounded-full"
          />
        </div>
        <div className="mt-2 text-white font-semibold flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          {((totalSaved / totalTarget) * 100).toFixed(0)}% of total goals
        </div>
      </motion.div>

      <div className="space-y-4">
        {goals.map((goal, index) => {
          const progress = (goal.current / goal.target) * 100;
          const remaining = goal.target - goal.current;
          const monthsLeft = Math.ceil(remaining / goal.monthlyContribution);

          return (
            <motion.div
              key={goal.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${goal.color} flex items-center justify-center text-3xl shadow-lg`}>
                  {goal.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-xl mb-1">{goal.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Calendar className="w-4 h-4" />
                    Target: {goal.targetDate}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-white">{progress.toFixed(0)}%</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-white font-semibold">
                    ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                  </span>
                </div>
                <div className="bg-white/10 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`bg-gradient-to-r ${goal.color} h-full rounded-full`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <div className="text-xs text-slate-500">Monthly</div>
                  <div className="text-white font-semibold">${goal.monthlyContribution}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Remaining</div>
                  <div className="text-white font-semibold">${remaining.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Months left</div>
                  <div className="text-white font-semibold">{monthsLeft}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-emerald-600/20 to-blue-600/20 backdrop-blur-sm border border-emerald-500/30 rounded-3xl p-6"
      >
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-400" />
          Milestone Progress
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">✓</div>
            <div className="flex-1">
              <div className="text-white font-semibold">First $1,000 saved</div>
              <div className="text-sm text-slate-400">Completed Jan 2025</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">✓</div>
            <div className="flex-1">
              <div className="text-white font-semibold">$10,000 net worth</div>
              <div className="text-sm text-slate-400">Completed Mar 2026</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-blue-400 flex items-center justify-center text-blue-400 font-bold">3</div>
            <div className="flex-1">
              <div className="text-white font-semibold">$25,000 saved</div>
              <div className="text-sm text-blue-400">In progress - 96% there!</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
