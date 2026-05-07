import { motion } from "motion/react";
import { Target, Plus, Calendar, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

export function GoalsScreen() {
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGoals() {
      const { data, error } = await supabase.from("savings_goals").select("*").order("created_at");
      if (!error) setGoals(data ?? []);
      setLoading(false);
    }
    fetchGoals();
  }, []);

  const totalSaved = goals.reduce((sum, g) => sum + g.current_amount, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.target_amount, 0);

  const GOAL_COLORS = [
    "from-emerald-500 to-green-500",
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-yellow-500 to-orange-500",
    "from-red-500 to-rose-500",
    "from-indigo-500 to-violet-500",
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400 animate-pulse">Loading goals...</div>
      </div>
    );
  }

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
            animate={{ width: `${totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0}%` }}
            transition={{ duration: 1 }}
            className="bg-white h-full rounded-full"
          />
        </div>
        <div className="mt-2 text-white font-semibold flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          {totalTarget > 0 ? ((totalSaved / totalTarget) * 100).toFixed(0) : 0}% of total goals
        </div>
      </motion.div>

      {goals.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <Target className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-lg font-semibold">No goals yet</p>
          <p className="text-sm">Tap + to create your first savings goal</p>
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map((goal, index) => {
            const progress = goal.target_amount > 0 ? (goal.current_amount / goal.target_amount) * 100 : 0;
            const remaining = goal.target_amount - goal.current_amount;
            const color = GOAL_COLORS[index % GOAL_COLORS.length];

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-3xl shadow-lg`}>
                    {goal.emoji ?? "🎯"}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-xl mb-1">{goal.name}</h3>
                    {goal.target_date && (
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Calendar className="w-4 h-4" />
                        Target: {new Date(goal.target_date).toLocaleDateString("default", { month: "short", year: "numeric" })}
                      </div>
                    )}
                  </div>
                  <div className="text-3xl font-black text-white">{progress.toFixed(0)}%</div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-white font-semibold">
                      ${goal.current_amount.toLocaleString()} / ${goal.target_amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-white/10 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(progress, 100)}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`bg-gradient-to-r ${color} h-full rounded-full`}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <div className="text-xs text-slate-500">Remaining</div>
                    <div className="text-white font-semibold">${remaining.toLocaleString()}</div>
                  </div>
                  {goal.target_date && (
                    <div>
                      <div className="text-xs text-slate-500">Due</div>
                      <div className="text-white font-semibold">
                        {new Date(goal.target_date).toLocaleDateString("default", { month: "short", year: "numeric" })}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}