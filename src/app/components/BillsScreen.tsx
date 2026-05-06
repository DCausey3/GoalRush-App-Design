import { motion } from "motion/react";
import { Receipt, Calendar, CheckCircle2, AlertCircle, Plus, Zap } from "lucide-react";
import { useState } from "react";

export function BillsScreen() {
  const [view, setView] = useState<"list" | "calendar">("list");

  const bills = [
    { name: "Rent", amount: 1200, due: "May 1", status: "paid", category: "Housing", autopay: true },
    { name: "Electric", amount: 85, due: "May 5", status: "paid", category: "Utilities", autopay: true },
    { name: "Internet", amount: 60, due: "May 8", status: "upcoming", category: "Utilities", autopay: false },
    { name: "Phone", amount: 75, due: "May 10", status: "upcoming", category: "Utilities", autopay: true },
    { name: "Car Insurance", amount: 120, due: "May 15", status: "upcoming", category: "Insurance", autopay: false },
    { name: "Gym", amount: 45, due: "May 18", status: "overdue", category: "Lifestyle", autopay: false },
  ];

  const monthlyTotal = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const paidTotal = bills.filter(b => b.status === "paid").reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white">Bills</h1>
          <p className="text-slate-400 mt-1">Track & manage payments</p>
        </div>
        <button className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-6 shadow-2xl shadow-blue-500/30"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-blue-100 text-sm mb-1">Monthly Total</div>
            <div className="text-5xl font-black text-white">${monthlyTotal}</div>
          </div>
          <div className="text-right">
            <div className="text-blue-100 text-sm mb-1">Paid</div>
            <div className="text-3xl font-black text-white">${paidTotal}</div>
          </div>
        </div>
        <div className="bg-white/20 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(paidTotal / monthlyTotal) * 100}%` }}
            transition={{ duration: 1 }}
            className="bg-white h-full rounded-full"
          />
        </div>
      </motion.div>

      <div className="flex gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-1">
        <button
          onClick={() => setView("list")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
            view === "list"
              ? "bg-white/10 text-white"
              : "text-slate-400"
          }`}
        >
          <Receipt className="w-5 h-5" />
          List
        </button>
        <button
          onClick={() => setView("calendar")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
            view === "calendar"
              ? "bg-white/10 text-white"
              : "text-slate-400"
          }`}
        >
          <Calendar className="w-5 h-5" />
          Calendar
        </button>
      </div>

      <div className="space-y-3">
        <div className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Upcoming Bills</div>
        {bills.filter(b => b.status === "upcoming").map((bill, index) => (
          <motion.div
            key={bill.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Receipt className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold flex items-center gap-2">
                    {bill.name}
                    {bill.autopay && <Zap className="w-4 h-4 text-yellow-400" />}
                  </div>
                  <div className="text-sm text-slate-400">Due {bill.due}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-bold text-lg">${bill.amount}</div>
                <div className="text-xs text-blue-400">{bill.category}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Paid</div>
        {bills.filter(b => b.status === "paid").map((bill, index) => (
          <motion.div
            key={bill.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 opacity-60"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <div className="text-white font-semibold">{bill.name}</div>
                  <div className="text-sm text-slate-400">Paid {bill.due}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-bold text-lg">${bill.amount}</div>
                <div className="text-xs text-emerald-400">Completed</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {bills.filter(b => b.status === "overdue").length > 0 && (
        <div className="space-y-3">
          <div className="text-sm font-semibold text-red-400 uppercase tracking-wide">Overdue</div>
          {bills.filter(b => b.status === "overdue").map((bill, index) => (
            <motion.div
              key={bill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-2xl p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">{bill.name}</div>
                    <div className="text-sm text-red-400">Due {bill.due}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-lg">${bill.amount}</div>
                  <div className="text-xs text-red-400">Action needed</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
