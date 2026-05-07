import { motion } from "motion/react";
import { Sparkles, TrendingUp, Target, Flame, Users } from "lucide-react";
import { CircularProgress } from "./CircularProgress";
import { ProgressRing } from "./ProgressRing";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

export function HomeScreen() {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(" ")[0] ?? "there";

  const [bills, setBills] = useState<any[]>([]);
  const [debts, setDebts] = useState<any[]>([]);
  const [budgets, setBudgets] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      const [billsRes, debtsRes, budgetsRes, goalsRes] = await Promise.all([
        supabase.from("bills").select("*"),
        supabase.from("debts").select("*"),
        supabase.from("budgets").select("*").eq("month", new Date().getMonth() + 1).eq("year", new Date().getFullYear()),
        supabase.from("savings_goals").select("*"),
      ]);
      setBills(billsRes.data ?? []);
      setDebts(debtsRes.data ?? []);
      setBudgets(budgetsRes.data ?? []);
      setGoals(goalsRes.data ?? []);
      setLoading(false);
    }
    fetchAll();
  }, []);

  const totalBillsDue = bills.reduce((sum, b) => sum + b.amount, 0);
  const totalBillsPaid = bills.filter(b => b.status === "paid").reduce((sum, b) => sum + b.amount, 0);
  const billsProgress = totalBillsDue > 0 ? Math.round((totalBillsPaid / totalBillsDue) * 100) : 0;
  const billsRemaining = totalBillsDue - totalBillsPaid;

  const totalDebt = debts.reduce((sum, d) => sum + d.current_balance, 0);
  const totalOriginal = debts.reduce((sum, d) => sum + d.original_balance, 0);
  const debtProgress = totalOriginal > 0 ? Math.round(((totalOriginal - totalDebt) / totalOriginal) * 100) : 0;

  const budgetColors: Record<string, string> = {
    Groceries: "bg-emerald-500",
    Transport: "bg-blue-500",
    Entertainment: "bg-red-500",
    Shopping: "bg-purple-500",
    "Dining Out": "bg-yellow-500",
    Healthcare: "bg-cyan-500",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400 text-lg animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-black text-white">Hey, {firstName} 👋</h1>
          <p className="text-slate-400 mt-1">Let's crush your goals today</p>
        </div>
        <button className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <Sparkles className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Bills Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-6 shadow-2xl shadow-blue-500/30 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-blue-100 mb-4">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold">{new Date().toLocaleString("default", { month: "long" })} Overview</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-blue-100 text-sm mb-1">Bills Due</div>
              <div className="text-3xl font-black text-white">${totalBillsDue.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-blue-100 text-sm mb-1">Bills Paid</div>
              <div className="text-3xl font-black text-white">${totalBillsPaid.toFixed(2)}</div>
            </div>
          </div>
          <CircularProgress
            value={billsProgress}
            label="Remaining"
            amount={`$${billsRemaining.toFixed(2)}`}
          />
        </div>
      </motion.div>

      {/* Debt Overview */}
      {debts.length > 0 && (
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
              <div className="text-5xl font-black text-white mb-2">${totalDebt.toLocaleString()}</div>
            </div>
            <div className="bg-white/20 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${debtProgress}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="bg-gradient-to-r from-white to-yellow-200 h-full rounded-full"
              />
            </div>
            <div className="mt-2 text-sm text-white font-semibold">{debtProgress}% paid off</div>
          </div>
        </motion.div>
      )}

      {/* Budget Snapshot */}
      {budgets.length > 0 && (
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
            {budgets.slice(0, 4).map((item) => (
              <div key={item.id}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">{item.category}</span>
                  <span className="text-white font-semibold">
                    ${item.current_spend} / ${item.monthly_limit}
                  </span>
                </div>
                <div className="bg-white/10 rounded-full h-2 overflow-hidden">
                  <div
                    className={`${budgetColors[item.category] ?? "bg-slate-500"} h-full rounded-full transition-all`}
                    style={{ width: `${Math.min((item.current_spend / item.monthly_limit) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Savings Goals */}
      {goals.length > 0 && (
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
            {goals.slice(0, 4).map((goal) => {
              const progress = Math.round((goal.current_amount / goal.target_amount) * 100);
              return (
                <div key={goal.id} className="text-center">
                  <ProgressRing value={progress} size={80} />
                  <div className="font-semibold mt-2 text-emerald-400 text-sm">{goal.name}</div>
                  <div className="text-xs text-slate-500">
                    ${goal.current_amount.toLocaleString()} / ${goal.target_amount.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Motivational streak — static for now, can be computed later */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-6"
      >
        <div className="flex items-center gap-2 text-purple-300 mb-4">
          <Flame className="w-5 h-5" />
          <span className="font-semibold">Keep it up! 🔥</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="flex-1">
            <div className="text-white font-semibold">You're building momentum</div>
            <div className="text-sm text-slate-400">Keep logging and stay on track</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}