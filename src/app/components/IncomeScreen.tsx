import { motion } from "motion/react";
import { DollarSign, Plus, TrendingUp, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { AddIncomeModal } from "./Addincomemodal";

export function IncomeScreen() {
  const [income, setIncome] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);

async function fetchIncome() {
  const { data, error } = await supabase.from("income").select("*").order("created_at", { ascending: false });
  if (!error) setIncome(data ?? []);
  setLoading(false);
}
useEffect(() => { fetchIncome(); }, []);



  const monthlyRecurring = income
    .filter(i => i.frequency !== "one-time")
    .reduce((sum, i) => sum + i.amount, 0);

  const totalThisMonth = income.reduce((sum, i) => sum + i.amount, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400 animate-pulse">Loading income...</div>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white">Income</h1>
          <p className="text-slate-400 mt-1">Track your earnings</p>
        </div>
        <button className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg shadow-emerald-500/30" onClick={() => setShowAddModal(true)}>
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
            <span className="font-semibold">{new Date().toLocaleString("default", { month: "long" })} Income</span>
          </div>
          <div className="flex justify-between items-end mb-4">
            <div>
              <div className="text-emerald-100 text-sm mb-1">Total This Month</div>
              <div className="text-6xl font-black text-white">${totalThisMonth.toLocaleString()}</div>
            </div>
            <div className="text-right">
              <div className="text-emerald-100 text-sm mb-1">Recurring</div>
              <div className="text-3xl font-black text-white">${monthlyRecurring.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {income.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-lg font-semibold">No income sources yet</p>
          <p className="text-sm">Tap + to add your first income source</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Income Sources</div>
          {income.map((item, index) => (
            <motion.div
              key={item.id}
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
                    <div className="text-white font-semibold">{item.source}</div>
                    <div className="text-sm text-slate-400 capitalize">{item.frequency}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-lg">${item.amount.toLocaleString()}</div>
                  <div className="text-xs text-emerald-400 capitalize">{item.frequency === "one-time" ? "One-time" : "Recurring"}</div>
                </div>
              </div>
              {item.last_received && (
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Calendar className="w-4 h-4" />
                  Last received: {new Date(item.last_received).toLocaleDateString()}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
      <AddIncomeModal open={showAddModal} onClose={() => setShowAddModal(false)} onIncomeAdded={fetchIncome} />
    </div>
  );
}