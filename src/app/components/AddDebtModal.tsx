import { motion, AnimatePresence } from "motion/react";
import { X, CreditCard, DollarSign, Percent, Calendar } from "lucide-react";
import { useState } from "react";
import { supabase } from "../../utils/supabase";

const DEBT_TYPES = ["Credit Card", "Student Loan", "Auto Loan", "Medical", "Personal Loan", "Mortgage", "Other"];

interface AddDebtModalProps {
  open: boolean;
  onClose: () => void;
  onDebtAdded: () => void;
}

export function AddDebtModal({ open, onClose, onDebtAdded }: AddDebtModalProps) {
  const [form, setForm] = useState({
    name: "",
    type: "Credit Card",
    current_balance: "",
    original_balance: "",
    interest_rate: "",
    min_payment: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  }

  async function handleSubmit() {
    if (!form.name || !form.current_balance || !form.original_balance || !form.interest_rate || !form.min_payment) {
      setError("Please fill in all fields.");
      return;
    }

    setSaving(true);
    const { error: supabaseError } = await supabase.from("debts").insert({
      name: form.name,
      type: form.type,
      current_balance: parseFloat(form.current_balance),
      original_balance: parseFloat(form.original_balance),
      interest_rate: parseFloat(form.interest_rate),
      min_payment: parseFloat(form.min_payment),
    });

    setSaving(false);

    if (supabaseError) {
      setError("Failed to save debt. Please try again.");
      return;
    }

    setForm({ name: "", type: "Credit Card", current_balance: "", original_balance: "", interest_rate: "", min_payment: "" });
    onDebtAdded();
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
                <h2 className="text-2xl font-black text-white">Add Debt</h2>
                <p className="text-slate-400 text-sm mt-0.5">Track what you owe</p>
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
                  Debt Name
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Chase Sapphire Card"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:bg-white/8 transition-all"
                  />
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 block">
                  Debt Type
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500/50 transition-all appearance-none"
                >
                  {DEBT_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-slate-800">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Balances row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 block">
                    Current Balance
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      name="current_balance"
                      value={form.current_balance}
                      onChange={handleChange}
                      type="number"
                      placeholder="5,000"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-9 pr-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 block">
                    Original Balance
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      name="original_balance"
                      value={form.original_balance}
                      onChange={handleChange}
                      type="number"
                      placeholder="8,000"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-9 pr-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Rate + Min Payment row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 block">
                    Interest Rate
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      name="interest_rate"
                      value={form.interest_rate}
                      onChange={handleChange}
                      type="number"
                      step="0.01"
                      placeholder="19.99"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-9 pr-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 block">
                    Min Payment/mo
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      name="min_payment"
                      value={form.min_payment}
                      onChange={handleChange}
                      type="number"
                      placeholder="150"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-9 pr-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition-all"
                    />
                  </div>
                </div>
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
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-lg shadow-lg shadow-red-500/30 disabled:opacity-60 transition-all mt-2"
              >
                {saving ? "Saving..." : "Add Debt 💪"}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}