import { motion } from "motion/react";
import { TrendingDown, CreditCard, Plus, Zap, Trophy } from "lucide-react";
import { useState } from "react";

export function DebtScreen() {
  const [strategy, setStrategy] = useState<"snowball" | "avalanche">("snowball");

  const debts = [
    { name: "Credit Card 1", balance: 3200, rate: 18.5, minPayment: 95, type: "Credit Card" },
    { name: "Credit Card 2", balance: 1850, rate: 22.9, minPayment: 65, type: "Credit Card" },
    { name: "Car Loan", balance: 5400, rate: 5.2, minPayment: 280, type: "Auto" },
    { name: "Student Loan", balance: 2000, rate: 4.5, minPayment: 120, type: "Student" },
  ];

  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalPaid = 20000;
  const totalOriginal = totalDebt + totalPaid;
  const progress = (totalPaid / totalOriginal) * 100;

  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white">Debt Payoff</h1>
          <p className="text-slate-400 mt-1">Become debt-free</p>
        </div>
        <button className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/30">
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-red-600 to-orange-600 rounded-3xl p-6 shadow-2xl shadow-red-500/30 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-red-100 mb-4">
            <TrendingDown className="w-5 h-5" />
            <span className="font-semibold">Total Debt Remaining</span>
          </div>
          <div className="text-6xl font-black text-white mb-2">${totalDebt.toLocaleString()}</div>
          <div className="text-red-100 mb-4">Debt-free by December 2026</div>
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1 }}
              className="bg-gradient-to-r from-white to-yellow-200 h-full rounded-full"
            />
          </div>
          <div className="mt-2 text-white font-semibold">
            {progress.toFixed(0)}% paid off • ${totalPaid.toLocaleString()} conquered!
          </div>
        </div>
      </motion.div>

      <div className="flex gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-1">
        <button
          onClick={() => setStrategy("snowball")}
          className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
            strategy === "snowball"
              ? "bg-white/10 text-white"
              : "text-slate-400"
          }`}
        >
          ❄️ Snowball
        </button>
        <button
          onClick={() => setStrategy("avalanche")}
          className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
            strategy === "avalanche"
              ? "bg-white/10 text-white"
              : "text-slate-400"
          }`}
        >
          ⛰️ Avalanche
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-sm border border-yellow-500/30 rounded-3xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-yellow-400" />
          <h3 className="text-white font-semibold">
            {strategy === "snowball" ? "Snowball Method" : "Avalanche Method"}
          </h3>
        </div>
        <p className="text-slate-300 text-sm">
          {strategy === "snowball"
            ? "Pay off smallest balances first for quick wins and motivation."
            : "Target highest interest rates first to save more money over time."}
        </p>
      </motion.div>

      <div className="space-y-3">
        <div className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Payoff Order</div>
        {debts
          .sort((a, b) =>
            strategy === "snowball" ? a.balance - b.balance : b.rate - a.rate
          )
          .map((debt, index) => {
            const monthsToPayoff = Math.ceil(debt.balance / debt.minPayment);
            const isNext = index === 0;

            return (
              <motion.div
                key={debt.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`backdrop-blur-sm border rounded-2xl p-4 ${
                  isNext
                    ? "bg-orange-500/20 border-orange-500/50 shadow-lg shadow-orange-500/20"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${
                      isNext ? "bg-gradient-to-br from-orange-500 to-red-500" : "bg-white/10"
                    } flex items-center justify-center`}>
                      {isNext ? (
                        <Zap className="w-6 h-6 text-white" />
                      ) : (
                        <CreditCard className="w-6 h-6 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <div className="text-white font-semibold flex items-center gap-2">
                        {debt.name}
                        {isNext && <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">FOCUS</span>}
                      </div>
                      <div className="text-sm text-slate-400">{debt.type} • {debt.rate}% APR</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-lg">${debt.balance.toLocaleString()}</div>
                    <div className="text-xs text-slate-400">${debt.minPayment}/mo</div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-sm text-slate-400">Estimated payoff</span>
                  <span className="text-white font-semibold">{monthsToPayoff} months</span>
                </div>
              </motion.div>
            );
          })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-emerald-600/20 to-blue-600/20 backdrop-blur-sm border border-emerald-500/30 rounded-3xl p-6"
      >
        <div className="flex items-center gap-2 text-emerald-300 mb-4">
          <Trophy className="w-6 h-6" />
          <span className="font-semibold">Achievements</span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xl">🎉</div>
            <div className="flex-1">
              <div className="text-white font-semibold">First debt paid off!</div>
              <div className="text-sm text-slate-400">Personal loan - Feb 2026</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl">💪</div>
            <div className="flex-1">
              <div className="text-white font-semibold">$20,000 debt crushed</div>
              <div className="text-sm text-slate-400">More than halfway there!</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
