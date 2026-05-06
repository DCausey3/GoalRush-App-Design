import { motion } from "motion/react";
import { Wallet, TrendingUp, TrendingDown, Plus } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

export function BudgetScreen() {
  const categories = [
    { name: "Groceries", spent: 340, budget: 500, color: "#10b981", status: "healthy" },
    { name: "Transport", spent: 120, budget: 200, color: "#3b82f6", status: "healthy" },
    { name: "Entertainment", spent: 180, budget: 150, color: "#ef4444", status: "over" },
    { name: "Shopping", spent: 90, budget: 300, color: "#a855f7", status: "healthy" },
    { name: "Dining Out", spent: 280, budget: 250, color: "#f59e0b", status: "warning" },
    { name: "Healthcare", spent: 85, budget: 200, color: "#06b6d4", status: "healthy" },
  ];

  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);

  const pieData = categories.map(cat => ({
    name: cat.name,
    value: cat.spent,
    color: cat.color,
  }));

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
            <div className="text-5xl font-black text-white">${totalBudget}</div>
          </div>
          <div className="text-right">
            <div className="text-purple-100 text-sm mb-1">Spent</div>
            <div className="text-3xl font-black text-white">${totalSpent}</div>
          </div>
        </div>
        <div className="bg-white/20 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(totalSpent / totalBudget) * 100}%` }}
            transition={{ duration: 1 }}
            className="bg-white h-full rounded-full"
          />
        </div>
        <div className="mt-2 text-white font-semibold">
          ${totalBudget - totalSpent} remaining
        </div>
      </motion.div>

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
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
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
        {categories.map((category, index) => {
          const percentage = (category.spent / category.budget) * 100;
          const isOver = category.status === "over";
          const isWarning = category.status === "warning";

          return (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`backdrop-blur-sm border rounded-2xl p-4 ${
                isOver
                  ? "bg-red-500/10 border-red-500/30"
                  : isWarning
                  ? "bg-yellow-500/10 border-yellow-500/30"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-white font-semibold">{category.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">
                    ${category.spent} / ${category.budget}
                  </div>
                  <div
                    className={`text-xs ${
                      isOver ? "text-red-400" : isWarning ? "text-yellow-400" : "text-emerald-400"
                    }`}
                  >
                    {isOver ? "Over budget" : isWarning ? "Close to limit" : `$${category.budget - category.spent} left`}
                  </div>
                </div>
              </div>
              <div className="bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(percentage, 100)}%`,
                    backgroundColor: category.color,
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6"
      >
        <h3 className="text-white font-semibold mb-4">Weekly Trends</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Week 1</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">$285</span>
              <TrendingDown className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Week 2</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">$310</span>
              <TrendingUp className="w-4 h-4 text-red-400" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Week 3</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">$265</span>
              <TrendingDown className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Week 4</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">$235</span>
              <TrendingDown className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
