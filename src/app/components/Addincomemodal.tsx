import { motion, AnimatePresence } from "motion/react";
import { X, DollarSign, Briefcase, Calendar, RefreshCw } from "lucide-react";
import { useState } from "react";
import { supabase } from "../../utils/supabase";

const FREQUENCIES = ["weekly", "bi-weekly", "monthly", "quarterly", "annually", "one-time"];
const INCOME_SOURCES = ["Job", "Freelance", "Business", "Investment", "Rental", "Side Hustle", "Gift", "Other"];

interface AddIncomeModalProps {
  open: boolean;
  onClose: () => void;
  onIncomeAdded: () => void;
}

export function AddIncomeModal({ open, onClose, onIncomeAdded }: AddIncomeModalProps) {
  const [form, setForm] = useState({
    source: "",
    source_type: "Job",
    amount: "",
    frequency: "monthly",
    last_received: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  }

  async function handleSubmit() {
    if (!form.source || !form.amount) {
      setError("Please fill in all required fields.");
      return;
    }

    setSaving(true);
    const { error: supabaseError } = await supabase.from("income").insert({
      source: form.source,
      source_type: form.source_type,
      amount: parseFloat(form.amount),
      frequency: form.frequency,
      last_received: form.last_received || null,
    });

    setSaving(false);

    if (supabaseError) {
      setError("Failed to save income. Please try again.");
      return;
    }

    setForm({ source: "", source_type: "Job", amount: "", frequency: "monthly", last_received: "" });
    onIncomeAdded();
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border border-white/10 rounded-t-3xl px-6 pt-6 pb-10 shadow-2xl"
          >
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6" />

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-white">Add Income</h2>
                <p className="text-slate-400 text-sm mt-0.5">Track your earnings</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Source Name */}
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 block">
                  Source Name
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    name="source"
                    value={form.source}
                    onChange={handleChange}
                    placeholder="JPMorgan Chase, Causey Innovations..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Source Type */}
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 block">
                  Income Type
                </label>
                <select
                  name="source_type"
                  value={form.source_type}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:border-emerald-500/50 transition-all appearance-none"
                >
                  {INCOME_SOURCES.map((s) => (
                    <option key={s} value={s} className="bg-slate-800">{s}</option>
                  ))}
                </select>
              </div>

              {/* Amount + Frequency */}
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
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-9 pr-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 block">
                    Frequency
                  </label>
                  <div className="relative">
                    <RefreshCw className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <select
                      name="frequency"
                      value={form.frequency}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-9 pr-4 py-3.5 text-white focus:outline-none focus:border-emerald-500/50 transition-all appearance-none"
                    >
                      {FREQUENCIES.map((f) => (
                        <option key={f} value={f} className="bg-slate-800 capitalize">{f}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Last Received */}
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5 block">
                  Last Received <span className="text-slate-600 normal-case">(optional)</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    name="last_received"
                    value={form.last_received}
                    onChange={handleChange}
                    type="date"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-3.5 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                  />
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm font-medium"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                disabled={saving}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold text-lg shadow-lg shadow-emerald-500/30 disabled:opacity-60 transition-all mt-2"
              >
                {saving ? "Saving..." : "Add Income 💰"}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}