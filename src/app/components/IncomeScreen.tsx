import { motion } from "motion/react";
import { DollarSign, Plus, TrendingUp, Calendar } from "lucide-react";

export function IncomeScreen() {
  const income = [
    { name: "Salary", amount: 4500, frequency: "Monthly", nextDate: "May 15", type: "Recurring" },
    { name: "Freelance Project", amount: 850, frequency: "One-time", nextDate: "May 10", type: "One-time" },
    { name: "Side Business", amount: 320, frequency: "Monthly", nextDate: "May 20", type: "Recurring" },
  ];

  const monthlyRecurring = income
    .filter((i) => i.type === "Recurring")
    .reduce((sum, i) => sum + i.amount, 0);

  const totalThisMonth = income.reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white">Income</h1>
          <p className="text-slate-400 mt-1">Track your earnings</p>
        </div>
        <button className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-emerald-600 to-green-600 rounded-3xl p-6 shadow-2xl shadow-emerald-500/30 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-emerald-100 mb-4">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold">May Income</span>
          </div>
          <div className="flex justify-between items-end mb-4">
            <div>
              <div className="text-emerald-100 text-sm mb-1">Total This Month</div>
              <div className="text-6xl font-black text-white">${totalThisMonth.toLocaleString()}</div>
            </div>
            <div className="text-right">
              <div className="text-emerald-100 text-sm mb-1">Monthly Recurring</div>
              <div className="text-3xl font-black text-white">${monthlyRecurring.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="space-y-3">
        <div className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Income Sources</div>
        {income.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">{item.name}</div>
                  <div className="text-sm text-slate-400">{item.frequency}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-bold text-lg">${item.amount.toLocaleString()}</div>
                <div className="text-xs text-emerald-400">{item.type}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Calendar className="w-4 h-4" />
              Next: {item.nextDate}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6"
      >
        <h3 className="text-white font-semibold mb-4">Income History</h3>
        <div className="space-y-3">
          {[
            { month: "April 2026", amount: 4820, change: 6.7 },
            { month: "March 2026", amount: 4500, change: -2.1 },
            { month: "February 2026", amount: 4597, change: 4.3 },
            { month: "January 2026", amount: 4408, change: 1.2 },
          ].map((month) => (
            <div key={month.month} className="flex items-center justify-between">
              <span className="text-slate-300">{month.month}</span>
              <div className="flex items-center gap-3">
                <span className="text-white font-semibold">${month.amount.toLocaleString()}</span>
                <span
                  className={`text-sm ${
                    month.change > 0 ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {month.change > 0 ? "+" : ""}
                  {month.change}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
