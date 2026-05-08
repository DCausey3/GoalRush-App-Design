import { motion, AnimatePresence } from "motion/react";
import { X, Receipt, DollarSign, Calendar, Zap } from "lucide-react";
import { useState } from "react";
import { supabase } from "../../utils/supabase";

const BILL_CATEGORIES = ["Housing", "Utilities", "Insurance", "Subscriptions", "Internet", "Phone", "Transportation", "Healthcare", "Other"];

interface AddBillModalProps {
  open: boolean;
  onClose: () => void;
  onBillAdded: () => void;
}

export function AddBillModal({ open, onClose, onBillAdded }: AddBillModalProps) {
  const [form, setForm] = useState({
    name: "",
    category: "Utilities",
    amount: "",
    due_day: "",
    autopay: false,
    recurring: true,
    status: "unpaid" as "paid" | "unpaid" | "overdue",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  }

  function handleToggle(field: "autopay" | "recurring") {
    setForm((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  async function handleSubmit() {
    if (!form.name || !form.amount || !form.due_day) {
      setError("Please fill in all required fields.");
      return;
    }

    const dueDay = parseInt(form.due_day);
    if (isNaN(dueDay) || dueDay < 1 || dueDay > 31) {
      setError("Due day must be between 1 and 31.");
      return;
    }

    setSaving(true);
    const { error: supabaseError } = await supabase.from("bills").insert({
      name: form.name,
      category: form.category,
      amount: parseFloat(form.amount),
      due_day: dueDay,
      autopay: form.autopay,
      recurring: form.recurring,
      status: form.status,
    });

    setSaving(false);

    if (supabaseError) {
      setError("Failed to save bill. Please try again.");
      return;
    }

    setForm({ name: "", category: "Utilities", amount: "", due_day: "", autopay: false, recurring: true, status: "unpaid" });
    onBillAdded();
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border border-white/10 rounded-t-3xl px-6 pt-6 pb-10 shadow-2xl"
          >
            {/* Drag handle */}
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-white">Add Bill</h2>
                <p className="text-slate-400 text-sm mt-0.5">Never miss a payment</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 block">
                  Bill Name
                </label>
                <div className="relative">
                  <Receipt className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Netflix, Rent, Electric..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 block">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none"
                >
                  {BILL_CATEGORIES.map((c) => (
                    <option key={c} value={c} className="bg-slate-800">{c}</option>
                  ))}
                </select>
              </div>

              {/* Amount + Due Day */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 block">
                    Amount
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      name="amount"
                      value={form.amount}
                      onChange={handleChange}
                      type="number"
                      placeholder="0.00"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-9 pr-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 block">
                    Due Day
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      name="due_day"
                      value={form.due_day}
                      onChange={handleChange}
                      type="number"
                      min="1"
                      max="31"
                      placeholder="15"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-9 pr-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 block">
                  Current Status
                </label>
                <div className="flex gap-2">
                  {(["unpaid", "paid", "overdue"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setForm((prev) => ({ ...prev, status: s }))}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all ${
                        form.status === s
                          ? s === "paid"
                            ? "bg-emerald-500/30 border border-emerald-500/50 text-emerald-300"
                            : s === "overdue"
                            ? "bg-red-500/30 border border-red-500/50 text-red-300"
                            : "bg-blue-500/30 border border-blue-500/50 text-blue-300"
                          : "bg-white/5 border border-white/10 text-slate-400"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleToggle("autopay")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border font-semibold text-sm transition-all ${
                    form.autopay
                      ? "bg-yellow-500/20 border-yellow-500/40 text-yellow-300"
                      : "bg-white/5 border-white/10 text-slate-400"
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  Autopay
                </button>
                <button
                  onClick={() => handleToggle("recurring")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border font-semibold text-sm transition-all ${
                    form.recurring
                      ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                      : "bg-white/5 border-white/10 text-slate-400"
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  Recurring
                </button>
              </div>

              {/* Error */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm font-medium"
                >
                  {error}
                </motion.p>
              )}

              {/* Submit */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                disabled={saving}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg shadow-lg shadow-blue-500/30 disabled:opacity-60 transition-all mt-2"
              >
                {saving ? "Saving..." : "Add Bill 📋"}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}