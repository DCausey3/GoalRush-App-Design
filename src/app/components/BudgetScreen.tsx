import { motion } from "motion/react";
import { TrendingUp, Plus } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

const CATEGORY_COLORS: Record<string, string> = {
  Groceries: "#10b981",
  Transport: "#3b82f6",
  Entertainment: "#ef4444",
  Shopping: "#a855f7",
  "Dining Out": "#f59e0b",
  Healthcare: "#06b6d4",
  Housing: "#6366f1",
  Other: "#64748b",
};

export function BudgetScreen() {
  const [budgets, setBudgets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBudgets() {
      const now = new Date();
      const { data, error } = await supabase
        .from("budgets")
        .select("*")
        .eq("month", now.getMonth() + 1)
        .eq("year", now.getFullYear());
      if (!error) setBudgets(data ?? []);
      setLoading(false);
    }
    fetchBudgets();
  }, []);

  const totalSpent = budgets.reduce((sum, b) => sum + b.current_spend, 0);
  const totalBudget = budgets.reduce((sum, b) => sum + b.monthly_limit, 0);

  const pieData = budgets.map(b => ({
    name: b.category,
    value: b.current_spend,
    color: CATEGORY_COLORS[b.category] ?? "#64748b",
  }));

  const getStatus = (spent: number, limit: number) => {
    const pct = (spent / limit) * 100;
    if (pct > 100) return "over";
    if (pct >= 80) return "warning";
    return "healthy";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400 animate-pulse">Loading budget...</div>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white">Budget</h1>
          <p className="text-slate-400 mt-1">Track your spending</p>
        </div>
        <button className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-6 shadow-2xl shadow-purple-500/30"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-purple-100 text-sm mb-1">Total Budget</div>
            <div className="text-5xl font-black text-white">${totalBudget.toFixed(2)}</div>
          </div>
          <div className="text-right">
            <div className="text-purple-100 text-sm mb-1">Spent</div>
            <div className="text-3xl font-black text-white">${totalSpent.toFixed(2)}</div>
          </div>
        </div>
        <div className="bg-white/20 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((totalSpent / totalBudget) * 100, 100)}%` }}
            transition={{ duration: 1 }}
            className="bg-white h-full rounded-full"
          />
        </div>
        <div className="mt-2 text-white font-semibold">${(totalBudget - totalSpent).toFixed(2)} remaining</div>
      </motion.div>

      {budgets.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <p className="text-lg font-semibold">No budget categories yet</p>
          <p className="text-sm">Tap + to add your first category</p>
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6"
          >
            <h3 className="text-white font-semibold mb-4">Spending Breakdown</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <div className="space-y-3">
            <div className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Categories</div>
            {budgets.map((b, index) => {
              const status = getStatus(b.current_spend, b.monthly_limit);
              const percentage = (b.current_spend / b.monthly_limit) * 100;
              const color = CATEGORY_COLORS[b.category] ?? "#64748b";
              return (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`backdrop-blur-sm border rounded-2xl p-4 ${
                    status === "over" ? "bg-red-500/10 border-red-500/30"
                    : status === "warning" ? "bg-yellow-500/10 border-yellow-500/30"
                    : "bg-white/5 border-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                      <span className="text-white font-semibold">{b.category}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">${b.current_spend} / ${b.monthly_limit}</div>
                      <div className={`text-xs ${status === "over" ? "text-red-400" : status === "warning" ? "text-yellow-400" : "text-emerald-400"}`}>
                        {status === "over" ? "Over budget" : status === "warning" ? "Close to limit" : `$${(b.monthly_limit - b.current_spend).toFixed(2)} left`}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${Math.min(percentage, 100)}%`, backgroundColor: color }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}